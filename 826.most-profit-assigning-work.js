// 826. Most Profit Assigning Work
// You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:
  // difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
  // worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
// Every worker can be assigned at most one job, but one job can be completed multiple times.
  // For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
// Return the maximum profit we can achieve after assigning the workers to the jobs.


// Solution: Sorting & Two Pointers

// 1. Group each difficulty[i] and profit[i] together in an array 'jobs'.
// 2. Sort jobs and worker based on difficulty
// 3. Use two pointers to find the job with the maximum profit for each worker.
  // Keep track of the max profit for jobs whose difficulty is less than or equal to worker[j].

// Time Complexity: O(n log(n) + m log(m)) 154ms
// Space Complexity: O(n) 50.5MB
var maxProfitAssignment = function(difficulty, profit, worker) {
  let jobs = [], n = difficulty.length, m = worker.length;
  for (let i = 0; i < n; i++) {
    jobs.push([difficulty[i], profit[i]]);
  }
  // sort jobs and worker based on difficulty
  jobs.sort((a, b) => a[0] - b[0]);
  worker.sort((a, b) => a - b);
  
  // two pointers to find maximum profit of valid jobs
  let i = 0, max = 0, ans = 0;
  for (let j = 0; j < m; j++) {
    while (i < n && jobs[i][0] <= worker[j]) { // find max profit for jobs whose difficulty is <= worker[j]
      max = Math.max(max, jobs[i][1]);
      i++;
    }
    ans += max;
  }
  return ans;
};

// Two test cases to run function on
console.log(maxProfitAssignment([2,4,6,8,10], [10,20,30,40,50], [4,5,6,7])) // 100
console.log(maxProfitAssignment([85,47,57], [24,66,99], [40,25,25])) // 0