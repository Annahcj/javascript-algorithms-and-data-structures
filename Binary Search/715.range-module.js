// 715. Range Module
// A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.
// A half-open interval [left, right) denotes all the real numbers x where left <= x < right.
// Implement the RangeModule class:
  // RangeModule() Initializes the object of the data structure.
  // void addRange(int left, int right) Adds the half-open interval [left, right), tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval [left, right) that are not already tracked.
  // boolean queryRange(int left, int right) Returns true if every real number in the interval [left, right) is currently being tracked, and false otherwise.
  // void removeRange(int left, int right) Stops tracking every real number currently being tracked in the half-open interval [left, right).


// Solution: Array & Binary Search

// Runtime on LeetCode: 304ms
// Memory Usage on LeetCode: 56.3MB

var RangeModule = function() {
  this.intervals = [];  
};

// addRange:

// Push non-overlapping intervals into a new array.
// Merge overlapping intervals and push the new interval into the new array.
// set intervals to the new array.

// Time Complexity: O(n)
// Space Complexity: O(n)
RangeModule.prototype.addRange = function(left, right) {
  let newIntervals = [], n = this.intervals.length;
  let start = left, end = right;
  let i = 0;
  while (i < n && this.intervals[i][1] < left) {
    newIntervals.push(this.intervals[i]);
    i++;
  }
  while (i < n && this.intervals[i][1] >= left && this.intervals[i][0] <= right) {
    start = Math.min(start, this.intervals[i][0]);
    end = Math.max(end, this.intervals[i][1]);
    i++;
  }
  newIntervals.push([start, end]);
  while (i < n) {
    newIntervals.push(this.intervals[i]);
    i++;
  }
  this.intervals = newIntervals;
};

// queryRange:

// binary search for the interval whose start is smaller than or equal to left AND whose end is bigger than or equal to right.

// Time Complexity: O(log(n))
// Space Complexity: O(1)
RangeModule.prototype.queryRange = function(left, right) {
  let low = 0, high = this.intervals.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (this.intervals[mid][0] <= left && this.intervals[mid][1] >= right) return true;
    else if (this.intervals[mid][1] < left) low = mid + 1;
    else high = mid - 1;
  }
  return false;
};

// removeRange:

// push any non-overlapping intervals into a new array.
// record the minimum start and maximum end of the overlapping intervals, 
// then push in the newly split intervals [min start, left], [right, max end]
// set intervals to the new array.

// Time Complexity: O(n)
// Space Complexity: O(n)
RangeModule.prototype.removeRange = function(left, right) {
  let newIntervals = [], n = this.intervals.length;
  let i = 0; 
  let start = Infinity, end = -Infinity;
  while (i < n && this.intervals[i][1] < left) {
    newIntervals.push(this.intervals[i]);
    i++;
  }
  while (i < n && this.intervals[i][0] <= right) {
    start = Math.min(start, this.intervals[i][0]);
    end = Math.max(end, this.intervals[i][1]);
    i++;
  }
  if (start <= left) newIntervals.push([start, left]);
  if (end >= right) newIntervals.push([right, end]);
  while (i < n) {
    newIntervals.push(this.intervals[i]);
    i++;
  }
  this.intervals = newIntervals;
};

// A few test cases
let rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
console.log(rangeModule.queryRange(10, 14)); // return True,(Every number in [10, 14) is being tracked)
console.log(rangeModule.queryRange(13, 15)); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
console.log(rangeModule.queryRange(16, 17)); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)