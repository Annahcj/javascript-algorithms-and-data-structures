// 1732. Find the Highest Altitude
// There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.
// You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.


// Solution: Running Sum

// Keep track of the running sum of the gain, starting from 0.
// Record the maximum state of the running sum.

// Time Complexity: O(n) 55ms
// Space Complexity: O(1) 42MB
var largestAltitude = function(gain) {
  let n = gain.length, altitude = 0;
  let maxAltitude = altitude;
  for (let i = 0; i < n; i++) {
    altitude += gain[i];
    maxAltitude = Math.max(maxAltitude, altitude);
  }
  return maxAltitude;
};

// Two test cases
console.log(largestAltitude([-5,1,5,0,-7])) // 1
console.log(largestAltitude([-4,-3,-2,-1,4,3,2])) // 0