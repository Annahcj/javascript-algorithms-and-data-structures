// 2141. Maximum Running Time of N Computers
// You have n computers. You are given the integer n and a 0-indexed integer array batteries where the ith battery can run a computer for batteries[i] minutes. You are interested in running all n computers simultaneously using the given batteries.
// Initially, you can insert at most one battery into each computer. After that and at any integer time moment, you can remove a battery from a computer and insert another battery any number of times. The inserted battery can be a totally new battery or a battery from another computer. You may assume that the removing and inserting processes take no time.
// Note that the batteries cannot be recharged.
// Return the maximum number of minutes you can run all the n computers simultaneously.


// Solution: Binary Search

// 1. sort batteries in desc order
// 2. get sum of the batteries (loose upper bound)
// 3. binary search for the biggest n where the batteries can run more than or equal to (mid * n) minutes simultaneously.

// m = sum of batteries
// Time Complexity: O(m log(m)) 248ms
// Space Complexity: O(log(n)) (sorting algo) 55MB
var maxRunTime = function(n, batteries) {
  batteries.sort((a, b) => b - a);
  let sum = 0;
  for (var i = 0; i < batteries.length; i++) {
    sum += batteries[i];
  }
  
  let low = 1, high = sum;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(mid)) low = mid; // mid could be the final answer, but we still try to find a larger number of minutes
    else high = mid - 1;
  }
  return low;

  function isEnough(minutes) {
    let count = 0;
    for (var bat of batteries) {
      count += Math.min(bat, minutes); // can't take more than 'minutes' for each battery
      if (count >= minutes * n) return true; // time optimization, break early if condition is already met.
    }
    if (count >= minutes * n) return true;
  }
};

// Two test cases to run function on
console.log(maxRunTime(2, [3,3,3])) // 4
console.log(maxRunTime(2, [1,1,1,1])) // 2