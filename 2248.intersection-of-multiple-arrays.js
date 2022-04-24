// 2248. Intersection of Multiple Arrays
// Given a 2D integer array nums where nums[i] is a non-empty array of distinct positive integers, return the list of integers that are present in each array of nums sorted in ascending order.


// Solution: Hashmap

// Count the occurances (using a hashmap) of each number in each of the arrays.
// Get the numbers which have n occurances.

// Time Complexity: O(n) 73ms
// Space Complexity: O(n) 45.3MB
var intersection = function(nums) {
  let count = {};
  for (let arr of nums) {
    for (let num of arr) {
      count[num] = (count[num] || 0) + 1;
    }
  }
  let res = [];
  for (let num in count) {
    if (count[num] === nums.length) res.push(+num);
  }
  return res;
};

// Two test cases to run function on
console.log(intersection([[3,1,2,4,5],[1,2,3,4],[3,4,5,6]])) // [3,4]
console.log(intersection([[1,2,3],[4,5,6]])) // []