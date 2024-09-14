// 3281. Maximize Score of Numbers in Ranges
// You are given an array of integers start and an integer d, representing n intervals [start[i], start[i] + d].
// You are asked to choose n integers where the ith integer must belong to the ith interval. The score of the chosen integers is defined as the minimum absolute difference between any two integers that have been chosen.
// Return the maximum possible score of the chosen integers.


// Solution: Binary Search

// Sort start in asc order and create the maximum difference between every adjacent pair.
// Binary search for the maximum minimum difference `diff` between every two adjacent integers.
// Greedily start with the minimum number (start[0] - d) and then try to make every difference equal to `diff` (it's optimal to only take the minimum needed to give a better chance for incoming integers).

// n = length of start, m = max diff + d
// Time Complexity: O(n log(n) + n log(m)) 249ms
// Space Complexity: O(log(n)) (space for sorting) 69.1MB
function maxPossibleScore(start, d) {
  start.sort((a, b) => a - b);
  let low = 0, high = start[start.length - 1] - start[0] + d;
  while (low < high) {
    let mid = low + Math.ceil((high - low) / 2);
    if (isPossible(start, d, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isPossible(start, d, diff) {
  let prev = start[0];
  for (let i = 1; i < start.length; i++) {
    if (start[i] + d - prev < diff) {
      return false;
    }
    prev = Math.max(start[i], prev + diff);
  }
  return true;
}

// Two test cases
console.log(maxPossibleScore([6,0,3], 2)) // 4
console.log(maxPossibleScore([2,6,13,13], 5)) // 5