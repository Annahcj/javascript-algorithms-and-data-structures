// 2848. Points That Intersect With Cars
// You are given a 0-indexed 2D integer array nums representing the coordinates of the cars parking on a number line. For any index i, nums[i] = [start[i], end[i]] where start[i] is the starting point of the ith car and end[i] is the ending point of the ith car.
// Return the number of integer points on the line that are covered with any part of a car.


// Solution 1: Merge Intervals

// Merge overlapping intervals, then get the ranges from each interval.

// 1. Sort nums by start in asc order.
// 2. Merge the intervals in nums.
// 3. Get the sum of interval ranges.

// Time Complexity: O(n log(n)) 71ms
// Space Complexity: O(n) 45MB
var numberOfPoints = function(nums) {
  nums.sort((a, b) => a[0] - b[0]);
  let mergedIntervals = [];
  for (let [start, end] of nums) {
    if (!mergedIntervals.length || mergedIntervals[mergedIntervals.length - 1][1] < start) { // not overlapping
      mergedIntervals.push([start, end]);
    } else {
      mergedIntervals[mergedIntervals.length - 1][1] = Math.max(mergedIntervals[mergedIntervals.length - 1][1], end);
    }
  }
  let uniquePoints = 0;
  for (let [start, end] of mergedIntervals) {
    uniquePoints += end - start + 1;
  }
  return uniquePoints;
};


// Solution 2: Sweep Line

// Instead of sorting, use sweep line to accumulate the counts of cars at each point.
// This solution is more efficient if number of points in the range is smaller than the number of intervals.

// n = length of nums, m = max point in the range
// Time Complexity: O(n + m) 64ms
// Space Complexity: O(n + m) 44.9MB
var numberOfPoints = function(nums) {
  let maxRange = Math.max(...nums.map(([_start, end]) => end));
  let sum = Array(maxRange + 2).fill(0);
  for (let [start, end] of nums) {
    sum[start]++;
    sum[end + 1]--;
  }
  let cars = 0, pointsWithCars = 0;
  for (let i = 0; i <= maxRange; i++) {
    cars += sum[i];
    pointsWithCars += cars > 0 ? 1 : 0;
  }
  return pointsWithCars;
};

// Two test cases
console.log(numberOfPoints([[3,6],[1,5],[4,7]])) // 7
console.log(numberOfPoints([[1,3],[5,8]])) // 7