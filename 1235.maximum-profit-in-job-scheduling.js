// 1235. Maximum Profit in Job Scheduling
// We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].
// You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.
// If you choose a job that ends at time X you will be able to start another job that starts at time X.


// Solution 1: Top-down Dynamic Programming

// Approach:
// Sort jobs by their start time.
// At any given job, we have two options:
// 1. Take the job, then find the next job (next job in which the time doesn't overlap with previous job)
// 2. Skip the job, and do the next job.

// We will use memoization/dynamic programming to store results that we have already calculated.
// Notice that since we are to either take the current job and find the next job, or skip the current job and do the next job, we will eventually come across the same job more than once. 
// In a much bigger test case, this becomes extremely slow, hence we must store these results in an array to prevent calculating it again.

// Algorithm:
// Keep an array jobs (in which we will store each job in the following format: [starttime, endtime, profit])
// Keep a dp array
// Loop through each job
  // Push [startTime[i], endTime[i], profit[i]] into jobs. (This way we can sort the array and have the information)
// Sort jobs in ascending order by their start times

// Create a function findNext: (accepts an index) (this function finds the next job which doesn't overlap with the previous job)
  // Keep the endTime of jobs[index] in a variable 'end'
  // Loop through jobs from index + 1 to the end of jobs (pointer = idx)
    // If jobs[idx]'s startTime is bigger than or equal to end, return idx.

// Create a recursive function calculate: (accepts the index)
  // Base case: If i is bigger than or equal to n (length of jobs), return 0.
  // If dp[i] has a value pre-calculated, return dp[i].
  // * These two steps are the two options mentioned above: (to take current, or to skip and take the next) *
  // Keep a variable 'take' equal to a recursive call: calculate(findNext(i)) + jobs[i][2] (profit of current job)
  // Keep a variable 'not' equal to calculate(i + 1)
  // Set dp[i] to Math.max(take, not)
  // Return dp[i]

// Return calculate(0);

// Time Complexity: O(n^2) 120ms
// Space Complexity: O(n) 58MB
  var jobScheduling = function(startTime, endTime, profit) {
    let jobs = [], n = startTime.length, dp = Array(n);
    for (var i = 0; i < n; i++) {
      jobs.push([startTime[i], endTime[i], profit[i]]);
    }  
    jobs = jobs.sort((a, b) => a[0] - b[0]);
    return calculate(0);
    function calculate(i) {
      if (i >= n) return 0;
      if (dp[i]) return dp[i];
      let take = calculate(findNext(i)) + jobs[i][2];
      let not = calculate(i + 1);
      dp[i] = Math.max(take, not);
      return dp[i];
    }
    function findNext(i) {
      let end = jobs[i][1];
      for (var idx = i + 1; idx < n; idx++) {
        if (jobs[idx][0] >= end) return idx;
      }
      return idx;
    }
  };
  
  // Three test cases to run function on
  console.log(jobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70])) // 120
  console.log(jobScheduling([1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60])) // 150
  console.log(jobScheduling([1,1,1], [2,3,4], [5,6,4])) // 6