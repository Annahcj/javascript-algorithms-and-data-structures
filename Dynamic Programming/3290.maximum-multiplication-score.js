// 3290. Maximum Multiplication Score
// You are given an integer array a of size 4 and another integer array b of size at least 4.
// You need to choose 4 indices i0, i1, i2, and i3 from the array b such that i0 < i1 < i2 < i3. Your score will be equal to the value a[0] * b[i0] + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3].
// Return the maximum score you can achieve.


// Solution 1: DP - Recursion w/ Memoization

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


// Solution 2: Iterative DP w/ O(1) Space

// We only need to know the previous state.
// Rather than storing the entire array of length n, just keep track of the four maximum scores taking 0 indices, 1 index, 2 indices, and 3 indices.
// For every b[i], we either take or skip it and update the four states.

// Time Complexity: O(n) 91ms
// Space Complexity: O(1) 64.3MB
var maxScore = function(a, b) {
  let n = b.length;
  let one = -Infinity, two = -Infinity, three = -Infinity, four = -Infinity;
  for (let i = 0; i < n; i++) {
    four = Math.max(four, three + b[i] * a[3]);
    three = Math.max(three, two + b[i] * a[2]);
    two = Math.max(two, one + b[i] * a[1]);
    one = Math.max(one, b[i] * a[0]);
  }
  return four;
};

// Two test cases
console.log(maxScore([3,2,5,6], [2,-6,4,-5,-3,2,-7])) // 26
console.log(maxScore([-1,4,5,-2], [-5,-1,-3,-2,-4])) // -1