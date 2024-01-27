// 629. K Inverse Pairs Array
// For an integer array nums, an inverse pair is a pair of integers [i, j] where 0 <= i < j < nums.length and nums[i] > nums[j].
// Given two integers n and k, return the number of different arrays consist of numbers from 1 to n such that there are exactly k inverse pairs. Since the answer can be huge, return it modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k), where dp(i, k) is the number of different arrays with numbers from 1 to i, with k inverse pairs left to go.
// Starting from n down to 1, 
  // Place each number i at position j from the right.
  // When placing each number i at position j from the right, we know that there will be exactly j smaller numbers on the right of number i.
  // The next state becomes dp(i - 1, k - j).
  // At the next state, we only need to worry about the next numbers (from 1 to i - 1) because greater numbers on the right are disregarded (will not be a pair).

// e.g. n = 5, k = 3
  // Number 5: 
    // Position 4: [_,_,_,_,5]. This generates 0 inverse pairs.
    // Position 3: [_,_,_,5,_]. This generates 1 inverse pair.
    // Position 2: [_,_,5,_,_]. This generates 2 inverse pairs.
    // Position 1: [_,5,_,_,_]. This generates 3 inverse pairs.
    // Position 0: [5,_,_,_,_]. This generates 4 inverse pairs.
    // No matter which numbers are put after the 5, it will generate an inverse pair because all coming numbers are smaller.
    // We already counted the inverse pairs generated when placing the 5, so from now on all next states will only need to worry about 4 positions now, disregarding the number 5 because it's larger than all coming numbers.
  
// Time Complexity: O(nk * min(n, k)) 7284ms
// Space Complexity: O(nk) 58.8MB
var kInversePairs = function(n, k) {
  let memo = Array(n + 1).fill(0).map(() => Array(k + 1).fill(-1));
  let mod = 10 ** 9 + 7;
  return dp(n, k);
  
  function dp(i, k) { // number i with k inverse pairs left
    if (i === 0) return k === 0 ? 1 : 0;
    if (k === 0) return 1;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = 0;
    for (let j = 0; j <= Math.min(i - 1, k); j++) { // place number i at position j from the right
      ans = (ans + dp(i - 1, k - j)) % mod;
    }
    return memo[i][k] = ans;
  }
};

// Two test cases
console.log(kInversePairs(3, 0)) // 1
console.log(kInversePairs(3, 1)) // 2