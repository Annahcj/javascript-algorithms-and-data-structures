// 1057. Campus Bikes
// On a campus represented on the X-Y plane, there are n workers and m bikes, with n <= m.
// You are given an array workers of length n where workers[i] = [xi, yi] is the position of the ith worker. You are also given an array bikes of length m where bikes[j] = [xj, yj] is the position of the jth bike. All the given positions are unique.
// Assign a bike to each worker. Among the available bikes and workers, we choose the (workeri, bikej) pair with the shortest Manhattan distance between each other and assign the bike to that worker.
// If there are multiple (workeri, bikej) pairs with the same shortest Manhattan distance, we choose the pair with the smallest worker index. If there are multiple ways to do that, we choose the pair with the smallest bike index. Repeat this process until there are no available workers.
// Return an array answer of length n, where answer[i] is the index (0-indexed) of the bike that the ith worker is assigned to.
// The Manhattan distance between two points p1 and p2 is Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.


// Solution: Sorting

// 1. Get each combination of workers[i] and bikes[j] and group them into an array 'pairs' with the manhattan distance.
// 2. Sort pairs by the distance, then by worker index, then by bike index.
// 3. Keep the result array and an array to keep track of which bikes we have used.
// 4. Process the workers and bikes, skipping over workers or bikes we have already processed.

// n = length of workers.length, m = length of bikes
// Time Complexity: O(nm log(nm)) 1086ms
// Space Complexity: O(nm) 147.1MB
var assignBikes = function(workers, bikes) {
  let pairs = []; // [worker index, bike index, dist]
  let n = workers.length, m = bikes.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let [x1, y1] = workers[i], [x2, y2] = bikes[j];
      pairs.push([i, j, Math.abs(x1 - x2) + Math.abs(y1 - y2)]);
    }
  }
  pairs.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) return a[1] - b[1]; // bike index
      return a[0] - b[0]; // worker index
    }
    return a[2] - b[2]; // distance
  })
  
  let res = Array(n).fill(-1), seenBikes = Array(m).fill(0);
  for (let [i, j] of pairs) {
    if (res[i] > -1 || seenBikes[j]) continue; // we have already seen this worker or bike
    res[i] = j; 
    seenBikes[j] = 1; // mark as seen
  }
  return res;
};

// Two test cases to run function on
console.log(assignBikes([[0,0],[2,1]], [[1,2],[3,3]])) // [1,0]
console.log(assignBikes([[0,0],[1,1],[2,0]], [[1,0],[2,2],[2,1]])) // [0,2,1]