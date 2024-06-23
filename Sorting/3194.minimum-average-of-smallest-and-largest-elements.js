// 3194. Minimum Average of Smallest and Largest Elements
// You have an array of floating point numbers averages which is initially empty. You are given an array nums of n integers where n is even.
// You repeat the following procedure n / 2 times:
  // Remove the smallest element, minElement, and the largest element maxElement, from nums.
  // Add (minElement + maxElement) / 2 to averages.
// Return the minimum element in averages.


// Solution: Sorting & Two Pointers

// Sort nums, then use two pointers to traverse the pairs of smallest and largest elements until we reach the middle.
// Keep track of the smallest average over all the pairs.

// Time Complexity: O(n log(n)) 54ms
// Space Complexity: O(log(n)) (space for sorting) 50.9MB
var minimumAverage = function(nums) {
  nums.sort((a, b) => a - b);
  let i = 0, j = nums.length - 1;
  let minAvg = Infinity;
  while (i < j) {
    minAvg = Math.min(minAvg, (nums[i] + nums[j]) / 2);
    i++, j--;
  }
  return minAvg;
};

// Three test cases
console.log(minimumAverage([7,8,3,4,15,13,4,1])) // 5.5
console.log(minimumAverage([1,9,8,3,10,5])) // 5.5
console.log(minimumAverage([1,2,3,7,8,9])) // 5.0