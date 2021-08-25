// 347. Top K Frequent Elements
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.


// Solution 1: Priority Queue / Max Heap

// Time Complexity: O(n log(n)) 100ms
// Space Complexity: O(n) 43MB
var topKFrequent = function(nums, k) {
  let heap = new MaxHeap();
  let freqMap = {}, res = [];
  for (var num of nums) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }
  for (var key in freqMap) {
    heap.add({freq: freqMap[key], key});
  }
  for (var i = 0; i < k; i++) {
    res.push(+heap.remove().key);
  }
  return res;
};

// Max Heap
class MaxHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx].freq > this.values[parentIdx].freq) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx].freq > vals[rightIdx].freq) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx].freq < this.values[childIdx].freq) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}


// Solution 2: QuickSelect

// Explanation of quickselect:
// Imagine we are trying to find the k largest numbers in an array.
// We pick a random pivot in the bounds between low and high -> pivotIdx.
// Swap the number at the pivotIdx to the end of the array so it isn't affected by the swapping.
// Set idx to 0
// Loop through from low to high - 1 (pointer = i) (since pivot is at the end now)
  // If nums[i] is smaller than pivotValue
    // Swap nums[i] with nums[idx]
    // Increment idx by one.
// Swap the pivot with nums[idx]
// Let items be the number of items from idx to high (high - idx + 1, to include pivot)
// If items is equal to k, return nums.slice(idx)
// Otherwise if items is smaller than k, that means we need to look left, so recursively call quickSelect(nums, low, idx - 1, k - items)
// Otherwise if items is bigger than k, we need to look right, so recursively call quickSelect(nums, idx + 1, high, k)

// Map each number to its frequency in nums
// Push the unique numbers into an array 'unique'
// Return quickSelect(unique, 0, unique.length - 1, k)
// quickSelect: (unique)
// We perform quickSelect, comparing the frequencies of each unique number instead of the numbers themselves.

// Time Complexity: O(n) avg, worst case O(n^2). 80ms
// Space Complexity: O(n) 42.2MB
var topKFrequent = function(nums, k) {
  let map = {}, unique = [];
  for (var num of nums) {
    if (!map[num]) {
      map[num] = 1;
      unique.push(num);
    } else {
      map[num]++;
    }
  }
  return quickSelect(unique, 0, unique.length - 1, k);
  function quickSelect(nums, low, high, k) {
    let pivotIdx = Math.floor(Math.random() * (high - low + 1)) + low;   
    let pivotVal = map[nums[pivotIdx]];    
    let idx = low;  
    swap(pivotIdx, high);
    for (var i = low; i < high; i++) {
      if (map[nums[i]] < pivotVal) {
        swap(idx, i);
        idx++;
      }
    }
    swap(idx, i); 
    // items: num of items from idx to high
    let items = high - idx + 1;
    // we have found k frequent items! 
    if (items === k) return nums.slice(idx);
    if (items < k) {
      // num of items is less than k, so we need to find more -> look left
      return quickSelect(nums, low, idx - 1, k - items);
    } else { 
      // num of items is more than k, so we need to filter out more -> look right
      return quickSelect(nums, idx + 1, high, k); 
    }
  }
  function swap(num1, num2) {
    let temp = unique[num1];
    unique[num1] = unique[num2];
    unique[num2] = temp;
  }
};

// Two test cases to run function on
console.log(topKFrequent([1,1,1,2,2,3], 2)) // [1,2] (in any order)
console.log(topKFrequent([1], 1)) // [1]