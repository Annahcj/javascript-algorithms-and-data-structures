// 2528. Maximize the Minimum Powered City
// You are given a 0-indexed integer array stations of length n, where stations[i] represents the number of power stations in the ith city.
// Each power station can provide power to every city in a fixed range. In other words, if the range is denoted by r, then a power station at city i can provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
  // Note that |x| denotes absolute value. For example, |7 - 5| = 2 and |3 - 10| = 7.
// The power of a city is the total number of power stations it is being provided power from.
// The government has sanctioned building k more power stations, each of which can be built in any city, and have the same range as the pre-existing ones.
// Given the two integers r and k, return the maximum possible minimum power of a city, if the additional power stations are built optimally.
// Note that you can build the k power stations in multiple cities.


// Solution: Binary Search 

// Binary search for the maximum minimum power of a city.
  // lower bound: 0
  // upper bound: minimum power of a city + k

// To find whether we can have a minimum power of x for every city:
  // Keep a sliding window of size r*2+1.
  // If the total sum of the sliding window is less than k, then we need to add the missing new stations to the end of the sliding window (at index i + window size - 1).
    // Increase stations[i + window size - 1] by the missing amount of stations.
  // If we don't have enough k left, then we return false.

// n = length of stations, m = minimum power of a city + k
// Time Complexity: O(n log(m)) 228ms
// Space Complexity: O(n) 65.5MB
var maxPower = function(stations, r, k) {
  let n = stations.length, windowSize = Math.min(n, r * 2 + 1);
  let low = 0, high = getUpperBound();
  while (low < high) {
    let mid = low + Math.ceil((high - low) / 2);
    if (isPossible(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  // get the minimum power of a city + k
  function getUpperBound() {
    let powerSum = 0, minPowerSum = Infinity;
    for (let i = 0; i < n; i++) {
      powerSum += stations[i];
      if (i >= windowSize) {
        powerSum -= stations[i - windowSize];
      }
      if (i >= windowSize - 1 || i >= r) { // i >= r: some cities don't have as many stations on the left
        minPowerSum = Math.min(minPowerSum, powerSum);
      }
    }
    for (let i = Math.max(0, n - windowSize); i < n - r - 1; i++) {
      powerSum -= stations[i];
      minPowerSum = Math.min(minPowerSum, powerSum);
    }
    return minPowerSum + k;
  }  
  
  function isPossible(minPower) {
    let powers = [...stations], powerSum = 0, currK = k;
    // sliding window of size windowSize - e.g: r = 2, windowSize = 5, [_, _, |, _, _] the mid element is the city we are considering.
    // each index i is the end index of each window. the city we are considering is at index i - r.
    for (let i = 0; i < n; i++) {
      powerSum += powers[i];
      if (i >= windowSize) {
        powerSum -= powers[i - windowSize];
      }
      if (i >= r) {
        // considering city i - r
        if (powerSum < minPower) {
          // not enough even if we add currK
          if (powerSum + currK < minPower) return false;
          let missingPower = minPower - powerSum;
          powers[i] += missingPower;
          powerSum += missingPower;
          currK -= missingPower;
        }
      }
    }
    // account for the ending cities
    for (let i = Math.max(0, n - windowSize); i < n - r - 1; i++) {
      powerSum -= powers[i];
      if (powerSum < minPower) {
        if (powerSum + currK < minPower) return false;
        let missingPower = minPower - powerSum;
        powerSum += missingPower;
        currK -= missingPower;
      }
    }
    return true;
  }
};

// Two test cases
console.log(maxPower([1,2,4,5,0], 1, 2)) // 5
console.log(maxPower([4,4,4,4], 1, 3)) // 9