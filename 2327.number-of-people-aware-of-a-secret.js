// 2327. Number of People Aware of a Secret
// On day 1, one person discovers a secret.
// You are given an integer delay, which means that each person will share the secret with a new person every day, starting from delay days after discovering the secret. You are also given an integer forget, which means that each person will forget the secret forget days after discovering it. A person cannot share the secret on the same day they forgot it, or on any day afterwards.
// Given an integer n, return the number of people who know the secret at the end of day n. Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Recursion w/ Memoization

// dp(day) = one person knows the secret on this day
// We can only count a person if they don't forget the secret before day n.
// Memoize the result for each day up to n.

// Time Complexity: O(n^2) 132ms
// Space Complexity: O(n) 42.9MB
var peopleAwareOfSecret = function(n, delay, forget) {
  let memo = Array(n).fill(-1), mod = 10**9 + 7;
  return dp(0);

  function dp(day) {
    if (memo[day] !== -1) return memo[day];
    let ans = 0;
    if (day + forget >= n) ans = 1;
    for (let i = day + delay; i < Math.min(day + forget, n); i++) {
      ans = (ans + dp(i)) % mod;
    }
    return memo[day] = ans;
  }
};

// Two test cases to run function on
console.log(peopleAwareOfSecret(6, 2, 4)) // 5
console.log(peopleAwareOfSecret(4, 1, 3)) // 6