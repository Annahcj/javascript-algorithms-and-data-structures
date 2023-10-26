// 587. Erect the Fence
// Frequency: 0.45%
// You are given an array trees where trees[i] = [xi, yi] represents the location of a tree in the garden.
// You are asked to fence the entire garden using the minimum length of rope as it is expensive. The garden is well fenced only if all the trees are enclosed.
// Return the coordinates of trees that are exactly located on the fence perimeter.



// Solution: Andrew's Monotone Chain Algorithm

// Sort the trees in increasing order based on their x coordinate, tiebreakers by the y coordinate.
// Compute in two segments: the lower hull and the upper hull
// Lower hull: leftmost ->
// Upper hull: <- rightmost 
// (going anti-clockwise)
// Loop through trees left to right, then right to left, push points into hull,
  // as long as the there are no right turns -> push xy into hull
    // if crossproduct of (second-last xy, last xy, current xy) is
      // 1. bigger than 0, that means its a right turn, and the last xy becomes invalid, so we pop it off the hull.
      // 2. smaller than 0, that means we can push it into the hull
      // 3. equal to 0, that means the three points are in a straight line, so we can push it into the hull

// At the end, return the unique coordinates in the hull.

// Time Complexity: O(n log(n)) 92ms
// Space Complexity: O(n) 44MB

var outerTrees = function(trees) {
  function crossProduct(p, q, r) {
    return (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  }
  trees = trees.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
  })
  let hull = [];
  for (var i = 0; i < trees.length; i++) {
    while (hull.length >= 2 && crossProduct(hull[hull.length - 2], hull[hull.length - 1], trees[i]) > 0) {
      hull.pop();
    }
    hull.push(trees[i]);
  }
  hull.pop();
  for (var i = trees.length - 1; i >= 0; i--) {
    while (hull.length >= 2 && crossProduct(hull[hull.length - 2], hull[hull.length - 1], trees[i]) > 0) {
      hull.pop();
    }
    hull.push(trees[i]);
  }
  let set = new Set(hull);
  return Array.from(set);
};

// Two test case to run function on
console.log(outerTrees([[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]])) // [[1,1],[2,0],[3,3],[2,4],[4,2]]
console.log(outerTrees([[1,2],[2,2],[4,2]])) // [[4,2],[2,2],[1,2]]