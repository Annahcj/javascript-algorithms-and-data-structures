// 1968. Array With Elements Not Equal to Average of Neighbors
// You are given a 0-indexed array nums of distinct integers. You want to rearrange the elements in the array such that every element in the rearranged array is not equal to the average of its neighbors.
// More formally, the rearranged array should have the property such that for every i in the range 1 <= i < nums.length - 1, (nums[i-1] + nums[i+1]) / 2 is not equal to nums[i].
// Return any rearrangement of nums that meets the requirements.


// Solution: Greedy & Sorting

// A number nums[i] can only be an average of its neighbors if the three numbers are in sorted order (whether asc or desc).
// So we need to ensure nums is in an order such that every nums[i] is either:
  // Smaller than both neighbors: nums[i - 1] > nums[i] < nums[i + 1] OR
  // Bigger than both neighbors: nums[i - 1] < nums[i] > nums[i + 1]

// To achieve this, we can place the n/2 largest numbers in even indices, and the smaller numbers in odd indices.
// This ensures each number is either smaller than or greater than both neighbors.

// e.g: 
// [1,2,3,4,5]
// sort: [5,4,3,2,1]
// even indices: [5,_,4,_,3]
// odd indices: [_,2,_,1,_]
// final array: [5,2,4,1,3]

// Time Complexity: O(n log(n)) 1074ms
// Space Complexity: O(n) 89.3MB
var rearrangeArray = function(nums) {
  let n = nums.length;
  nums.sort((a, b) => b - a);
  let i = 0, res = Array(n);
  for (let j = 0; j < n; j += 2) {
    res[j] = nums[i++];
  }
  for (let j = 1; j < n; j += 2) {
    res[j] = nums[i++];
  }
  return res;
};

// Two test cases
console.log(rearrangeArray([1,2,3,4,5])) // [5,2,4,1,3]
console.log(rearrangeArray([6,2,0,9,7])) // [9,2,7,0,6]