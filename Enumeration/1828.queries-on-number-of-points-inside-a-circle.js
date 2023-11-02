// 1828. Queries on Number of Points Inside a Circle
// You are given an array points where points[i] = [xi, yi] is the coordinates of the ith point on a 2D plane. Multiple points can have the same coordinates.
// You are also given an array queries where queries[j] = [xj, yj, rj] describes a circle centered at (xj, yj) with a radius of rj.
// For each query queries[j], compute the number of points inside the jth circle. Points on the border of the circle are considered inside.
// Return an array answer, where answer[j] is the answer to the jth query.


// Solution: Brute Force w/ Euclidean Distance

// For each query, go through each points[i] and use the Euclidean Distance formula to check whether it's <= radius.

// m = number of queries, n = number of points
// Time Complexity: O(mn) 137ms
// Space Complexity: O(1) (not including output) 47MB
var countPoints = function(points, queries) {
  let answer = [];
  for (let [x1, y1, radius] of queries) {
    let count = 0;
    for (let [x2, y2] of points) {
      if (getDist(x1, y1, x2, y2) <= radius) {
        count++;
      }
    }
    answer.push(count);
  }
  return answer;
  
  function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
};

// Two test cases
console.log(countPoints([[1,3],[3,3],[5,3],[2,2]], [[2,3,1],[4,3,1],[1,1,2]])) // [3,2,2]
console.log(countPoints([[1,1],[2,2],[3,3],[4,4],[5,5]], [[1,2,2],[2,2,2],[4,3,2],[4,3,3]])) // [2,3,2,4]