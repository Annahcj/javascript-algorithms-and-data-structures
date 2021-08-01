// 1952. Three Divisors
// Given an integer n, return true if n has exactly three positive divisors. Otherwise, return false.


// Solution: Brute Force

// Keep a divisors count, set it to 1 initially.
// Loop through from 2 to n itself (i)
  // If n is divisible by i, increment divisors by one.
  // If divisors is bigger than three, return false. (since it has to be exactly three divisors)
// If number of divisors is three, return true.
// Otherwise, return false.

// Time Complexity: O(n) 90ms
// Space Complexity: O(1) 38.2MB
  var isThree = function(n) {
    let divisors = 1;
    for (var i = 2; i <= n; i++) {
      if (n % i === 0) {
        divisors++;
        if (divisors > 3) return false;
      }
    }
    if (divisors === 3) return true;
    return false;
  };
  
  // Two test cases to run function on
  console.log(isThree(2)) // false
  console.log(isThree(4)) // true