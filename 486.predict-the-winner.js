// 486. Predict the Winner
// You are given an integer array nums. Two players are playing a game with this array: player 1 and player 2.
// Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of 0. At each turn, the player takes one of the numbers from either end of the array (i.e., nums[0] or nums[nums.length - 1]) which reduces the size of the array by 1. The player adds the chosen number to their score. The game ends when there are no more elements in the array.
// Return true if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return true. You may assume that both players are playing optimally.


// Solution 1: Recursion

// turn: 
  // 1: player 1, a positive amount
  // -1: player 2, a negative amount
// set two pointers, start and end.
// for each turn, pick the best outcome out of
  // 1 (choiceA). picking the first one
  // 2 (choiceB). picking the last one
// If it's player 1's turn, return the maximum out of choiceA and choiceB, 
// otherwise return the minimum out of choiceA and choiceB since we are a using negative number to indicate player 2's points.

// Time Complexity: O(2^n) 312ms
// Space Complexity: O(n) 44.7MB
var PredictTheWinner = function(nums) {
  return recurse(0, nums.length - 1, 1) >= 0; // positive means player 1 wins, negative means player 2 wins.
  function recurse(start, end, turn) {
    if (start === end) return nums[start] * turn;
    let choiceA = recurse(start + 1, end, -turn) + nums[start] * turn;
    let choiceB = recurse(start, end - 1, -turn) + nums[end] * turn;
    return turn === 1 ? Math.max(choiceA, choiceB) : Math.min(choiceA, choiceB);
  }  
};

// Solution 2: Recursion w/ Memoization

// The same as solution 1, except we use a hashmap to keep track of the results so that we don't have to compute them again.

// Time Complexity: O(n^2) 60ms
// Space Complexity: O(n^2) 40.9MB
var PredictTheWinner = function(nums) {
  let memo = {};
  return recurse(0, nums.length - 1, 1) >= 0;
  function recurse(start, end, turn) {
    if (memo[`${start},${end},${turn}`] !== undefined) return memo[`${start},${end},${turn}`];
    if (start === end) return nums[start] * turn;
    let choiceA = recurse(start + 1, end, -turn) + nums[start] * turn;
    let choiceB = recurse(start, end - 1, -turn) + nums[end] * turn;
    let bestChoice = Math.max(choiceA * turn, choiceB * turn) * turn;
    memo[`${start},${end},${turn}`] = bestChoice;
    return bestChoice;
  }  
};

// Two test cases to run function on
console.log(PredictTheWinner([1,5,2])) // false
console.log(PredictTheWinner([1,5,233,7])) // true