// 2593. Find Score of an Array After Marking All Elements
// You are given an array nums consisting of positive integers.
// Starting with score = 0, apply the following algorithm:
  // Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
  // Add the value of the chosen integer to score.
  // Mark the chosen element and its two adjacent elements if they exist.
  // Repeat until all the array elements are marked.
// Return the score you get after applying the above algorithm.


// Solution: Sorting

// Map each element to [value, index] and sort by value, then index if there is a tie.
// Process each element in the sorted order.
// Keep track of which elements are marked.
// If the current element is not marked, add the value to the score and mark the two adjacent elements.

// Time Complexity: O(n log(n)) 586ms
// Space Complexity: O(n) 83.7MB
var findScore = function(nums) {
  nums = nums.map((value, index) => [value, index]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  let n = nums.length, used = Array(n).fill(0), score = 0;
  for (let [value, index] of nums) {
    if (!used[index]) {
      score += value;
      if (index > 0) used[index - 1] = 1;
      if (index < n - 1) used[index + 1] = 1;
    }
  }
  return score;
};

// Two test cases
console.log(findScore([2,1,3,4,5,2])) // 7
console.log(findScore([2,3,5,1,3,2])) // 5