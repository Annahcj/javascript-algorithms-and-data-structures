// 3096. Minimum Levels to Gain More Points
// You are given a binary array possible of length n.
// Danielchandg and Bob are playing a game that consists of n levels. Some of the levels in the game are impossible to clear while others can always be cleared. In particular, if possible[i] == 0, then the ith level is impossible to clear for both the players. A player gains 1 point on clearing a level and loses 1 point if the player fails to clear it.
// At the start of the game, Danielchandg will play some levels in the given order starting from the 0th level, after which Bob will play for the rest of the levels.
// Danielchandg wants to know the minimum number of levels he should play to gain more points than Bob, if both players play optimally to maximize their points.
// Return the minimum number of levels danielchandg should play to gain more points. If this is not possible, return -1.
// Note that each player must play at least 1 level.


// Solution: Prefix & Suffix Sum

// Keep track of a running prefix and suffix scores for Daniel and Bob.
// At the start, Bob will take all the levels.
// Iterate through each level for Daniel from 0 to n - 1 and update the running scores.

// Time Complexity: O(n) 138ms
// Space Complexity: O(1) 64.2MB
var minimumLevels = function(possible) {
  let n = possible.length;
  let bob = possible.reduce((score, p) => p ? score + 1 : score - 1, 0), daniel = 0;
  for (let i = 0; i < n - 1; i++) {
    bob -= possible[i] ? 1 : -1;
    daniel += possible[i] ? 1 : -1;
    if (daniel > bob) return i + 1;
  }
  return -1;
};

// Three test cases
console.log(minimumLevels([1,0,1,0])) // 1
console.log(minimumLevels([1,1,1,1,1])) // 3
console.log(minimumLevels([0,0])) // -1