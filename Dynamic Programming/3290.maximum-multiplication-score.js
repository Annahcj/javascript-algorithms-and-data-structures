// 3290. Maximum Multiplication Score
// You are given an integer array a of size 4 and another integer array b of size at least 4.
// You need to choose 4 indices i0, i1, i2, and i3 from the array b such that i0 < i1 < i2 < i3. Your score will be equal to the value a[0] * b[i0] + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3].
// Return the maximum score you can achieve.


// Solution: DP

// Memoize each dp(i, taken), where
  // i = index in b
  // taken = number of indices we have chosen already

// For each dp(i, taken), we either take or skip b[i].
// If we take it, multiply it with a[taken] and add to the result.

// Time Complexity: O(4n) 831ms
// Space Complexity: O(4n) 98.6MB
var maxScore = function(a, b) {
  let n = b.length, memo = Array(n).fill(0).map(() => Array(4).fill(null));
  return dp(0, 0);
  
  function dp(i, taken) {
    if (taken === 4) return 0;
    if (i === n) return -Infinity;
    if (memo[i][taken] !== null) return memo[i][taken];
    
    let take = a[taken] * b[i] + dp(i + 1, taken + 1);
    let skip = dp(i + 1, taken);
    return memo[i][taken] = Math.max(take, skip);
  }
};

// Two test cases
console.log(maxScore([3,2,5,6], [2,-6,4,-5,-3,2,-7])) // 26
console.log(maxScore([-1,4,5,-2], [-5,-1,-3,-2,-4])) // -1