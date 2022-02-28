// 1870. Minimum Speed to Arrive on Time
// You are given a floating-point number hour, representing the amount of time you have to reach the office. To commute to the office, you must take n trains in sequential order. You are also given an integer array dist of length n, where dist[i] describes the distance (in kilometers) of the ith train ride.
// Each train can only depart at an integer hour, so you may need to wait in between each train ride.
  // For example, if the 1st train ride takes 1.5 hours, you must wait for an additional 0.5 hours before you can depart on the 2nd train ride at the 2 hour mark.
// Return the minimum positive integer speed (in kilometers per hour) that all the trains must travel at for you to reach the office on time, or -1 if it is impossible to be on time.
// Tests are generated such that the answer will not exceed 10^7 and hour will have at most two digits after the decimal point.


// Solution: Binary Search

// Binary search for the minimum time.
// To calculate the total hours for a certain speed, use Math.ceil(hours) + (dist[i] / speed) for each distance to round up to the next integer each time.

// Time Complexity: O(n log(10^7)) 213ms
// Space Complexity: O(1) 53.9MB
var minSpeedOnTime = function(dist, hour) {
  let n = dist.length;
  let low = 1, high = 10 ** 7;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return isEnough(low) ? low : -1;
      
  function isEnough(speed) {
    let hours = 0;
    for (let i = 0; i < n; i++) {
      hours = Math.ceil(hours) + (dist[i] / speed);
    }
    return hours <= hour;
  }
};

// Three test cases to run function on
console.log(minSpeedOnTime([1,3,2], 6)) // 1
console.log(minSpeedOnTime([1,3,2], 2.7)) // 3
console.log(minSpeedOnTime([1,3,2], 1.9)) // -1