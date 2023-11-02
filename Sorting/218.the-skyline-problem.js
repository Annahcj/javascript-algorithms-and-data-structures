// 218. The Skyline Problem
// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.


// Solution 1: Sorting & Brute Force

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


// Solution 2: Sorting & Heap

// 1. Split each building into start and end intervals:
  // [start, height, end]
  // [end, 0, -1 (not used, doesn't matter)]
// End intervals will always have height 0 to indicate the end of an interval.

// 2. Sort the split points by start position.

// 3. Line sweep over each sorted position.
  // The reason we need to sweep every position is that at each point, whether it is the start or end of an interval, 
  // we can have a change in maximum height and we need to record this change.

// For each position:
  // a. Remove expired points (points that have gone out of range: end interval <= current point)
  // b. Add the current [height, end] to the heap if it's a start interval.
  // c. If the maximum height has changed, add a new keypoint.

// Time Complexity: O(n log(n)) 197ms
// Space Complexity: O(n) 55.3MB
var getSkyline = function(buildings) {
  let points = [];
  for (let [start, end, height] of buildings) {
    points.push([start, height, end]);
    points.push([end, 0, -1]);
  }
  points.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
  
  let skyline = [[0, 0]]; // [x, height]
  let heap = new Heap((a, b) => b[0] - a[0]); // [height, end]
  heap.add([0, Infinity]);
  for (let [start, height, end] of points) {
    while (heap.top()[1] <= start) heap.remove(); // remove expired
    if (height > 0) heap.add([height, end]);
    if (heap.top()[0] !== skyline[skyline.length - 1][1]) {
      skyline.push([start, heap.top()[0]]);
    }
  }
  return skyline.slice(1);
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Two test cases
console.log(getSkyline([[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]])) // [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
console.log(getSkyline([[0,2,3],[2,5,3]])) // [[0,3],[5,0]]