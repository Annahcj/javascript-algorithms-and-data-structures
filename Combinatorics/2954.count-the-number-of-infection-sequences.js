// 2954. Count the Number of Infection Sequences
// You are given an integer n and a 0-indexed integer array sick which is sorted in increasing order.
// There are n children standing in a queue with positions 0 to n - 1 assigned to them. The array sick contains the positions of the children who are infected with an infectious disease. An infected child at position i can spread the disease to either of its immediate neighboring children at positions i - 1 and i + 1 if they exist and are currently not infected. At most one child who was previously not infected can get infected with the disease in one second.
// It can be shown that after a finite number of seconds, all the children in the queue will get infected with the disease. An infection sequence is the sequential order of positions in which all of the non-infected children get infected with the disease. Return the total number of possible infection sequences.
// Since the answer may be large, return it modulo 10^9 + 7.
// Note that an infection sequence does not contain positions of children who were already infected with the disease in the beginning.


// Solution: Combinatorics

// 1. [Individual group orderings] For each group of non-infected children (sick[i] - sick[i - 1]), there are 2^(group size - 1) combinations.
  // Explanation: At each turn, you can pick one of two positions (from the left, or the right), until we reach the last position where we have no choice.
  // Note: For groups at the start or end, there is only one possible order, since children can only be infected from one direction.

// 2. [Group orderings] At every second, we pick one child, regardless of which group. This means we need to consider the orderings between different groups. 
  // e.g: We could pick one child from group 1, then another child from group 2, then group 1 again, etc.
  // Use the stars and bars combinatorics formula to calculate this group ordering (the ordering within individual groups needs to stay the same).
  // Formula: n! / (n - k)! * k!
  // If there are more than two groups, multiply all the group size factorials together. We are eliminating individual group orderings from the total permutations.

// We need modular inverse to compute the answer respecting the modulo.

// Note: Precompute the factorials % mod in the global scope, so that we only compute it once for all the test cases.

// Time Complexity: O(n * m log(mod)) 158ms
// Space Complexity: O(n) 61.2MB
var numberOfSequence = function(n, sick) {
  let MOD = 1000000007n, factorial = getFactorial();
  let internalOrderings = 1n, groupOrderings = (factorial[n - sick[sick.length - 1] - 1] * factorial[sick[0]]) % MOD;
  for (let i = 1; i < sick.length; i++) {
    let groupSize = Math.max(1, sick[i] - sick[i - 1] - 1);
    internalOrderings = (internalOrderings * modPow(2n, groupSize - 1, MOD)) % MOD;
    groupOrderings = (groupOrderings * factorial[groupSize]) % MOD;
  }
  let totalGroupOrderings = factorial[n - sick.length] * modPow(groupOrderings, Number(MOD) - 2, MOD);
  return (totalGroupOrderings * internalOrderings) % MOD;
};

let getFactorial = initFactorial();

function initFactorial() {
  let factorial, MOD = 1000000007n;
  return () => {
    if (!factorial) {
      factorial = Array(100000);
      factorial[0] = 1n;
      for (let i = 1; i <= 100000; i++) {
        factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
      }
    }
    return factorial;
  }
}

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
console.log(numberOfSequence(5, [0,4])) // 4
console.log(numberOfSequence(4, [1])) // 3