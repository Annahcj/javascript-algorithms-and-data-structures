// 1943. Describe the Painting


// Solution: Sweep Line

// Sweep line algorithm, use a hashmap to keep track of change at each point.
// For a segment [start, end, mix],
  // count[start] += mix
  // count[end] -= mix
// The prefix sum at any given point is the total sum for the point.

// Note that we can't rely on the sum being different to signify change.
// There will be a change of combination at each start or end point in segments.
// Hence, we need to use a hashmap to keep track of change instead of an array.
  // Integer keys in a Javascript hashmap are sorted in ascending order by default.

// n = number of points in segments
// Time Complexity: O(n) 946ms
// Space Complexity: O(n) 107.8MB
var splitPainting = function(segments) {
  let count = {};
  for (let [start, end, mix] of segments) {
    count[start] = (count[start] || 0) + mix;
    count[end] = (count[end] || 0) - mix;
  }
  let res = [], pSum = 0, prevPoint = -1;
  for (let point in count) {
    let end = Number(point);
    if (prevPoint !== -1 && pSum > 0) res.push([prevPoint, end, pSum]);
    pSum += count[point];
    prevPoint = end;
  }
  return res;
};

// Three test cases
console.log(splitPainting([[1,4,5],[4,7,7],[1,7,9]])) // [[1,4,14],[4,7,16]] 
console.log(splitPainting([[1,7,9],[6,8,15],[8,10,7]])) // [[1,6,9],[6,7,24],[7,8,15],[8,10,7]]
console.log(splitPainting([[1,4,5],[1,4,7],[4,7,1],[4,7,11]])) // [[1,4,12],[4,7,12]]