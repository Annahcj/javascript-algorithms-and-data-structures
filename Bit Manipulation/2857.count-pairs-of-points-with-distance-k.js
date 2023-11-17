// 2857. Count Pairs of Points With Distance k
// You are given a 2D integer array coordinates and an integer k, where coordinates[i] = [x[i], y[i]] are the coordinates of the ith point in a 2D plane.
// We define the distance between two points (x1, y1) and (x2, y2) as (x1 XOR x2) + (y1 XOR y2) where XOR is the bitwise XOR operation.
// Return the number of pairs (i, j) such that i < j and the distance between points i and j is equal to k.


// Solution: Enumeration & Hashmap

// Observe the following:
// k = (x1 ^ x2) + (y1 ^ y2)
// If we know x and x1, we can find x2: x = x1 ^ x2 is equivalent to x1 = x ^ x2 (the same with y).
// We can enumerate each possible x (<= k), and from that we can find what y should be: k - x = y

// Use a hashmap to store each coordinate, so that we can count previous points.

// Time Complexity: O(nk) 1530ms
// Space Complexity: O(n) 94.9MB
var countPairs = function(coordinates, k) {
  let pointsSet = new Map(), count = 0;
  for (let [x2, y2] of coordinates) {
    for (let x = 0; x <= k; x++) {
      let x1 = x ^ x2, y = k - x;
      let y1 = y ^ y2;
      count += (pointsSet.get(`${x1},${y1}`) || 0);
    }
    pointsSet.set(`${x2},${y2}`, (pointsSet.get(`${x2},${y2}`) || 0) + 1);
  }
  return count;
};

// Two test cases
console.log(countPairs([[1,2],[4,2],[1,3],[5,2]], 5)) // 2
console.log(countPairs([[1,3],[1,3],[1,3],[1,3],[1,3]], 0)) // 10