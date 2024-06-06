// 3169. Count Days Without Meetings
// You are given a positive integer days representing the total number of days an employee is available for work (starting from day 1). You are also given a 2D array meetings of size n where, meetings[i] = [start_i, end_i] represents the starting and ending days of meeting i (inclusive).
// Return the count of days when the employee is available for work but no meetings are scheduled.
// Note: The meetings may overlap.


// Solution: Sorting & Greedy

// Sort meetings by start day.
// From here, we process overlapping intervals: Keep track of the maximum end day of the current overlapping interval.
// If the current interval overlaps with the maximum end day, we extend the interval.
// If there is no overlap, add the number of days in between the current and previous intervals to our answer, then start the new interval.

// n = number of meetings
// Time Complexity: O(n log(n)) 206ms
// Space Complexity: O(log(n)) (space for sorting) 74.7MB
var countDays = function(days, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);
  let ans = 0, prevEnd = 0;
  for (let [start, end] of meetings) {
    ans += Math.max(0, start - prevEnd - 1);
    prevEnd = Math.max(prevEnd, end);
  }
  return ans + (days - prevEnd);
};

// Three test cases
console.log(countDays(10, [[5,7],[1,3],[9,10]])) // 2
console.log(countDays(5, [[2,4],[1,3]])) // 1
console.log(countDays(6, [[1,6]])) // 0