// 2895. Minimum Processing Time
// You have n processors each having 4 cores and n * 4 tasks that need to be executed such that each core should perform only one task.
// Given a 0-indexed integer array processorTime representing the time at which each processor becomes available for the first time and a 0-indexed integer array tasks representing the time it takes to execute each task, return the minimum time when all of the tasks have been executed by the processors.
// Note: Each core executes the task independently of the others.


// Solution: Sorting

// It is optimal to pair the earliest available processor with the task that takes the longest.
// This way, the maximum time it takes to complete a task is minimized. 

// Sort processorTime in asc order and sort tasks in desc order.
// The first quarter of tasks will be processed by the first processor in sorted order, the second quarter by the second processor, and so on.

// Time Complexity: O(n log(n)) 144ms
// Space Complexity: O(log(n)) (space for sorting) 56.9MB
var minProcessingTime = function(processorTime, tasks) {
  processorTime.sort((a, b) => a - b);
  tasks.sort((a, b) => b - a);
  let n = processorTime.length, finishTime = 0;
  for (let i = 0; i < n * 4; i++) {
    finishTime = Math.max(finishTime, processorTime[Math.floor(i / 4)] + tasks[i]);
  }
  return finishTime;
};

// Two test cases
console.log(minProcessingTime([8,10], [2,2,3,1,8,7,4,5])) // 16
console.log(minProcessingTime([10,20], [2,3,1,2,5,8,4,3])) // 23