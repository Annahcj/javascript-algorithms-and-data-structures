// 276. Paint Fence
// You are painting a fence of n posts with k different colors. You must paint the posts following these rules:
// Every post must be painted exactly one color.
// There cannot be three or more consecutive posts with the same color.
// Given the two integers n and k, return the number of ways you can paint the fence.


// Solution: Dynamic Programming

// If n is equal to 0, return 0.
// If n is equal to 1, return k. (only one fence post, so every color can be used once)
// If n is equal to 2, return k * k. (total combinations since you can have two adjacent same color posts)
// Otherwise, if n is bigger than 2, loop through from 3 to n. Keep track of prevPrev and prev values.
  // Set variable curr to (prevPrev + prev) * (k - 1) 
  // Set prevPrev to prev
  // Set prev to curr
// When iteration is finished, return prev.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.6MB
  var numWays = function(n, k) {
    if (n === 0) return 0;
    if (n === 1) return k;
    if (n === 2) return k * k;
    let prevPrev = k, prev = k * k;
    for (var i = 3; i <= n; i++) {
      let curr = (prevPrev + prev) * (k - 1);
      prevPrev = prev;
      prev = curr;
    }
    return prev;
  };
  
  // Three test cases to run function on
  console.log(numWays(3, 2)) // 6
  console.log(numWays(1, 1)) // 1
  console.log(numWays(7, 2)) // 42