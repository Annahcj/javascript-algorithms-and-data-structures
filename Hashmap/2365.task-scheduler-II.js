// 2365. Task Scheduler II
// You are given a 0-indexed array of positive integers tasks, representing tasks that need to be completed in order, where tasks[i] represents the type of the ith task.
// You are also given a positive integer space, which represents the minimum number of days that must pass after the completion of a task before another task of the same type can be performed.
// Each day, until all tasks have been completed, you must either:
  // Complete the next task from tasks, or
  // Take a break.
// Return the minimum number of days needed to complete all tasks.


// Solution: Hashmap

// For each type of task, record the next smallest day we are allowed to complete it.
// The next smallest day is the maximum of the current last day + 1 OR the minimum next day for this task.
// Keep track of the current number of days.

// Time Complexity: O(n) 136ms
// Space Complexity: O(n) 66.3MB
var taskSchedulerII = function(tasks, space) {
  let n = tasks.length, nextDay = new Map();
  let day = 0;
  for (let i = 0; i < n; i++) {
    day = Math.max(day + 1, nextDay.get(tasks[i]) || 1);
    nextDay.set(tasks[i], day + space + 1);
  }
  return day;
};

// Two test cases
console.log(taskSchedulerII([1,2,1,2,3,1], 3)) // 9
console.log(taskSchedulerII([5,8,8,5], 2)) // 6