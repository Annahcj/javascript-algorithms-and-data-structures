// 759. Employee Free Time
// We are given a list schedule of employees, which represents the working time for each employee.
// Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.
// Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

// LeetCode provided Interval node
 function Interval(start, end) {
    this.start = start;
    this.end = end;
 };
 
 
 // Solution: Sorting Intervals
 
 // First, we loop through schedule, and push each interval in schedule[i] into an array (intervals).
 // Sort the array by the start times
 // Set a 'maxEnd' equal to the first interval's end time.
 // Loop through intervals (pointer = j)
   // If intervals[j]'s start time is bigger than maxEnd
     // Push the free time (maxEnd to intervals[j].start) into result array.
   // Update maxEnd if intervals[j]'s end time is bigger than maxEnd
 // Return result
 
 // Time Complexity: O(n log(n)) 88ms
 // Space Complexity: O(n) (number of intervals in schedule) 46.2MB
 var employeeFreeTime = function(schedule) {
   let intervals = [], result = [];
   for (var i = 0; i < schedule.length; i++) {
     for (var interval of schedule[i]) {
       intervals.push(interval);
     }
   }
   intervals = intervals.sort((a, b) => a.start - b.start);
   let maxEnd = intervals[0].end;
   for (var j = 1; j < intervals.length; j++) {
     if (intervals[j].start > maxEnd) {
       result.push(new Interval(maxEnd, intervals[j].start));
     }
     maxEnd = Math.max(maxEnd, intervals[j].end);
   }
   return result;
 };
 
 // Two test cases to run function on
 console.log(employeeFreeTime([[new Interval(1, 2), new Interval(5, 6)], [new Interval(1, 3)], [new Interval(4, 10)]])) // [[3,4]]
 console.log(employeeFreeTime([[new Interval(1, 3), new Interval(6, 7)], [new Interval(2, 4)], [new Interval(2, 5), new Interval(9, 12)]])) // [[5,6],[7,9]]