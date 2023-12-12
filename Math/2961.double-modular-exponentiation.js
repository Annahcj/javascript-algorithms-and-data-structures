// 2961. Double Modular Exponentiation
// You are given a 0-indexed 2D array variables where variables[i] = [a[i], b[i], c[i], m[i]], and an integer target.
// An index i is good if the following formula holds:
  // 0 <= i < variables.length
  // ((a[i] * b[i] % 10) * c[i]) % m[i] == target
// Return an array consisting of good indices in any order.


// Solution: Modular Inverse

// n = length of variables, m = variables[i][3]
// Time Complexity: O(n log(m)) 58ms
// Space Complexity: O(1) (not including output) 44.1MB
var getGoodIndices = function(variables, target) {
  let ans = [], n = variables.length;
  for (let i = 0; i < n; i++) {
    let [a, b, c, m] = variables[i];
    let abMod10 = modPow(BigInt(a), b, 10n);
    let res = modPow(abMod10, c, BigInt(m));
    if (res == target) ans.push(i);
  }
  return ans;
};

// returns x^y % mod
function modPow(x, y, mod) { 
  let currPow = x, ans = 1n;
  while (y > 0) {
    if (y & 1) {
      ans = (ans * currPow) % mod;
    }
    currPow = (currPow * currPow) % mod;
    y >>= 1;
  }
  return ans;
}

// Two test cases
console.log(getGoodIndices([[2,3,3,10],[3,3,3,1],[6,1,1,4]], 2)) // [0,2]
console.log(getGoodIndices([[39,3,1000,1000]], 17)) // []