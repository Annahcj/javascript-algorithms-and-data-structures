// 2141. Maximum Running Time of N Computers
// You have n computers. You are given the integer n and a 0-indexed integer array batteries where the ith battery can run a computer for batteries[i] minutes. You are interested in running all n computers simultaneously using the given batteries.
// Initially, you can insert at most one battery into each computer. After that and at any integer time moment, you can remove a battery from a computer and insert another battery any number of times. The inserted battery can be a totally new battery or a battery from another computer. You may assume that the removing and inserting processes take no time.
// Note that the batteries cannot be recharged.
// Return the maximum number of minutes you can run all the n computers simultaneously.

// Solution: Binary Search

// Proof: 
  // Because we take Math.min(minTime, batteries[i]), if (sum >= minTime * n), then we know that there are at least n batteries.
  // If there are at least n batteries and the sum of the battery times >= minTime * n, we can rearrange them however we want for the n computers to fulfill minTime per computer.

// n = number of computers, m = sum of batteries
// Time Complexity: O(m log(m)) 104ms
// Space Complexity: O(log(n)) (space for sorting) 54MB
var maxRunTime = function(n, batteries) {
  let low = 0, high = batteries.reduce((sum, time) => sum + time);
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(n, batteries, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isEnough(n, batteries, minTime) {
  let sum = 0;
  for (let i = 0; i < batteries.length; i++) {
    sum += Math.min(minTime, batteries[i]);
    if (sum >= minTime * n) return true;
  }
  return false;
}

// Two test cases to run function on
console.log(maxRunTime(2, [3,3,3])) // 4
console.log(maxRunTime(2, [1,1,1,1])) // 2