// 3185. Count Pairs That Form a Complete Day II
// Given an integer array hours representing times in hours, return an integer denoting the number of pairs i, j where i < j and hours[i] + hours[j] forms a complete day.
// A complete day is defined as a time duration that is an exact multiple of 24 hours.
// For example, 1 day is 24 hours, 2 days is 48 hours, 3 days is 72 hours, and so on.


// Solution: Counting Modulo Values

// Keep a running count of occurances of each `hour % 24`.
// For each hour, we need to find the other modulo value needed to make up a multiple of 24: 24 - (hour % 24)
// Return the total sum of count[(24 - (hour % 24)) % 24].

// n = length of hours
// Time Complexity: O(n) 97ms
// Space Complexity: O(24) = O(1) 77.6MB
var countCompleteDayPairs = function(hours) {
  let count = Array(24).fill(0), pairs = 0;
  for (let hour of hours) {
    pairs += count[(24 - (hour % 24)) % 24];
    count[hour % 24]++;
  }
  return pairs;
};

// Two test cases
console.log(countCompleteDayPairs([12,12,30,24,24])) // 2
console.log(countCompleteDayPairs([72,48,24,3])) // 3