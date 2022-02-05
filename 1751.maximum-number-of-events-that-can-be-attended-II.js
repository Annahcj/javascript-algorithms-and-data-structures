// 1751. Maximum Number of Events That Can Be Attended II
// You are given an array of events where events[i] = [startDayi, endDayi, valuei]. The ith event starts at startDayi and ends at endDayi, and if you attend this event, you will receive a value of valuei. You are also given an integer k which represents the maximum number of events you can attend.
// You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: that is, you cannot attend two events where one of them starts and the other ends on the same day.
// Return the maximum sum of values that you can receive by attending events.


// Solution: Dynamic Programming w/ Binary Search & Sorting

// 1. Sort by start time
// 2. Use recursion & memoization to find the max sum.
  // memo[i][k] = max sum at events[i] with k events left
  // use binary search to find the first event where start time is bigger than end.
  // For each event, we have two choices:
    // 1. Skip event i 
    // 2. Attend event i and go to the next attendable event (found using binary search)
  // Return the max of the two choices.

// Time Complexity: O(nk + n log(n)) 503ms
// Space Complexity: O(n) 136.1MB
var maxValue = function(events, k) {
  let n = events.length, memo = Array(n);
  events.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < n; i++) memo[i] = Array(k);
  return dp(0, k);

  function dp(i, k) {
    if (i === n || k === 0) return 0;
    if (memo[i][k] !== undefined) return memo[i][k];
    
    let [start, end, val] = events[i];
    let ans = dp(i + 1, k); // skip event i
    let next = binarySearch(end);
    ans = Math.max(ans, dp(next, k - 1) + val); // attend current event and go to next attendable event
    return memo[i][k] = ans;
  }
  
  function binarySearch(end) { // returns first event where start time is bigger than end
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (events[mid][0] > end) high = mid;
      else low = mid + 1;
    }
    return events[low][0] > end ? low : n;
  }
};

// Two test cases to run function on
console.log(maxValue([[1,2,4],[3,4,3],[2,3,1]], 2)) // 7
console.log(maxValue([[1,2,4],[3,4,3],[2,3,10]], 2)) // 10