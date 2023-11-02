// 2080. Range Frequency Queries
// Design a data structure to find the frequency of a given value in a given subarray.
// The frequency of a value in a subarray is the number of occurrences of that value in the subarray.
// Implement the RangeFreqQuery class:
  // RangeFreqQuery(int[] arr) Constructs an instance of the class with the given 0-indexed integer array arr.
  // int query(int left, int right, int value) Returns the frequency of value in the subarray arr[left...right].
// A subarray is a contiguous sequence of elements within an array. arr[left...right] denotes the subarray that contains the elements of nums between indices left and right (inclusive).


// Solution: Map Indices & Binary Search

// Runtime on LeetCode: 780ms
// Memory Usage on LeetCode: 83.9MB

// Map the indices of each number to the number.
// For e.g: [3,2,1,4,3] -> {1: [2], 2: [1], 3: [0,4], 4: [3]}

// Time Complexity: O(n)
// Space Complexity: O(n)
var RangeFreqQuery = function(arr) {
  this.map = {};
  for (let i = 0; i < arr.length; i++) {
    if (!this.map[arr[i]]) this.map[arr[i]] = [];
    this.map[arr[i]].push(i);
  }
};

// query:
// binary search for lowest index >= left: leftIdx
// binary search for highest index <= right: rightIdx

// Time Complexity: O(log(n))
// Space Complexity: O(1)
RangeFreqQuery.prototype.query = function(left, right, value) {
  let leftIdx, rightIdx;
  let idxs = this.map[value]; // array of indices of value
  if (!idxs) return 0; // if array doesn't contain value at all, return 0.
  let low = 0, high = idxs.length;

  while (low <= high) { // binary search for lowest index >= left
    let mid = Math.floor((low + high) / 2);
    if (idxs[mid] === left) {
      low = mid;
      break;
    } else if (idxs[mid] > left) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  leftIdx = low;
  low = 0, high = idxs.length;
  while (low <= high) { // binary search for highest index <= right
    let mid = Math.ceil((low + high) / 2);
    if (idxs[mid] === right) {
      low = mid + 1;
      break;
    } else if (idxs[mid] < right) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  rightIdx = low;
  return Math.max(rightIdx - leftIdx, 0); // return the number of items between rightIdx and leftIdx
};

// A few test cases
let rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
console.log(rangeFreqQuery.query(1, 2, 4)); // return 1. The value 4 occurs 1 time in the subarray [33, 4]
console.log(rangeFreqQuery.query(0, 11, 33)); // return 2. The value 33 occurs 2 times in the whole array.