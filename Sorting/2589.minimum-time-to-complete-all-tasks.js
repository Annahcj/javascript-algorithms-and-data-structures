// 2589. Minimum Time to Complete All Tasks
// There is a computer that can run an unlimited number of tasks at the same time. You are given a 2D integer array tasks where tasks[i] = [start[i], end[i], duration[i]] indicates that the ith task should run for a total of duration[i] seconds (not necessarily continuous) within the inclusive time range [start[i], end[i]].
// You may turn on the computer only when it needs to run a task. You can also turn it off if it is idle.
// Return the minimum time during which the computer should be turned on to complete all tasks.


// Solution: Greedy w/ Sorting 

// Sort tasks by end time.
// For each task, try and use intervals that have already been used in the previous tasks.
// Then with the remaining intervals we have left, take the rightmost intervals (since we sorted tasks by end time).
// Count the total number of new intervals that we create.

// n = number of tasks, m = max(end[i])
// Time Complexity: O(nm) 368ms
// Space Complexity: O(m) 51.3MB
var findMinimumTime = function(tasks) {
  let used = new Set(), totalTime = 0;
  tasks.sort((a, b) => a[1] - b[1]);
  for (let [start, end, duration] of tasks) {
    let covered = Array(end + 1).fill(0);
    for (let i = start; i <= end && duration > 0; i++) {
      if (used.has(i)) {
        covered[i] = 1;
        duration--;
      }
    }
    totalTime += duration;
    for (let i = end; i >= start && duration > 0; i--) {
      if (!covered[i]) {
        used.add(i);
        duration--;
      }
    }
  }
  return totalTime;
};

// Two test cases
console.log(findMinimumTime([[2,3,1],[4,5,1],[1,5,2]])) // 2
console.log(findMinimumTime([[1,3,2],[2,5,3],[5,6,2]])) // 4