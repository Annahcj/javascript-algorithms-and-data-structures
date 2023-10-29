// 1344. Angle Between Hands of a Clock
// Given two numbers, hour and minutes, return the smaller angle (in degrees) formed between the hour and the minute hand.
// Answers within 10-5 of the actual value will be accepted as correct.


// Solution: Math

// Each minute represents 6 degrees.
// Convert the hour to minutes: add on minutes / 60 and multiply by 5.
// The angle will be the absolute value of (hourAngle - minutes) * the degrees for minutes (6).
// Return the smaller angle: angle or 360 - angle.
 
// Time Complexity: O(1) 68ms
// Space Complexity: O(1) 39MB
var angleClock = function(hour, minutes) {
  let hourAngle = (hour + (minutes / 60)) * 5;
  let angle = Math.abs(hourAngle - minutes) * 6;
  return Math.min(angle, 360 - angle);
};

// Three test cases 
console.log(angleClock(12, 30)) // 165
console.log(angleClock(3, 30)) // 75
console.log(angleClock(3, 15)) // 7.5