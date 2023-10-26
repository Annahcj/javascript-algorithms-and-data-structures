// 473. Matchsticks to Square
// You are given an integer array matchsticks where matchsticks[i] is the length of the ith matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.
// Return true if you can make this square and false otherwise.


// Solution: Backtracking

// First, get the sum of the lengths of the matchsticks. 
// The length of each side must be the sum / 4.

// Use backtracking to try putting each matchstick in each of the four sides.
// However, the backtracking method is O(4^n) in terms of time complexity, so we need to make some optimizations to speed it up.

// Optimization 1: If the sum of lengths is not divisible by 4, return false.
// Optimization 2: If length of current side + current matchstick length exceeds the side length, skip it.
// Optimization 3: Sort the inputs in desc order so that we can return immediately when a matchstick is too long for a side.

// Time Complexity: O(4^n) 216ms
// Space Complexity: O(n) 43.1MB
var makesquare = function(matchsticks) {
  let sum = matchsticks.reduce((acc, len) => acc + len), sideLen = sum / 4;
  if (sum % 4 !== 0) return false;
  matchsticks.sort((a, b) => b - a);
  let lengths = Array(4).fill(0);
  return backtrack(0);
  
  function backtrack(idx) {
    if (idx === matchsticks.length) {
      return isEqual();
    }
    for (let i = 0; i < 4; i++) {
      // try adding matchstick i to each of the four sides
      if (lengths[i] + matchsticks[idx] > sideLen) continue;
      lengths[i] += matchsticks[idx];
      if (backtrack(idx + 1)) return true;
      lengths[i] -= matchsticks[idx];
    }
    return false;
  }
  
  function isEqual() {
    for (let i = 0; i < 4; i++) {
      if (lengths[i] !== sideLen) return false;
    }
    return true;
  }
};

// Three test cases to run function on
console.log(makesquare([1,1,2,2,2])) // true
console.log(makesquare([3,3,3,3,4])) // false
console.log(makesquare([1,2,3,4,5,6,7,8,9,10,5,4,3,2,1])) // false