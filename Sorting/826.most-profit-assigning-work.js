// 826. Most Profit Assigning Work
// You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:
  // difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
  // worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
// Every worker can be assigned at most one job, but one job can be completed multiple times.
  // For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
// Return the maximum profit we can achieve after assigning the workers to the jobs.


// Solution: Sorting & Two Pointers

// 1. Sort jobs by difficulty and workers by ability.
// 2. Use two pointers to iterate through workers and jobs.
  // Anchor the first pointer through workers, and move the job pointer up while the job difficulty <= worker's ability.
  // Keep track of the running maximum profit.
  // Always assign the job with the maximum profit.

// n = number of jobs, m = number of workers
// Time Complexity: O(n log(n) + m log(m)) 101ms
// Space Complexity: O(n) 56.8MB
var maxProfitAssignment = function(difficulty, profit, worker) {
  let jobs = [], n = difficulty.length, m = worker.length;
  for (let i = 0; i < n; i++) {
    jobs.push([difficulty[i], profit[i]]);
  }
  jobs.sort((a, b) => a[0] - b[0]);
  worker.sort((a, b) => a - b);
  let totalProfit = 0, maxProfit = 0;
  for (let i = 0, j = 0; i < m; i++) {
    while (j < n && jobs[j][0] <= worker[i]) {
      maxProfit = Math.max(maxProfit, jobs[j][1]);
      j++;
    }
    totalProfit += maxProfit;
  }
  return totalProfit;
};

// Two test cases
console.log(maxProfitAssignment([2,4,6,8,10], [10,20,30,40,50], [4,5,6,7])) // 100
console.log(maxProfitAssignment([85,47,57], [24,66,99], [40,25,25])) // 0