// 1865. Finding Pairs With a Certain Sum
// You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:
// Add a positive integer to an element of a given index in the array nums2.
// Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
// Implement the FindSumPairs class:
  // FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
  // void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
  // int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.


// Solution: Hashmap

// Since we know that the length of nums1 <= 1000, we can take advantage of the smaller size.
// Keep track of the occurances of each nums2[i] in a hashmap.

// count:
  // Go through each nums1[i] and find the number of matching complements in the nums2 occurance hashmap.
    // get the sum of count[total - nums1[i]]

// add:
  // Update the count hashmap 
    // count[nums2[index]]--
    // count[nums2[index] + val]++
  // Update nums2[index] so that we have reference to the old value when add is called again.

// n = length of nums1, m = length of nums2
// Time Complexity: 298ms
  // add: O(1) per call
  // count: O(n) per call
// Space Complexity: O(n + m) 71.9MB
var FindSumPairs = function(nums1, nums2) {
  this.nums1 = nums1;
  this.nums2 = nums2;
  this.countMap = new Map();
  for (let num of nums2) {
    this.countMap.set(num, (this.countMap.get(num) || 0) + 1);
  }
};

FindSumPairs.prototype.add = function(index, val) {
  let oldVal = this.nums2[index];
  this.nums2[index] += val;
  this.countMap.set(oldVal, this.countMap.get(oldVal) - 1);
  this.countMap.set(this.nums2[index], (this.countMap.get(this.nums2[index]) || 0) + 1);
};

FindSumPairs.prototype.count = function(tot) {
  let count = 0;
  for (let num of this.nums1) {
    let complement = tot - num;
    count += (this.countMap.get(complement) || 0);
  }  
  return count;
};

// A few test cases
let findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
console.log(findSumPairs.count(7));  // 8
findSumPairs.add(3, 2);
console.log(findSumPairs.count(8));  // 2
console.log(findSumPairs.count(4));  // 1
findSumPairs.add(0, 1); 
findSumPairs.add(1, 1); 
console.log(findSumPairs.count(7));  // 11