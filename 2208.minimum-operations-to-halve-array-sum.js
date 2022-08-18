// 2208. Minimum Operations to Halve Array Sum
// You are given an array nums of positive integers. In one operation, you can choose any number from nums and reduce it to exactly half the number. (Note that you may choose this reduced number in future operations.)
// Return the minimum number of operations to reduce the sum of nums by at least half.


// Solution: Greedy w/ Max Heap

// Choosing the largest numbers to halve will always be optimal since we will be subtracting the biggest possible amount each time.
// Use a max heap to keep track of the largest number and update numbers efficiently.

// Time Complexity: O(n log(n)) 531ms
  // the worst case is O(n log(n)) since it is guaranteed we can always half the sum by halving every single number (n operations).
// Space Complexity: O(n) 77.8MB
var halveArray = function(nums) {
  let heap = new PriorityQueue((a, b) => b - a), totalSum = 0, count = 0;
  for (let num of nums) {
    heap.add(num);
    totalSum += num;
  }  
  
  let sum = totalSum;
  while (sum > totalSum / 2) {
    let num = heap.remove(), half = num / 2;
    sum -= half;
    heap.add(half);
    count++;
  }
  return count;
};

class PriorityQueue {
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

// Two test cases to run function on
console.log(halveArray([5,19,8,1])) // 3
console.log(halveArray([3,8,10])) // 3