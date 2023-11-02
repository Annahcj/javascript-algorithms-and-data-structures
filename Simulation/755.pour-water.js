// 755. Pour Water
// You are given an elevation map represents as an integer array heights where heights[i] representing the height of the terrain at index i. The width at each index is 1. You are also given two integers volume and k. volume units of water will fall at index k.
// Water first drops at the index k and rests on top of the highest terrain or water at that index. Then, it flows according to the following rules:
  // If the droplet would eventually fall by moving left, then move left.
  // Otherwise, if the droplet would eventually fall by moving right, then move right.
  // Otherwise, rise to its current position.
// Here, "eventually fall" means that the droplet will eventually be at a lower level if it moves in that direction. Also, level means the height of the terrain plus any water in that column.
// We can assume there is infinitely high terrain on the two sides out of bounds of the array. Also, there could not be partial water being spread out evenly on more than one grid block, and each unit of water has to be in exactly one block.


// Solution: Brute Force Simulation

// The constraints are not so tight, so we can get away with a brute force solution.
// The idea:
  // 1. Find the lowest possible spot on the left (as long as there are no taller spots)
  // 2. If we can't go left, find the lowest possible spot on the right (as long as there are no taller spots)
  // 3. If we can't go right, increment the current position.
// Note: If there are multiple lowest possible spots, pick the one which is closest to k.

// Time Complexity: O(nk) 112ms
// Space Complexity: O(1) 39MB
var pourWater = function(heights, volume, k) {
  while (volume > 0) {
    let idx = k;
    volume--;
    for (var left = idx - 1; left >= 0; left--) {
      if (heights[left] > heights[idx]) break;
      else if (heights[left] < heights[idx]) idx = left;
    }
    if (idx !== k) {
      heights[idx]++;
      continue;
    }
    for (var right = idx + 1; right < heights.length; right++) {
      if (heights[right] > heights[idx]) break;
      else if (heights[right] < heights[idx]) idx = right;
    }
    heights[idx]++;
  }  
  return heights;
};

// Three test cases to run function on
console.log(pourWater([2,1,1,2,1,2,2], 4, 3)) // [2,2,2,3,2,2,2]
console.log(pourWater([1,2,3,4], 2, 2)) // [2,3,3,4]
console.log(pourWater([3,1,3], 5, 1)) // [4,4,4]