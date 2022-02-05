// 1235. Maximum Profit in Job Scheduling
// We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].
// You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.
// If you choose a job that ends at time X you will be able to start another job that starts at time X.


// Solution: Dynamic Programming w/ Binary Search & Sorting

// 1. Store each [startTime, endTime, profit] in an array 'jobs'.
// 2. Sort jobs by start time 
// 3. Loop from back to front
  // Binary search to find the lowest index where jobs[index]'s start time is bigger than or equal to the current end time.
  // Take the best of nextJob + current profit OR dp[i + 1].
// Return the max of dp.

// Time Complexity: O(n log(n)) 198ms
// Space Complexity: O(n) 60.6MB
var jobScheduling = function(startTime, endTime, profit) {
  let jobs = [], n = startTime.length;
  for (let i = 0; i < n; i++) {
    jobs.push([startTime[i], endTime[i], profit[i]]);
  }
  jobs.sort((a, b) => a[0] - b[0]);
  let dp = Array(n).fill(0), max = 0;
  for (let i = n - 1; i >= 0; i--) {
    let [start, end, prof] = jobs[i];
    let next = findNext(end);
    let nextJob = next === -1 ? 0 : dp[next];
    let adj = i === n - 1 ? 0 : dp[i + 1];
    dp[i] = Math.max(nextJob + prof, adj);
    max = Math.max(max, dp[i]);
  }
  return max;
  
  function findNext(end) { // finds the first job with a start time bigger than or equal to end
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (jobs[mid][0] >= end) high = mid;
      else low = mid + 1;
    }
    if (jobs[low][0] >= end) return low;
    return -1;
  }
};
  
// Three test cases to run function on
console.log(jobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70])) // 120
console.log(jobScheduling([1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60])) // 150
console.log(jobScheduling([1,1,1], [2,3,4], [5,6,4])) // 6