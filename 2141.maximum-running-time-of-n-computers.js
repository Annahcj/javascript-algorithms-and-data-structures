// 2141. Maximum Running Time of N Computers
// You have n computers. You are given the integer n and a 0-indexed integer array batteries where the ith battery can run a computer for batteries[i] minutes. You are interested in running all n computers simultaneously using the given batteries.
// Initially, you can insert at most one battery into each computer. After that and at any integer time moment, you can remove a battery from a computer and insert another battery any number of times. The inserted battery can be a totally new battery or a battery from another computer. You may assume that the removing and inserting processes take no time.
// Note that the batteries cannot be recharged.
// Return the maximum number of minutes you can run all the n computers simultaneously.


// Solution: Binary Search

// 1. sort batteries in desc order
// 2. get sum of smaller batteries (batteries with an index >= n)
// 3. binary search for the biggest number of minutes where the remaining difference is less than or equal to the sum of smaller batteries

// e.g: n = 2, batteries = [3,3,3]
// smallerSum (sum of smaller batteries) = 3
// let's binary search:
// mid = 3: total diff of each battery with mid = 0. 0 <= 3 so we can try to find a bigger mid.

// mid = 4: total diff of each battery with mid = 2 ((4 - 3) + (4 - 3)). 2 <= 3 so we can try to find a bigger mid.

// mid = 5: total diff of each battery with mid = 4 ((5 - 3) + (5 - 3)). 4 > 3 so 5 cannot be the answer.

// NOTE: Binary search doesn't work in an incremented order, this is just for the purpose of an example.

// m = sum of batteries
// Time Complexity: O(n log(m)) 196ms
// Space Complexity: O(log(n)) (sorting algo) 51.6MB
var maxRunTime = function(n, batteries) {
  batteries.sort((a, b) => b - a);
  let smallerSum = 0, sum = 0;
  for (var i = 0; i < batteries.length; i++) {
    sum += batteries[i];
    if (i >= n) smallerSum += batteries[i];
  }
  
  let low = 1, high = sum;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    let diff = 0;
    for (var j = 0; j < n; j++) {
      diff += Math.max(mid - batteries[j], 0);
    }
    if (diff <= smallerSum) low = mid;
    else high = mid - 1;
  }
  return low;
};

// Two test cases to run function on
console.log(maxRunTime(2, [3,3,3])) // 4
console.log(maxRunTime(2, [1,1,1,1])) // 2