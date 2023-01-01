// 1735. Count Ways to Make Array With Product
// You are given a 2D integer array, queries. For each queries[i], where queries[i] = [n[i], k[i]], find the number of different ways you can place positive integers into an array of size n[i] such that the product of the integers is ki. As the number of ways may be too large, the answer to the ith query is the number of ways modulo 10^9 + 7.
// Return an integer array answer where answer.length == queries.length, and answer[i] is the answer to the ith query.


// Solution: Stars and Bars

// For each [n, k] in queries,
  // 1. Find the prime factors of k.
    // Then, we can find the combinations of multiplying the prime factors together to fit in an array of size n.
    // We can always fill an array of size n with 1's if we don't have enough numbers since it will not affect the product.
  // 2. Use stars and bars to find the number of combinations of placing the factors in groups.
    // The formula: n+k-1 choose n = (n+k-1)! / (n - k)!n!
      // Every permutation of stars and bars
      // Eliminate repeated permutations from the internal permutations of stars (indistinguishable stars)
      // Eliminate repeated permutations from the internal permutations of bars (indistinguishable bars)
    // Since the stars must be indistinguishable, we can deal with groups of the same factors separately and multiply the results together to get the total number of combinations.

// Note: We can precompute each binomial coefficient (n choose k) using pascal's triangle.

// m = number of queries, n = max(queries[0]), k = max(queries[1])
// Time Complexity: O(m * n * sqrt(k)) 338ms
// Space Complexity: O(m + n * sqrt(k)) 64.3MB
var waysToFillArray = function(queries) {
  let maxN = 0, maxK = 0;
  for (let [n, k] of queries) {
    maxN = Math.max(maxN, n);
    maxK = Math.max(maxK, k);
  }
  let maxFactors = getMaxFactors(maxK);
  let combs = Array(maxN + maxFactors).fill(0).map(() => Array(maxFactors + 1).fill(0));
  let MOD = 10 ** 9 + 7;
  // precompute the nCr (n choose r) combinations
  for (let i = 0; i < maxN + maxFactors; i++) combs[i][0] = 1;
  for (let i = 1; i < maxN + maxFactors; i++) {
    for (let j = 1; j <= maxFactors; j++) {
      combs[i][j] = (combs[i - 1][j - 1] + combs[i - 1][j]) % MOD;
    }
  }
  
  let answer = [];
  for (let [n, k] of queries) {
    let factorsMap = getPrimeFactors(k);
    let res = 1n;
    for (let factor in factorsMap) {
      let count = factorsMap[factor];
      let nCr = BigInt(combs[n + count - 1][count]);
      res *= nCr;
    }
    answer.push(res % BigInt(MOD));
  }
  return answer;
};

function getMaxFactors(num) {
  let factors = 0;
  while (2 ** factors <= num) {
    factors++;
  }
  return factors - 1;
}

function getPrimeFactors(num) {
  let factorsMap = {};
  for (let i = 2; i * i <= num; i++) {
    let count = 0;
    while (num % i === 0) {
      count++;
      num /= i;
    }
    if (count > 0) {
      factorsMap[i] = count;
    }
  }
  if (num > 1) {
    factorsMap[num] = 1;
  }
  return factorsMap;
}

// Two test cases
console.log(waysToFillArray([[2,6],[5,1],[73,660]])) // [4,1,50734910]
console.log(waysToFillArray([[1,1],[2,2],[3,3],[4,4],[5,5]])) // [1,2,3,10,5]