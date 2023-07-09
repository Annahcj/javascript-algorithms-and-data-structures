// 2769. Find the Maximum Achievable Number
// You are given two integers, num and t.
// An integer x is called achievable if it can become equal to num after applying the following operation no more than t times:
  // Increase or decrease x by 1, and simultaneously increase or decrease num by 1.
// Return the maximum possible achievable number. It can be proven that there exists at least one achievable number.


// Solution: Logic

// It's always optimal for x to be larger than num, so that x - t = num + t
// x = num + t*2

// Time Complexity: O(1) 109ms
// Space Complexity: O(1) 45.9MB
var theMaximumAchievableX = function(num, t) {
  return num + t * 2;  
};

// Two test cases
console.log(theMaximumAchievableX(4, 1)) // 6
console.log(theMaximumAchievableX(3, 2)) // 7