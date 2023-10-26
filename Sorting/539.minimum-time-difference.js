// 539. Minimum Time Difference
// Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.


// Solution: Sort & Compare Adjacent

// 1. Turn each timepoint into minutes
// 2. Sort timepoints
// 3. Add the first time +24 hours (1440 minutes) at the end of timePoints. (this is so that we can compare the last and first time)
// 4. Compare adjacent times and find the minimum time difference.

// Time Complexity: O(n log(n)) 114ms
// Space Complexity: O(log(n)) (space for sorting) 45.2MB
var findMinDifference = function(timePoints) {
  let n = timePoints.length;
  for (let i = 0; i < n; i++) {
    let hrs = +timePoints[i].slice(0, 2), mins = +timePoints[i].slice(3);
    timePoints[i] = hrs * 60 + mins;
  }
  timePoints.sort((a, b) => a - b);
  timePoints.push(timePoints[0] + 1440);
  
  let ans = Infinity;
  for (let i = 1; i <= n; i++) {
    ans = Math.min(ans, timePoints[i] - timePoints[i - 1]);
  }
  return ans;
};

// Two test cases to run function on
console.log(findMinDifference(["23:59","00:00"])) // 1
console.log(findMinDifference(["00:00","23:59","00:00"])) // 0