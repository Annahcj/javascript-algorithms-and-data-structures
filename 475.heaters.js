// 475. Heaters
// Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.
// Every house can be warmed, as long as the house is within the heater's warm radius range. 
// Given the positions of houses and heaters on a horizontal line, return the minimum radius standard of heaters so that those heaters could cover all houses.
// Notice that all the heaters follow your radius standard, and the warm radius will the same.


// Solution: Sorting & Two Pointers

// First, sort both houses and heaters in asc order.
// For each house, use two pointers to
  // 1. Find the distance to the closest heater on the right. 
  // 2. Find the distance to the closest heater on the left. 
// Take the minimum out of the two.

// The answer is the maximum distance for all houses.

// n = houses.length, m = heaters.length
// Time Complexity: O(n log(n) + m log(m)) 131ms
// Space Complexity: O(n) 48.5MB
var findRadius = function(houses, heaters) {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  let n = houses.length, m = heaters.length, dist = Array(n).fill(Infinity);
  let i = 0, j = 0;
  // distance to closest heater on right
  while (i < n && j < m) {
    if (houses[i] <= heaters[j]) { 
      dist[i] = heaters[j] - houses[i];
      i++;
    } else {
      j++;
    }
  }
  
  // distance to closest heater on left
  i = n - 1, j = m - 1;
  while (i >= 0 && j >= 0) {
    if (houses[i] >= heaters[j]) {
      dist[i] = Math.min(dist[i], houses[i] - heaters[j]);
      i--;
    } else {
      j--;
    }
  }
  
  return Math.max(...dist);
};

// Three test cases to run function on
console.log(findRadius([1,2,3], [2])) // 1
console.log(findRadius([1,2,3,4], [1,4])) // 1
console.log(findRadius([1,5], [2])) // 3