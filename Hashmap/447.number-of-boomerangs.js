// 447. Number of Boomerangs
// You are given n points in the plane that are all distinct, where points[i] = [xi, yi]. A boomerang is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).
// Return the number of boomerangs.


// Solution: Hashmap & Euclidean Distance

// Take each point as point i.
  // Get the distances from point i to every other point and store them in a hashmap.
  // Points that share the same distance from point i can be part of a boomerang.
  // Whenever we add to the count for a distance, there are (distMap[dist] * 2) new pairs. We multiply by 2 because the order of (j, k) can be swapped to (k, j).

// Time Complexity: O(n^2) 852ms
// Space Complexity: O(n) 48.2MB
var numberOfBoomerangs = function(points) {
  let n = points.length, ans = 0;
  for (let i = 0; i < n; i++) {
    let distMap = {};
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      let dist = getDist(points[i][0], points[i][1], points[j][0], points[j][1]);
      let pairs = distMap[dist] || 0;
      ans += pairs * 2;
      distMap[dist] = pairs + 1;
    }
  }
  return ans;
};

function getDist(x1, y1, x2, y2) {
  let xDist = x1 - x2, yDist = y1 - y2;
  return (xDist * xDist) + (yDist * yDist);
}

// Three test cases
console.log(numberOfBoomerangs([[0,0],[1,0],[2,0]])) // 2
console.log(numberOfBoomerangs([[1,1],[2,2],[3,3]])) // 2
console.log(numberOfBoomerangs([[1,1]])) // 0