// 1359. Count All Valid Pickup and Delivery Options
// Given n orders, each order consist in pickup and delivery services. 
// Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Math - Permutations

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

// Four test cases to run function on
console.log(countOrders(1)) // 1
console.log(countOrders(2)) // 6
console.log(countOrders(5)) // 113400
console.log(countOrders(500)) // 764678010