// 3301. Maximize the Total Height of Unique Towers
// You are given an array maximumHeight, where maximumHeight[i] denotes the maximum height the ith tower can be assigned.
// Your task is to assign a height to each tower so that:
// The height of the ith tower is a positive integer and does not exceed maximumHeight[i].
// No two towers have the same height.
// Return the maximum possible total sum of the tower heights. If it's not possible to assign heights, return -1.


// Solution: Greedy w/ Sorting

// Sort the heights in descending order, then traverse the sorted heights and assign the maximum possible height: min(maximumHeight[i], last height - 1).
// If the height becomes smaller than 1, then it's impossible.

// Time Complexity: O(n log(n)) 295ms
// Space Complexity: O(n) 68.1MB
function maximumTotalSum(maximumHeight) {
  maximumHeight.sort((a, b) => b - a);
  let lastHeight = maximumHeight[0] + 1;
  let sum = 0, n = maximumHeight.length;
  for (let i = 0; i < n; i++) {
    let height = Math.min(lastHeight - 1, maximumHeight[i]);
    if (height < 1) {
      return -1;
    }
    sum += height;
    lastHeight = height;
  }
  return sum;
};

// Three test cases
console.log(maximumTotalSum([2,3,4,3])) // 10
console.log(maximumTotalSum([15,10])) // 25
console.log(maximumTotalSum([2,2,1])) // -1