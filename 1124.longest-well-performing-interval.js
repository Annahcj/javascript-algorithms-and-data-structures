// 1124. Longest Well-Performing Interval
// We are given hours, a list of the number of hours worked per day for a given employee.
// A day is considered to be a tiring day if and only if the number of hours worked is (strictly) greater than 8.
// A well-performing interval is an interval of days for which the number of tiring days is strictly larger than the number of non-tiring days.
// Return the length of the longest well-performing interval.


// Solution: Greedy w/ Hashmap

// Keep the earliest index of each prefix sum in a hashmap.
// If the current prefix sum <= 0, look for the first index of (prefix sum - 1). 
  // prefix sum - 1 = the amount we need to subtract to make the subarray (ending at index i) have a positive sum

// sum - 1 always gives us the longest result because before we get to sum - 2, there will always have been sum - 1 first.
// since sum - 1 comes first, the index will always be smaller, which means the interval length will be maximized.

// Time Complexity: O(n) 74ms
// Space Complexity: O(n) 44.5MB
var longestWPI = function(hours) {
  let count = 0, n = hours.length;
  let map = new Map(), maxLen = 0;
  for (let i = 0; i < n; i++) {
    count += hours[i] > 8 ? 1 : -1;
    if (count > 0) {
      maxLen = Math.max(maxLen, i + 1);
    } else {
      if (map.has(count - 1)) {
        maxLen = Math.max(maxLen, i - map.get(count - 1));
      } 
      if (!map.has(count)) map.set(count, i);
    }
  }
  return maxLen;
};

// Two test cases to run function on
console.log(longestWPI([9,9,6,0,6,6,9])) // 3
console.log(longestWPI([6,6,6])) // 0