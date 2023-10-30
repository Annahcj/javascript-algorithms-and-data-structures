// 2054. Two Best Non-Overlapping Events
// You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.
// Return this maximum sum.
// Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.


// Solution: Dynamic Programming w/ Binary Search & Sorting

// 1. Sort events by start time
// 2. Loop from back to front
  // Binary search to get the first event where the start time is larger than the current end time.
  // Set dp[i] to max(current val, dp[i + 1]) (moving down the max vals)
  // Get the max of nextVal (dp[next]) + val.

// Time Complexity: O(n log(n)) 228ms
// Space Complexity: O(n) 67.3MB
var maxTwoEvents = function(events) {
  events.sort((a, b) => a[0] - b[0]);
  let n = events.length, max = 0;
  let dp = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let [_start, end, val] = events[i];
    let next = findNext(end);
    let nextVal = next === -1 ? 0 : dp[next];
    let adj = i === n - 1 ? 0 : dp[i + 1]; // the max at i + 1
    dp[i] = Math.max(val, adj);
    max = Math.max(max, nextVal + val);
  }
  return max;
  
  function findNext(end) { // finds first event where the start time is bigger than end
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (events[mid][0] > end) high = mid;
      else low = mid + 1;
    }
    return events[low][0] > end ? low : -1;
  }
};

// Two test cases
console.log(maxTwoEvents([[1,3,2],[4,5,2],[2,4,3]])) // 4
console.log(maxTwoEvents([[1,3,2],[4,5,2],[1,5,5]])) // 5