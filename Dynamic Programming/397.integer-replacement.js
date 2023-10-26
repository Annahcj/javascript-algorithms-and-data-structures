// 397. Integer Replacement
// Given a positive integer n, you can apply one of the following operations:
  // If n is even, replace n with n / 2.
  // If n is odd, replace n with either n + 1 or n - 1.
// Return the minimum number of operations needed for n to become 1.


// Solution: DP - Recursion w/ Memoization

// Use recursion with memoization to try every possible operation.
// Here, recursion with memoization will be much faster than iterative dp because the cases are much more sparse (since we divide by 2 for even numbers).
// This is the same reason why we use a hashmap instead of an array for the memoization.
// There are cases where an array is faster than a hashmap since there is no hashing required to access an array element, but in this case a hashmap is much better due to the cases being sparse.

// Time Complexity: O(log(n)) ~ O(n) 103ms
// Space Complexity: O(log(n)) ~ O(n) 42.4MB
var integerReplacement = function(n) {
  let memo = new Map(); 
  return dp(n);
  
  function dp(num) {
    if (num === 1) return 0;
    if (memo.has(num)) return memo.get(num);
    
    let ans = Infinity;
    if (num % 2 === 0) {
      ans = dp(num / 2) + 1;
    } else {
      ans = Math.min(dp(num + 1), dp(num - 1)) + 1;
    }
    memo.set(num, ans);
    return ans;
  }  
};

// Three test cases to run function on
console.log(integerReplacement(8)) // 3
console.log(integerReplacement(7)) // 4
console.log(integerReplacement(4)) // 2