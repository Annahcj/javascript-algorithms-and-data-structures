// 1360. Number of Days Between Two Dates
// Write a program to count the number of days between two dates.
// The two dates are given as strings, their format is YYYY-MM-DD as shown in the examples.


// Solution: new Date()

// new Date(date).getTime() returns the time in milliseconds.
// return the absolute difference between the two dates divided by the number of milliseconds in a day.

// Runtime on LeetCode: 85ms
// Memory Usage on LeetCode: 41.7MB
var daysBetweenDates = function(date1, date2) {
  let ms = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  return Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / ms;
};

// Two test cases to run function on
console.log(daysBetweenDates("2019-06-29", "2019-06-30")) // 1
console.log(daysBetweenDates("2020-01-15", "2019-12-31")) // 15