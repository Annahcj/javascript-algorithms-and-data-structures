// 70. Climbing Stairs
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


// Solution: Fibonacci Number

// Formula
// Fib(n) = Fib(n−1) + Fib(n−2)

// Algorithm:
// Set prevPrev (fib(n - 2)) to 1, prev to (fib(n - 1)) 1
// Loop through from 2 to n 
  // Let curr equal prevPrev + prev
  // Update prevPrev to prev
  // Update prev to curr
// Return prev.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.8MB
  var climbStairs = function(n) {
    let prevPrev = 1, prev = 1;
    for (var i = 2; i <= n; i++) {
      let curr = prevPrev + prev;
      prevPrev = prev;
      prev = curr;
    }
    return prev;
  };
  
  // Three test cases to run function on
  console.log(climbStairs(1)) // 1
  console.log(climbStairs(2)) // 2
  console.log(climbStairs(3)) // 3