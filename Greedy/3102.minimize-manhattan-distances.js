// 3102. Minimize Manhattan Distances
// You are given a 0-indexed array points representing integer coordinates of some points on a 2D plane, where points[i] = [x[i], y[i]].
// The distance between two points is defined as their Manhattan distance.
// Return the minimum possible value for maximum distance between any two points by removing exactly one point.


// Solution: Greedy

// After finding the pair of points with the maximum distance, recalculate the maximum distance after removing the first, and second point in the pair.
// Return the minimum distance out of removing the first point vs removing the second point.

// Removing one of these points will always result in the minimum distance.
// If, after removing a point, there are still distances equal to the original max distance, we can't do any better than that.

// n = number of points
// Time Complexity: O(n) 1102ms
// Space Complexity: O(n) 94.8MB
var minimumDistance = function(points) {
  let [x, y] = getMaxDistIndices(points);
  let indicesWithoutX = getMaxDistIndices(points, x);
  let maxDistWithoutX = getDist(points, indicesWithoutX[0], indicesWithoutX[1]);
  let indicesWithoutY = getMaxDistIndices(points, y);
  let maxDistWithoutY = getDist(points, indicesWithoutY[0], indicesWithoutY[1]);
  return Math.min(maxDistWithoutX, maxDistWithoutY);
};

function getMaxDistIndices(points, excludeIndex) {
  let diff = [], sum = [];
  for (let i = 0; i < points.length; i++) {
    if (i === excludeIndex) continue;
    let [x, y] = points[i];
    diff.push([i, x - y]);
    sum.push([i, x + y]);
  }
  diff.sort((a, b) => a[1] - b[1]);
  sum.sort((a, b) => a[1] - b[1]);
  if (sum[sum.length - 1][1] - sum[0][1] >= diff[diff.length - 1][1] - diff[0][1]) {
    return [sum[sum.length - 1][0], sum[0][0]];
  } else {
    return [diff[diff.length - 1][0], diff[0][0]];
  }
}

function getDist(points, x, y) {
  return Math.abs(points[x][0] - points[y][0]) + Math.abs(points[x][1] - points[y][1]);
}

// Two test cases
console.log(minimumDistance([[3,10],[5,15],[10,2],[4,4]])) // 12
console.log(minimumDistance([[1,1],[1,1],[1,1]])) // 0