// 1552. Magnetic Force Between Two Balls
// In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has n empty baskets, the ith basket is at position[i], Morty has m balls and needs to distribute the balls into the baskets such that the minimum magnetic force between any two balls is maximum.
// Rick stated that magnetic force between two different balls at positions x and y is |x - y|.
// Given the integer array position and the integer m. Return the required force.


// Solution: Binary Search & Greedy

// Binary search for the maximum minimum difference between baskets to place balls.
// To check whether a difference `dist` is achievable, 
  // Greedily take baskets if the distance between the current position and previously taken position >= dist.
  // If we can place m balls in this manner, `dist` is achieveable.

// n = length of position, k = position[n - 1] - position[0]
// Time Complexity: O(n log(k)) 206ms
// Space Complexity: O(1) 61.3MB
var maxDistance = function(position, m) {
  position.sort((a, b) => a - b);
  let low = 1, high = position[position.length - 1] - position[0];
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isPossible(position, m, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isPossible(position, m, dist) {
  let prevPos = -Infinity;
  for (let i = 0; i < position.length && m > 0; i++) {
    if (position[i] - prevPos >= dist) {
      m--;
      prevPos = position[i];
    }
  }
  return m === 0;
}

// Two test cases
console.log(maxDistance([1,2,3,4,7], 3)) // 3
console.log(maxDistance([5,4,3,2,1,1000000000], 2)) // 999999999