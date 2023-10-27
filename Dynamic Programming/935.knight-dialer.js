// 935. Knight Dialer
// The chess knight has a unique movement, it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an L). 
// Given an integer n, return how many distinct phone numbers of length n we can dial.
// You are allowed to place the knight on any numeric cell initially and then you should perform n - 1 jumps to dial a number of length n. All jumps should be valid knight jumps.
// As the answer may be very large, return the answer modulo 109 + 7.


// Solution 1: Recursion w/ Memoization

// 1. Record the possible neighbors we can move to from each position (0-9).
// 2. Use recursion & memoization to find the number of phone numbers we can generate from each position (0-9).

// Time Complexity: O(n) 1889ms
// Space Complexity: O(n) 112MB
var knightDialer = function(n) {
  let neighbors = {
    1: [6,8],
    2: [7,9],
    3: [4,8],
    4: [3,9,0],
    5: [],
    6: [1,7,0],
    7: [2,6],
    8: [1,3],
    9: [2,4],
    0: [4,6]
  };  
  let memo = {}, mod = 10 ** 9 + 7, totalNums = 0;
  for (let i = 0; i <= 9; i++) {
    totalNums = (totalNums + recurse(i, n - 1)) % mod;
  }
  return totalNums;

  function recurse(pos, jumps) {
    if (jumps === 0) return 1;
    if (memo[`${pos},${jumps}`] !== undefined) return memo[`${pos},${jumps}`];
    let ans = 0;
    for (let neighbor of neighbors[pos]) {
      ans = (ans + recurse(neighbor, jumps - 1)) % mod;
    }
    memo[`${pos},${jumps}`] = ans;
    return ans;
  }
};

// Solution 2: Dynamic Programming

// Using the same idea as recursion w/ memoization.
// For each neighbor, add the result from the current position, this time without recursion.

// Time Complexity: O(n) 229ms
// Space Complexity: O(1) 43.9MB
var knightDialer = function(n) {
  let neighbors = {
    1: [6,8],
    2: [7,9],
    3: [4,8],
    4: [3,9,0],
    5: [],
    6: [1,7,0],
    7: [2,6],
    8: [1,3],
    9: [2,4],
    0: [4,6]
  };  

  let curr = Array(10).fill(1), mod = 10 ** 9 + 7;
  for (let i = 0; i < n - 1; i++) {
    let next = Array(10).fill(0);
    for (let j = 0; j < 10; j++) {
      for (let neighbor of neighbors[j]) {
        next[neighbor] = (next[neighbor] + curr[j]) % mod;
      }
    }
    curr = next;
  }
  let ans = 0;
  for (let sum of curr) ans = (ans + sum) % mod;
  return ans;
};

// Three test cases
console.log(knightDialer(1)) // 10
console.log(knightDialer(2)) // 20
console.log(knightDialer(3131)) // 84202957