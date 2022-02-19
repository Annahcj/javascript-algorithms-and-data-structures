// 1675. Minimize Deviation in Array
// You are given an array nums of n positive integers.
// You can perform two types of operations on any element of the array any number of times:
  // If the element is even, divide it by 2.
    // For example, if the array is [1,2,3,4], then you can do this operation on the last element, and the array will be [1,2,3,2].
  // If the element is odd, multiply it by 2.
    // For example, if the array is [1,2,3,4], then you can do this operation on the first element, and the array will be [2,2,3,4].
// The deviation of the array is the maximum difference between any two elements in the array.
// Return the minimum deviation the array can have after performing some number of operations.


// Solution: Max Heap

// Put all numbers into a max heap: if the number is odd, multiply it by 2 before inserting.
// Divide the maximum number by 2 until the max number is odd. (can't divide odd numbers)
// Keep track of the minimum deviation.

// Basically the idea is to first increase the minimum as much as we can (we can only increase odd numbers),
// then decrease the maximum as much as we can.

// What if we want to increase the minimum? 
  // If the minimum is even, we can't multiply it.
  // If the minimum is odd, it was even at the start, and has already been accounted for.

// m = max number in nums, worst is the power of 2, where it can be divided by log(m) number of times.
// Time Complexity: O(n log(m) log(n)) 325ms
// Space Complexity: O(n) 73.4MB
var minimumDeviation = function(nums) {
  let maxHeap = new PriorityQueue((a, b) => b - a);
  let min = Infinity;
  for (let num of nums) {
    let even = num % 2 === 0 ? num : num * 2;
    maxHeap.add(even);
    min = Math.min(min, even);
  }
  let ans = Infinity;
  while (maxHeap.top() % 2 === 0) {
    let num = maxHeap.remove();
    ans = Math.min(ans, num - min);
    maxHeap.add(num / 2);
    min = Math.min(min, num / 2);
  }
  ans = Math.min(ans, maxHeap.top() - min);
  return ans;
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
console.log(minimumDeviation([1,2,3,4])) // 1
console.log(minimumDeviation([4,1,5,20,3])) // 3