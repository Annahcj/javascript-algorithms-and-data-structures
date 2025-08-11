// 2438. Range Product Queries of Powers
// Given a positive integer n, there exists a 0-indexed array called powers, composed of the minimum number of powers of 2 that sum to n. The array is sorted in non-decreasing order, and there is only one way to form the array.
// You are also given a 0-indexed 2D integer array queries, where queries[i] = [lefti, righti]. Each queries[i] represents a query where you have to find the product of all powers[j] with lefti <= j <= righti.
// Return an array answers, equal in length to queries, where answers[i] is the answer to the ith query. Since the answer to the ith query may be too large, each answers[i] should be returned modulo 10^9 + 7.


// Solution: Bit Manipulation & Prefix Product

// The most compact representation of any number is the bit representation.
// It can't get more compact than that, otherwise it will end up breaking up each bit into further halves.

// The bit representation is small (log(n)), so we can generate it before performing the queries.

// Precompute the prefix product of the powers, so that we can efficiently query.
// To get the quotient of two larger numbers with modulo, use modular inverse.

// m = number of queries
// Time Complexity: O(log(n) + m) 176ms
// Space Complexity: O(log(n)) 89MB
function productQueries(n, queries) {
  const powers = [];
  for (let i = 0; i < 30; i++) {
    if ((1 << i) & n) {
      powers.push(BigInt(2 ** i));
    }
  } 
  const prefixProduct = [1n, ...powers], MOD = 1000000007n;
  for (let i = 2; i < prefixProduct.length; i++) {
    prefixProduct[i] = (prefixProduct[i] * prefixProduct[i - 1]) % MOD;
  }
  const ans = [];
  for (let [left, right] of queries) {
    const product = (prefixProduct[right + 1] * modPow(prefixProduct[left], MOD - 2n, MOD)) % MOD;
    ans.push(Number(product));
  }
  return ans;
};

function modPow(x, y, mod) {
  y = Number(y);
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
console.log(productQueries(15, [[0,1],[2,2],[0,3]])) // [2,4,64]
console.log(productQueries(2, [[0,0]])) // [2]