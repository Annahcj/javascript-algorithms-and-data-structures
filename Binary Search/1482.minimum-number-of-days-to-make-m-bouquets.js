// 1482. Minimum Number of Days to Make m Bouquets
// You are given an integer array bloomDay, an integer m and an integer k.
// You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
// The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.
// Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.


// Solution: Binary Search

// Binary search for the minimum number of days.

// To check whether days `d` is enough, keep a running count of consecutive flowers where bloomDay[i] <= d. 
// When the consecutive count reaches k, we can make a bouquet. 
// Days `d` is enough if we can make m bouquets in this manner.

// n = length of bloomDay, max = max(bloomDay[i])
// Time Complexity: O(n log(max)) 87ms
// Space Complexity: O(1) 60.2MB
var minDays = function(bloomDay, m, k) {
  let low = 1, high = Math.max(...bloomDay);
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (enoughBouquets(bloomDay, mid, m, k)) high = mid;
    else low = mid + 1;
  }
  return enoughBouquets(bloomDay, low, m, k) ? low : -1;
};

function enoughBouquets(bloomDay, day, m, k) {
  let n = bloomDay.length, consec = 0;
  let bouquets = 0;
  for (let i = 0; i < n && bouquets < m; i++) {
    if (bloomDay[i] <= day) {
      consec++;
    } else {
      consec = 0;
    }
    if (consec === k) {
      bouquets++;
      consec = 0;
    }
  }
  return bouquets === m;
}

// Three test cases 
console.log(minDays([1,10,3,10,2], 3, 1)) // 3
console.log(minDays([1,10,3,10,2], 3, 2)) // -1
console.log(minDays([7,7,7,7,12,7,7], 2, 3)) // 12