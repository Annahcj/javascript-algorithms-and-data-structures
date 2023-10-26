// 486. Predict the Winner
// You are given an integer array nums. Two players are playing a game with this array: player 1 and player 2.
// Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of 0. At each turn, the player takes one of the numbers from either end of the array (i.e., nums[0] or nums[nums.length - 1]) which reduces the size of the array by 1. The player adds the chosen number to their score. The game ends when there are no more elements in the array.
// Return true if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return true. You may assume that both players are playing optimally.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where i and j are the left and right pointers in nums (since we only take from the start or end of the current state of nums).
// For each dp(i, j), we return the maximum score out of either taking from the start or end (nums[i] or nums[j]).
  // nums[i] - dp(i + 1, j)
  // nums[j] - dp(i, j - 1)
  // Note: We subtract the result since that is the total score difference of the opposite player. By subtracting, we keep the difference in scores.

// Time Complexity: O(n^2) 53ms
// Space Complexity: O(n^2) 42MB
var PredictTheWinner = function(nums) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(n).fill(null));
  let res = dp(0, n - 1);
  return res >= 0;
  
  function dp(i, j) {
    if (i > j) return 0;
    if (i === j) return nums[i];
    if (memo[i][j] !== null) return memo[i][j];
    
    return memo[i][j] = Math.max(nums[i] - dp(i + 1, j), nums[j] - dp(i, j - 1));
  }
};

// Two test cases to run function on
console.log(PredictTheWinner([1,5,2])) // false
console.log(PredictTheWinner([1,5,233,7])) // true