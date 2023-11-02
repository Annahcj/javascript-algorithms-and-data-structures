// 1066. Campus Bikes II
// On a campus represented as a 2D grid, there are n workers and m bikes, with n <= m. Each worker and bike is a 2D coordinate on this grid.
// We assign one unique bike to each worker so that the sum of the Manhattan distances between each worker and their assigned bike is minimized.
// Return the minimum possible sum of Manhattan distances between each worker and their assigned bike.


// Solution: Brute Force / Permutations w/ Backtracking

// Generate every combination of n workers with n bikes.
// Keep an array 'bikesUsed' to keep track of bikes we have visited, filled with 0's (0: not visited, 1: visited)
// keep a min distance variable, initially set to Infinity.
// call backtrack with index: 0, distance: 0
// return minDist.

// backtrack: (index, current distance)
  // base case 1: if index is equal to the number of workers, update minDist if necessary, and return.
  // base case 2: [early termination for time optimization] if distance is bigger than or equal to minDist, return. (can't possibly get better distance out of this)
  // loop through bikes (pointer = i)
    // set bikesUsed[i] to 1 (visited)
    // call backtrack(index + 1, dist + (manhattan distance between workers[index] and bikes[i]))
    // [backtrack] change bikesUsed[i] to 0 (not visited)

// getDist: (x, y) 
  // return the manhattan distance between the coordinates of x and y

// n = workers.length, m = bikes.length
// Time Complexity: O(m! / (m - n)!) 788ms
// Space Complexity: O(n + m) 39.6MB 
var assignBikes = function(workers, bikes) {
  let bikesUsed = Array(bikes.length).fill(0);
  let minDist = Infinity;
  backtrack(0, 0);
  return minDist;

  function backtrack(idx, dist) {
    if (idx === workers.length) {
      minDist = Math.min(minDist, dist);
      return;
    }
    if (dist >= minDist) return;
    for (let i = 0; i < bikes.length; i++) {
      if (!bikesUsed[i]) {
        bikesUsed[i] = 1;
        backtrack(idx + 1, dist + getDist(workers[idx], bikes[i]));
        bikesUsed[i] = 0;
      }
    }
  } 

  function getDist(x, y) {
    return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
  } 
};

// Three test cases 
console.log(assignBikes([[0,0],[2,1]], [[1,2],[3,3]])) // 6
console.log(assignBikes([[0,0],[1,1],[2,0]], [[1,0],[2,2],[2,1]])) // 4
console.log(assignBikes([[0,0],[1,0],[2,0],[3,0],[4,0]], [[0,999],[1,999],[2,999],[3,999],[4,999]])) // 4995