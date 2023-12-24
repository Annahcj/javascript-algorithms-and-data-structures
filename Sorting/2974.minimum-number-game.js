// 2974. Minimum Number Game
// You are given a 0-indexed integer array nums of even length and there is also an empty array arr. Alice and Bob decided to play a game where in every round Alice and Bob will do one move. The rules of the game are as follows:
  // Every round, first Alice will remove the minimum element from nums, and then Bob does the same.
  // Now, first Bob will append the removed element in the array arr, and then Alice does the same.
  // The game continues until nums becomes empty.
// Return the resulting array arr.


// Solution: Sorting

// Sort nums in asc order, then for every two numbers, add the second number first, then the first number into the result array.

// Time Complexity: O(n log(n)) 66ms
// Space Complexity: O(n) 44MB
var numberGame = function(nums) {
  nums.sort((a, b) => a - b);
  let arr = [];
  for (let i = 0; i < nums.length; i += 2) {
    arr.push(nums[i + 1]);
    arr.push(nums[i]);
  }
  return arr;
};

// Two test cases
console.log(numberGame([5,4,2,3])) // [3,2,5,4]
console.log(numberGame([2,5])) // [5,2]