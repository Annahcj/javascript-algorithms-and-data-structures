// 774. Minimize Max Distance to Gas Station
// You are given an integer array stations that represents the positions of the gas stations on the x-axis. You are also given an integer k.
// You should add k new gas stations. You can add the stations anywhere on the x-axis, and not necessarily on an integer position.
// Let penalty() be the maximum distance between adjacent gas stations after adding the k new stations.
// Return the smallest possible value of penalty(). Answers within 10-6 of the actual answer will be accepted.


// Solution: Binary Search

// For e.g: stations = [1,2,5] and k = 2
// the values in stations are the x-axis values, so the optimal answer would be 1 because
// if we add two stations at positions 3 and 4, we would now get [1,2,3,4,5], where the max distance is 1.

// Set two pointers -> left = 0, right = val of last station - val of first station
// loop while left + 1e-6 (0.000001) is smaller than right
  // get mid pointer -> (left + right) / 2
  // count number of gas stations we need
  // loop through from 1 to n - 1 (comparing with prev station)
    // increment count by Math.floor((stations[i] - stations[i - 1]) / mid)
    // OR Math.ceil((stations[i] - stations[i - 1]) / mid) - 1 (both are accepted)
  // if count is bigger than k, (increase guess), set left to mid
  // otherwise, set right to mid
// return either left or right

// Time Complexity: O(n log(m)) 110ms
// Space Complexity: O(1) 41.8MB
var minmaxGasDist = function(stations, k) {
  let n = stations.length;
  let left = 0, right = stations[n - 1] - stations[0];
  while (left + 1e-6 < right) {
    let mid = (left + right) / 2;
    let count = 0;
    for (var i = 1; i < n; i++) {
      count += Math.floor((stations[i] - stations[i - 1]) / mid);
      // or Math.ceil((stations[i] - stations[i - 1]) / mid) - 1
    }
    if (count > k) left = mid;
    else right = mid;
  } 
  // returning left is also an accepted answer
  return right;
};

// Two test cases to run function on
console.log(minmaxGasDist([1,2,3,4,5,6,7,8,9,10], 9)) // 0.50000
console.log(minmaxGasDist([23,24,36,39,46,56,57,65,84,98], 1)) // 14.00000