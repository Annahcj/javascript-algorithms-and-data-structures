// 2224. Minimum Number of Operations to Convert Time
// You are given two strings current and correct representing two 24-hour times.
// 24-hour times are formatted as "HH:MM", where HH is between 00 and 23, and MM is between 00 and 59. The earliest 24-hour time is 00:00, and the latest is 23:59.
// In one operation you can increase the time current by 1, 5, 15, or 60 minutes. You can perform this operation any number of times.
// Return the minimum number of operations needed to convert current to correct.


// Solution: Greedy

// 1. Convert both times to minutes.
// 2. Greedily count the number of operations to close the gap between the two times.

// Time Complexity: O(1) 101ms
// Space Complexity: O(1) 42.2MB
var convertTime = function(current, correct) {
  let currHours = +current.slice(0, 2), currMins = +current.slice(3);
  let correctHours = +correct.slice(0, 2), correctMins = +correct.slice(3);
  let currTime = currHours * 60 + currMins, correctTime = correctHours * 60 + correctMins;

  let diff = correctTime - currTime;
  let options = [60,15,5,1], res = 0;
  for (let i = 0; i < options.length; i++) {
    res += Math.floor(diff / options[i]);
    diff = diff % options[i];
  }
  return res;
};

// Two test cases to run function on
console.log(convertTime("02:30", "04:35")) // 3
console.log(convertTime("11:00", "11:01")) // 1