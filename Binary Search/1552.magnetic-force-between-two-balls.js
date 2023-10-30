// 1552. Magnetic Force Between Two Balls
// In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has n empty baskets, the ith basket is at position[i], Morty has m balls and needs to distribute the balls into the baskets such that the minimum magnetic force between any two balls is maximum.
// Rick stated that magnetic force between two different balls at positions x and y is |x - y|.
// Given the integer array position and the integer m. Return the required force.


// Solution: Binary Search & Sorting

// First, sort position.

// Thought process:
// We're finding the maximum force, so we pick the mid point with Math.ceil((low + high) / 2).
// Binary search for the maximum force.
  // isEnough: returns true if the force/gap given is possible for the positions we have.
    // Greedily fits as many balls as possible with the minimum gap being equal to the gap given.

// Time Complexity: O(n log(10^9)) 267ms
// Space Complexity: O(log(n)) (space for sorting) 53.1MB
var maxDistance = function(position, m) {
  position.sort((a, b) => a - b);
  
  let low = 0, high = position[position.length - 1] - position[0];
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function isEnough(gap) {
    let lastPos = position[0], balls = 1;
    for (let i = 1; i < position.length; i++) {
      if (position[i] - lastPos >= gap) {
        lastPos = position[i];
        balls++;
      }
    }
    return balls >= m;
  }
};

// Two test cases
console.log(maxDistance([1,2,3,4,7], 3)) // 3
console.log(maxDistance([5,4,3,2,1,1000000000], 2)) // 999999999