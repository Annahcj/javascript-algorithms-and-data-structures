// 1723. Find Minimum Time to Finish All Jobs
// You are given an integer array jobs, where jobs[i] is the amount of time it takes to complete the ith job.
// There are k workers that you can assign jobs to. Each job should be assigned to exactly one worker. The working time of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the maximum working time of any worker is minimized.
// Return the minimum possible maximum working time of any assignment.


// Solution: Backtracking w/ Optimizations

// Keep an array 'working_time' of length k, where working_time[i] = the working time of the ith worker.
// Using backtracking to find the minimum maximum working time.
// Backtracking by itself will result in TLE, so we need to make some optimizations.
  // Optimization 1: When a working time exceeds the current minimum maximum working time, don't pursue that path.
  // Optimization 2: Only assign a job to one worker whose working time is 0. Otherwise we end up creating unnecessary permutations that result in the same answer.

var minimumTimeRequired = function(jobs, k) {
  let working_time = Array(k).fill(0), res = Infinity;
  let n = jobs.length;
  backtrack(0);
  return res;
  
  function backtrack(idx) {
    if (idx === n) {
      // get maximum working time
      res = Math.min(res, Math.max(...working_time));
      return;
    }
    
    for (let i = 0; i < k; i++) {
      if (working_time[i] + jobs[idx] >= res) continue; // pruning
      working_time[i] += jobs[idx];
      backtrack(idx + 1);
      working_time[i] -= jobs[idx];
      if (!working_time[i]) break; // pruning
    }
  }
};

// Two test cases to run function on
console.log(minimumTimeRequired([3,2,3], 3)) // 3
console.log(minimumTimeRequired([1,2,4,7,8], 2)) // 11