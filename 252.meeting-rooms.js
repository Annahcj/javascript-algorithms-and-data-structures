// 252. Meeting Rooms
// Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.


// Solution: Sorting

// Sort the intervals based on start time.
// Check to make sure no intervals's end time overlaps with the next interval's start time.

// Time Complexity: O(n log(n)) 76ms
// Space Complexity: O(log(n)) (sorting space) 40.2MB
var canAttendMeetings = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (var i = 1; i < intervals.length; i++) {
    if (intervals[i - 1][1] > intervals[i][0]) return false;
  } 
  return true;
};

// Two test cases to run function on
console.log(canAttendMeetings([[0,30],[5,10],[15,20]])) // false
console.log(canAttendMeetings([[7,10],[2,4]])) // true