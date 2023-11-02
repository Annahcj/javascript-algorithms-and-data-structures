// 632. Smallest Range Covering Elements from K Lists
// You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.
// We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.


// Solution: Heap 

// The idea is to create the narrowest range possible.
// 1. Take the first element in each list and put them in the heap. Keep track of the current max number.
  // Keep track of the best range: [Top element in heap, current max number]
// 2. Replace the smallest element with the next element in its list. 
// 3. Repeat step 1 & 2 until we don't have k elements.

// Note: The heap always has one element from each list.
// Each element in the heap is formatted as such: [nums index, nums[i] index, number itself]

// k = number of lists, n = total number of elements in all lists
// Time Complexity: O(n log(k)) 236ms
// Space Complexity: O(k) 56.7MB
var smallestRange = function(nums) {
  let heap = new Heap((a, b) => a[2] - b[2]);
  let k = nums.length, max = -Infinity;
  for (var i = 0; i < k; i++) { // add first element from each list
    heap.add([i, 0, nums[i][0]]);
    max = Math.max(max, nums[i][0]); 
  }
  
  let start = 0, end = Infinity;
  while (heap.size >= k) {
    let [i, index, min] = heap.remove();
    if (max - min < end - start) {
      start = min, end = max;
    }
    if (index < nums[i].length - 1) { 
      heap.add([i, index + 1, nums[i][index + 1]]); 
      max = Math.max(max, nums[i][index + 1]);
    }
  }
  return [start, end];
};

// Heap with Comparator
class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Two test cases
console.log(smallestRange([[4,10,15,24,26],[0,9,12,20],[5,18,22,30]])) // [20,24]
console.log(smallestRange([[1,2,3],[1,2,3],[1,2,3]])) // [1,1]