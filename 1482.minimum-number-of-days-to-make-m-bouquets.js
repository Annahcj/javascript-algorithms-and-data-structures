// 1482. Minimum Number of Days to Make m Bouquets
// You are given an integer array bloomDay, an integer m and an integer k.
// You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
// The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.
// Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.


// Solution: Binary Search 

// Binary search for the minimum number of days.
// Find the minimum day where there are at least m subarrays of size k consisting only of numbers <= day.

// m = maximum bloomDay[i]
// Time Complexity: O(n log(m)) 151ms
// Space Complexity: O(1) 51.9MB
var minDays = function(bloomDay, m, k) {
  let n = bloomDay.length;
  if (m * k > n) return -1;
  let low = 0, high = Math.max(...bloomDay);
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isValid(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isValid(maxDay) {
    let bouquets = 0, adjacent = 0;
    for (let i = 0; i < n; i++) {
      if (bloomDay[i] > maxDay) adjacent = 0;
      else adjacent++;
      if (adjacent === k) {
        adjacent = 0;
        bouquets++;
      }
    }
    return bouquets >= m;
  }
};

// Three test cases to run function on
console.log(minDays([1,10,3,10,2], 3, 1)) // 3
console.log(minDays([1,10,3,10,2], 3, 2)) // -1
console.log(minDays([7,7,7,7,12,7,7], 2, 3)) // 12