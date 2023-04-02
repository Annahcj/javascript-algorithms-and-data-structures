// 2610. Convert an Array Into a 2D Array With Conditions
// You are given an integer array nums. You need to create a 2D array from nums satisfying the following conditions:
  // The 2D array should contain only the elements of the array nums.
  // Each row in the 2D array contains distinct integers.
  // The number of rows in the 2D array should be minimal.
// Return the resulting array. If there are multiple answers, return any of them.
// Note that the 2D array can have a different number of elements on each row.

 
// Solution: Counting w/ Hashmap

// The minimum number of rows is the maximum occurance of a number in nums.
// Get the occurances of each number and record the maximum count.
// For each number, add it to the first x rows, where x is the occurances of the number.

// Time Complexity: O(n) 112ms
// Space Complexity: O(n) 47.4MB
var findMatrix = function(nums) {
  let count = {}, maxCount = 0;
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
    maxCount = Math.max(maxCount, count[num]);
  }
  let rows = Array(maxCount).fill(0).map(() => []);
  for (let num in count) {
    num = Number(num);
    for (let i = 0; i < count[num]; i++) {
      rows[i].push(num);
    }
  }
  return rows;
};

// Two test cases
console.log(findMatrix([1,3,4,1,2,3,1])) // [[1,2,3,4],[1,3],[1]] (there are multiple answers)
console.log(findMatrix([1,2,3,4])) // [[1,2,3,4]] (there are multiple answers)