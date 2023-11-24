// 1157. Online Majority Element In Subarray
// Design a data structure that efficiently finds the majority element of a given subarray.
// The majority element of a subarray is an element that occurs threshold times or more in the subarray.
// Implementing the MajorityChecker class:
  // MajorityChecker(int[] arr) Initializes the instance of the class with the given array arr.
  // int query(int left, int right, int threshold) returns the element in the subarray arr[left...right] that occurs at least threshold times, or -1 if no such element exists.


// Solution: Random & Binary Search

// For each number, store an array of indices for each occurance of the number, in asc order.
// For each query (left, right, threshold),
  // Randomly pick an index between (left, right).
  // Binary search through the array of indices for the leftmost index >= left, and the rightmost index <= right, and check whether the number of occurances exceeds threshold.
  // Repeat this some number of times until we find the majority element.
  // Reasoning: Each pick, there is greater than 50% chance we choose the majority element, if there is a majority element.

// n = length of arr
// Time Complexity: 303ms
  // init: O(n)
  // query: O(log(n))
// Space Complexity: O(n) 68.7MB
var MajorityChecker = function(arr) {
  this.arr = arr;
  this.indices = {};
  for (let i = 0; i < arr.length; i++) {
    if (!this.indices[arr[i]]) this.indices[arr[i]] = [];
    this.indices[arr[i]].push(i);
  }
};

MajorityChecker.prototype.query = function(left, right, threshold) {
  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * (right - left + 1) + left);
    if (this.isMajority(randomIndex, left, right, threshold)) {
      return this.arr[randomIndex];
    }
  }
  return -1;
};
  
MajorityChecker.prototype.isMajority = function(index, left, right, threshold) {
  let indices = this.indices[this.arr[index]];
  let leftIndex = getLeftIndex(indices, left);
  let rightIndex = getRightIndex(indices, right);
  return rightIndex - leftIndex + 1 >= threshold;
};

// binary search for the leftmost index where indices[i] >= left
function getLeftIndex(indices, left) {
  let low = 0, high = indices.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (indices[mid] >= left) high = mid;
    else low = mid + 1;
  }
  return low;
}

// binary search for the rightmost index where indices[i] <= right
function getRightIndex(indices, right) {
  let low = 0, high = indices.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (indices[mid] <= right) low = mid;
    else high = mid - 1;
  }
  return low;
}

// A few test cases
let majorityChecker = new MajorityChecker([1, 1, 2, 2, 1, 1]);
console.log(majorityChecker.query(0, 5, 4)); // 1
console.log(majorityChecker.query(0, 3, 3)); // -1
console.log(majorityChecker.query(2, 3, 2)); // 2