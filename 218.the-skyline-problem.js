// 218. The Skyline Problem
// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.


// Solution: 

// 1. Add all start and end points (separately) into a set, then turn it into an array.
// 2. Sort the points in asc order
// 3. Loop through each point
  // Loop through each building and get the maximum height from buildings that are in the range of point.
  // (within range = start point is smaller or equal, end point is larger)
  // Add [point, maximum height] to the result IF last height in result is not equal to the current maximum height
// 4. Return result

// Time Complexity: O(n^2) 208ms
// Space Complexity: O(n) 43.5MB
var getSkyline = function(buildings) {
  let points = new Set();
  for (var [start, end] of buildings) {
    points.add(start);
    points.add(end);
  }
  points = [...points];
  points.sort((a, b) => a - b);

  let res = [];
  for (var point of points) {
    let maxHeight = 0;
    for (var i = 0; i < buildings.length; i++) {
      if (buildings[i][0] > point) break;
      if (buildings[i][1] > point) maxHeight = Math.max(maxHeight, buildings[i][2]);
    }
    if (!res.length || res[res.length - 1][1] !== maxHeight) {
      res.push([point, maxHeight]);
    }
  }
  return res;
};

// Two test cases to run function on
console.log(getSkyline([[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]])) // [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
console.log(getSkyline([[0,2,3],[2,5,3]])) // [[0,3],[5,0]]