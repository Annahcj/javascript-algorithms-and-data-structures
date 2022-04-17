// 2244. Minimum Rounds to Complete All Tasks
// You are given a 0-indexed integer array tasks, where tasks[i] represents the difficulty level of a task. In each round, you can complete either 2 or 3 tasks of the same difficulty level.
// Return the minimum rounds required to complete all the tasks, or -1 if it is not possible to complete all the tasks.


// Solution: Hashmap

// Count the occurances of each tasks[i]
// If there is a frequency of 1, it is impossible.

// Let's look at minimum rounds needed:
// 1: Impossible
// 2: 1
// 3: 1
// 4: 2
// 5: 2
// 6: 2
// 7: 3
// 8: 3
// 9: 3
// 10: 4
// ...
// We can see a common relation between the frequency and minimum number of rounds needed: Math.ceil(frequency / 3)

// Time Complexity: O(n) 275ms
// Space Complexity: O(n) 55.9MB
var minimumRounds = function(tasks) {
  let freq = {};
  for (let task of tasks) {
    freq[task] = (freq[task] || 0) + 1;
  }
  
  let ans = 0;
  for (let key in freq) {
    if (freq[key] === 1) return -1;
    ans += Math.ceil(freq[key] / 3);
  }
  return ans;
};

// Two test cases to run function on
console.log(minimumRounds([2,2,3,3,2,4,4,4,4,4])) // 4
console.log(minimumRounds([2,3,3])) // -1