// 2021. Brightest Position on Street
// A perfectly straight street is represented by a number line. The street has street lamp(s) on it and is represented by a 2D integer array lights. Each lights[i] = [positioni, rangei] indicates that there is a street lamp at position positioni that lights up the area from [positioni - rangei, positioni + rangei] (inclusive).
// The brightness of a position p is defined as the number of street lamp that light up the position p.
// Given lights, return the brightest position on the street. If there are multiple brightest positions, return the smallest one.


// Solution: Line Sweep w/ Hashmap & Prefix Sum

// Observations: We don't need to check each position, the start and end of each range is sufficient.
// 1. Turn each lights[i] into a range [position[i] - range[i], position[i] + range[i]]
// 2. Use a hashmap to store the count of lights at each position:
  // At the start of a range: +1
  // At the end of a range: -1 (note that the end is inclusive, so decrement the count at the position end + 1)
// 3. Turn the hashmap into an array, and sort by position in asc order.
// 4. Then, we can accumulate the lights from start to end.

// Time Complexity: O(n log(n)) 536ms
// Space Complexity: O(n) 103.1MB
var brightestPosition = function(lights) {
  let ranges = [], n = lights.length, points = new Map();
  for (let i = 0; i < n; i++) {
    let start = lights[i][0] - lights[i][1], end = lights[i][0] + lights[i][1]
    ranges.push([start, end]);
    points.set(start, (points.get(start) || 0) + 1);
    points.set(end + 1, (points.get(end + 1) || 0) - 1);
  }
  points = [...points].sort((a, b) => a[0] - b[0]);
  let sum = 0, [res, maxLights] = points[0];
  for (let [point, light] of points) {
    sum += light;
    if (sum > maxLights) {
      res = point;
      maxLights = sum;
    }
  }
  return res;
};

// Three test cases
console.log(brightestPosition([[-3,2],[1,2],[3,3]])) // -1
console.log(brightestPosition([[1,0],[0,1]])) // 1
console.log(brightestPosition([[1,2]])) // -1