// 3725. Count Ways to Choose Coprime Integers from Rows
// You are given a m x n matrix mat of positive integers.
// Return an integer denoting the number of ways to choose exactly one integer from each row of mat such that the greatest common divisor of all chosen integers is 1.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP

// Populate every dp[j][gcd], where 
  // j is the column on the current row
  // gcd is the gcd of the current running sequence
  // dp[j][gcd] = the number of combinations up to column j with gcd `gcd`.
// For every row, go through every number in the row 
  // and iterate through every number in the previous row
  // to calculate each dp[j][gcd].

// m = number of rows, n = number of columns, k = max(mat[i][j])
// Time Complexity: O(mn^2 * log(k)) 735ms
// Space Complexity: O(nk) 66MB
function countCoprime(mat) {
  const m = mat.length, n = mat[0].length, MOD = 1000000007;
  let prev = {0: 1};
  for (let i = 0; i < m; i++) {
    const curr = {};
    for (let j = 0; j < n; j++) {
      for (let prevGCD in prev) {
        const newGCD = gcd(Number(prevGCD), mat[i][j]);
        curr[newGCD] = ((curr[newGCD] || 0) + prev[prevGCD]) % MOD;
      }
    }
    prev = curr;
  }
  return prev[1] || 0;
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
};

// Two test cases
console.log(countCoprime([[1,2],[3,4]])) // 3
console.log(countCoprime([[2,2],[2,2]])) // 0