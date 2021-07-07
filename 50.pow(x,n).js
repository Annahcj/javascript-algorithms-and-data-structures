// 50. Pow(x, n)
// Implement pow(x, n), which calculates x raised to the power n (i.e., xn)

// Solution 1: Fast Power Recursive

// Recursively multiply x by n / 2

// Time Complexity: O(logn) 76 ms
// Space Complexity: O(logn) 40.3MB
var myPow = function(x, n) {
    function fastPow(x, n) {
      if (n == 0) return 1;
      let half = fastPow(x, Math.floor(n / 2));
      if (n % 2 === 0) return half * half;
      else return half * half * x;
    }
    if (n < 0) {
      x = 1 / x;
      n = -n;
    }
    return fastPow(x, n);
  };
  // Three test cases to run function on
  console.log(myPow(2.00000, 10)) // 1024.00000
  console.log(myPow(2.10000, 3)) // 9.26100
  console.log(myPow(2.00000, -2)) // 0.25000