// 1223. Dice Roll Simulation
// A die simulator generates a random number from 1 to 6 for each roll. You introduced a constraint to the generator such that it cannot roll the number i more than rollMax[i] (1-indexed) consecutive times.
// Given an array of integers rollMax and an integer n, return the number of distinct sequences that can be obtained with exact n rolls. Since the answer may be too large, return it modulo 10^9 + 7.
// Two sequences are considered different if at least one element differs from each other.


// Solution: Bottom-Up Dynamic Programming

// Keep track of the number of sequences ending at each side (1-6) and the number of consecutive occurances it is ending with.
// let dp[j][k] = current number of sequences ending with k consecutive occurances of j.

// For each roll,
  // For each dice side (1-6), try to put it in front of each viable previous state.
  // Try to put it in front of each dice side (1-6), each dice side will have a different number of times it is ending with.

// n = number of rolls, j = number of sides on dice (6), k = maximum of rollMax
// Time Complexity: O(n * j^2 * k) 293ms
// Space Complexity: O(jk) 48.8MB
var dieSimulator = function(n, rollMax) {
  let maxRoll = Math.max(...rollMax), mod = 10 ** 9 + 7;
  let dp = Array(6).fill(0).map(() => Array(maxRoll + 1).fill(0));
  for (let j = 0; j < 6; j++) dp[j][1] = 1; // base case - start the first roll with each side from 1-6
  
  for (let i = 1; i < n; i++) { // ith roll
    let dp2 = Array(6).fill(0).map(() => Array(maxRoll + 1).fill(0));
    for (let j = 0; j < 6; j++) { // current number
      for (let k = 0; k < 6; k++) { // previous number
        for (let l = 1; l <= maxRoll; l++) { // number of consecutive times
          if (j === k) {
            if (l >= rollMax[j]) break;
            dp2[j][l + 1] = (dp2[j][l + 1] + dp[k][l]) % mod;
          } else {
            dp2[j][1] = (dp2[j][1] + dp[k][l]) % mod;
          }
        }
      }
    }
    dp = dp2;
  }
  
  return dp.reduce((totalSum, row) => { 
    return (totalSum + row.reduce((sum, val) => (sum + val) % mod)) % mod;
  }, 0);
};

// Three test cases 
console.log(dieSimulator(2, [1,1,2,2,2,3])) // 34
console.log(dieSimulator(2, [1,1,1,1,1,1])) // 30
console.log(dieSimulator(3, [1,1,1,2,2,3])) // 181