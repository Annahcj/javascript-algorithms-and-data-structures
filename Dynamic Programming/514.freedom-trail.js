// 514. Freedom Trail
// In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring" and use the dial to spell a specific keyword to open the door.
// Given a string ring that represents the code engraved on the outer ring and another string key that represents the keyword that needs to be spelled, return the minimum number of steps to spell all the characters in the keyword.
// Initially, the first character of the ring is aligned at the "12:00" direction. You should spell all the characters in key one by one by rotating ring clockwise or anticlockwise to make each character of the string key aligned at the "12:00" direction and then by pressing the center button.
// At the stage of rotating the ring to spell the key character key[i]:
  // 1. You can rotate the ring clockwise or anticlockwise by one place, which counts as one step. The final purpose of the rotation is to align one of ring's characters at the "12:00" direction, where this character must equal key[i].
  // 2. If the character key[i] has been aligned at the "12:00" direction, press the center button to spell, which also counts as one step. After the pressing, you could begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where i = index in key and j = index in ring.
// For each key[i], try going to each of the indexes of it and record the best result.

// Since there are two ways to calculate the cost to reach an index (clockwise and anti-clockwise), it can be calculated as such (when i <= j):
  // Anti-Clockwise: j - i
  // Clockwise: i + ring.length - j
// Get the minimum out of the two directions.

// n = length of key, m = length of ring
// Time Complexity: O(nm^2) 137ms
// Space Complexity: O(nm) 49.5MB
var findRotateSteps = function(ring, key) {
  let m = ring.length, n = key.length;
  let indices = Array(26).fill(0).map(() => []);
  for (let i = 0; i < m; i++) {
    indices[ring.charCodeAt(i) - 97].push(i);
  }
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1));
  return dp(0, 0) + n;
  
  function dp(i, j) {
    if (i === n) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    
    let ans = Infinity;
    for (let idx of indices[key.charCodeAt(i) - 97]) {
      let cost = getMinCost(j, idx);
      ans = Math.min(ans, dp(i + 1, idx) + cost);
    }
    return memo[i][j] = ans;
  }
  
  function getMinCost(i, j) {
    if (i > j) return getMinCost(j, i);
    return Math.min(j - i, i + m - j);
  }
};

// Two test cases to run function on
console.log(findRotateSteps("godding", "gd")) // 4
console.log(findRotateSteps("godding", "godding")) // 13