// 697. Degree of an Array
// Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.
// Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.


// Solution: Left & Right Indexes

// Idea:
// For each number, keep the first and last occurance/index.

// Algorithm:
// Loop through nums (pointer = i)
  // increase the frequency of nums[i] by 1
  // update max (maximum frequency) if the frequency of nums[i] is bigger than max
  // if we are at the first occurance of nums[i],
    // set left[nums[i]] to i
  // set right[nums[i]] to i

// Set shortest to Infinity 
// Loop through each unique num in the frequency map (n)
  // if freq[n] is equal to max
    // set shortest to Math.min(shortest, right[n] - left[n] + 1)

// Return shortest.


// Time Complexity: O(n) 88ms
// Space Complexity: O(n) 42.7MB
var findShortestSubArray = function(nums) {
  let freq = {};
  let left = {}, right = {};
  let max = 0;
  for (var i = 0; i < nums.length; i++) {
    let num = nums[i];
    freq[num] = (freq[num] || 0) + 1;
    max = Math.max(max, freq[num]);
    if (freq[num] === 1) left[num] = i;
    right[num] = i;
  }
  let shortest = Infinity;
  for (var n in freq) {
    if (freq[n] === max) {
      shortest = Math.min(shortest, right[n] - left[n] + 1);
    }
  }
  return shortest;
};

// Two test cases to run function on
console.log(findShortestSubArray([1,2,2,3,1])) // 2
console.log(findShortestSubArray([1,2,2,3,1,4,2])) // 6