// 2594. Minimum Time to Repair Cars
// You are given an integer array ranks representing the ranks of some mechanics. ranksi is the rank of the ith mechanic. A mechanic with a rank r can repair n cars in r * n^2 minutes.
// You are also given an integer cars representing the total number of cars waiting in the garage to be repaired.
// Return the minimum time taken to repair all the cars.
// Note: All the mechanics can repair the cars simultaneously.


// Solution: Binary Search 

// Binary search for the minimum time.
// Calculate the maximum amount of cars each mechanic can repair within x time.
  // For each mechanic: Math.floor(Math.sqrt(x / rank))

// n = number of mechanics, m = upper bound (minimum rank * cars * cars)
// Time Complexity: O(n log(m)) 86ms
// Space Complexity: O(1) 48.2MB
var repairCars = function(ranks, cars) {
  let minRank = Math.min(...ranks);
  let low = 1, high = minRank * cars * cars;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(x) {
    let repaired = 0;
    for (let rank of ranks) {
      repaired += Math.floor(Math.sqrt(x / rank));
      if (repaired >= cars) return true;
    }
    return false;
  }
};

// Two test cases
console.log(repairCars([4,2,3,1], 10)) // 16
console.log(repairCars([5,1,8], 6)) // 16