// 2013. Detect Squares
// You are given a stream of points on the X-Y plane. Design an algorithm that:
// Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.
// Given a query point, counts the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.
// An axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.
// Implement the DetectSquares class:
// DetectSquares() Initializes the object with an empty data structure.
// void add(int[] point) Adds a new point point = [x, y] to the data structure.
// int count(int[] point) Counts the number of ways to form axis-aligned squares with point point = [x, y] as described above. 


// Solution: Array + Frequency Count

// S.C: O(n)
// DetectSquares:
  // set this.points to [] (where we will store all [x, y] from the add function)
  // set this.freq to {} (stores the count of each [x, y] from the add function)

// T.C: O(1), S.C: O(1)
// add: (point)
  // push point into this.points
  // increment the frequency count of point by one 

// T.C: O(n), S.C: O(1)
// count: (point)
  // [x, y] = point
  // count = 0 (number of squares)
  // loop through each [a, b] in this.points *
    // (look for diagonally opposite point -> both x and y must be different from a and b, AND difference must be the same)
    // if x is equal to a OR y is equal to b OR Math.abs(x - a) is not equal to Math.abs(y, b), continue.
    // otherwise, 
      // increment count by this.freq([x, b]) * this.freq([a, y])
      // (^ this works because if one of the points doesn't exist, the product will always be 0)
  // *
  // return count

// Runtime on LeetCode: 2496ms
// Memory Usage on LeetCode: 58.2MB
var DetectSquares = function() {
  this.points = [];  
  this.freq = {};
};

DetectSquares.prototype.add = function(point) {
  this.points.push(point);
  this.freq[point] = (this.freq[point] || 0) + 1;
};

DetectSquares.prototype.count = function(point) {
  let [x, y] = point, count = 0;
  for (var [a, b] of this.points) {
    if (x === a || y === b || Math.abs(x - a) !== Math.abs(y - b)) continue;
    count += (this.freq[[x, b]] || 0) * (this.freq[[a, y]] || 0);
  }
  return count;
};

let detectSquares = new DetectSquares();
detectSquares.add([3, 10]);
detectSquares.add([11, 2]);
detectSquares.add([3, 2]);
console.log(detectSquares.count([11, 10])); // return 1
console.log(detectSquares.count([14, 8]));  // return 0
detectSquares.add([11, 2]);    // Adding duplicate points is allowed.
console.log(detectSquares.count([11, 10]));