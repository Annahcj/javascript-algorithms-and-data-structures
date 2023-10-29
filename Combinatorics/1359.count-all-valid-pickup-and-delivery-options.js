// 1359. Count All Valid Pickup and Delivery Options
// Given n orders, each order consist in pickup and delivery services. 
// Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution 1: Math - Permutations

// pickups: n!
// deliveries: (1 * 3 * 5 * 7 * ...) n times

// e.g: P1 P2 D1 D2

// deliveries:
// 1 choice:
// P1 P2
  // put D2: only 1 choice -> P1 P2 D2
// P2 P1
  // put D1: only 1 choice -> P2 P1 D1

// 3 choices:
// P1 P2 D2
  // put D1: 3 choices -> (P1 D1 P2 D2), (P1 P2 D1 D2), (P1 P2 D2 D1)
// P2 P1 D1
  // put D2: 3 choices -> (P2 D2 P1 D1), (P2 P1 D2 D1), (P2 P1 D1 D2)
  
// It can be proven that the total number of valid pickups/deliveries is n! * (1 * 3 * 5 * 7 * ...) n times

// deliveries:
  // 0 -> 1
  // 1 -> 3
  // 2 -> 5
  // 3 -> 7
// It can be observed that the formula is (i * 2 + 1)

// Time Complexity: O(n) 101ms
// Space Complexity: O(1) 42.6MB
var countOrders = function(n) {
  let ans = 1, mod = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    ans = (ans * (i + 1)) % mod;
    ans = (ans * (i * 2 + 1)) % mod;
  }
  return ans;
};


// Solution 2: Combinatorics w/ Modular Inverse 

// Formula: 2n! / 2^n
// Reasoning: All possible permutations divided by different internal orderings of each pickup/delivery pair.

// To avoid integer overflow and incorrect results when using modulo, we need to use BigInt and modular inverse to calculate the division result correctly.

// Time Complexity: O(2n) 52ms
// Space Complexity: O(1) 44.1MB
var countOrders = function(n) {
  let perms = 1n, MOD = 1000000007n;
  for (let i = 1; i <= 2 * n; i++) {
    perms = (perms * BigInt(i)) % MOD;
  }  
  let permsToExclude = 1n;
  for (let i = 0; i < n; i++) {
    permsToExclude = (permsToExclude * 2n) % MOD;
  }
  return (perms * modPow(permsToExclude, Number(MOD) - 2, MOD)) % MOD;
};

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

// Four test cases
console.log(countOrders(1)) // 1
console.log(countOrders(2)) // 6
console.log(countOrders(5)) // 113400
console.log(countOrders(500)) // 764678010