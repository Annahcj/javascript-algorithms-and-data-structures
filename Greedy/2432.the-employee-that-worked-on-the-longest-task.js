// 2432. The Employee That Worked on the Longest Task
// There are n employees, each with a unique id from 0 to n - 1.
// You are given a 2D integer array logs where logs[i] = [id[i], leaveTime[i]] where:
  // id[i] is the id of the employee that worked on the ith task, and
  // leaveTime[i] is the time at which the employee finished the ith task. All the values leaveTime[i] are unique.
// Note that the ith task starts the moment right after the (i - 1)th task ends, and the 0th task starts at time 0.
// Return the id of the employee that worked the task with the longest time. If there is a tie between two or more employees, return the smallest id among them.


// Solution: Compare Adjacent

// Compare adjacent logs and record the id of the employee with the longest leaveTime difference.
// The first task needs to be handled separately because there is no previous log: Take the leaveTime as it is since it starts from time 0.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 46.5MB
var hardestWorker = function(n, logs) {
  let m = logs.length;
  let maxTime = logs[0][1], res = logs[0][0];
  for (let i = 1; i < m; i++) {
    let timeTaken = logs[i][1] - logs[i - 1][1];
    if (timeTaken >= maxTime) {
      res = timeTaken === maxTime ? Math.min(res, logs[i][0]) : logs[i][0];
      maxTime = timeTaken;
    } 
  }
  return res;
};

// Three test cases
console.log(hardestWorker(10, [[0,3],[2,5],[0,9],[1,15]])) // 1
console.log(hardestWorker(26, [[1,1],[3,7],[2,12],[7,17]])) // 3
console.log(hardestWorker(2, [[0,10],[1,20]])) // 0