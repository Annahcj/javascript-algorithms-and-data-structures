// 3114. Latest Time You Can Obtain After Replacing Characters
// You are given a string s representing a 12-hour format time where some of the digits (possibly none) are replaced with a "?".
// 12-hour times are formatted as "HH:MM", where HH is between 00 and 11, and MM is between 00 and 59. The earliest 12-hour time is 00:00, and the latest is 11:59.
// You have to replace all the "?" characters in s with digits such that the time we obtain by the resulting string is a valid 12-hour format time and is the latest possible.
// Return the resulting string.


// Solution:

// Time Complexity: O(1) 78ms
// Space Complexity: O(1) 50.7MB
var findLatestTime = function(s) {
  let hour = [s[0], s[1]];
  if (hour[0] === '?') {
    hour[0] = hour[1] === '?' || hour[1] <= '1' ? '1' : '0';
  } 
  if (hour[1] === '?') {
    hour[1] = hour[0] === '0' ? '9' : '1';
  }
  let minutes = [s[3], s[4]];
  if (minutes[0] === '?') {
    minutes[0] = '5';
  }
  if (minutes[1] === '?') {
    minutes[1] = '9';
  }
  return `${hour.join("")}:${minutes.join("")}`;
};

// Two test cases
console.log(findLatestTime("1?:?4")) // "11:54"
console.log(findLatestTime("0?:5?")) // "09:59"