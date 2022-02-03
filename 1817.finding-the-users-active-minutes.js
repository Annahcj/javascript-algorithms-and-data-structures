// 1817. Finding the Users Active Minutes
// You are given the logs for users' actions on LeetCode, and an integer k. The logs are represented by a 2D integer array logs where each logs[i] = [IDi, timei] indicates that the user with IDi performed an action at the minute timei.
// Multiple users can perform actions simultaneously, and a single user can perform multiple actions in the same minute.
// The user active minutes (UAM) for a given user is defined as the number of unique minutes in which the user performed an action on LeetCode. A minute can only be counted once, even if multiple actions occur during it.
// You are to calculate a 1-indexed array answer of size k such that, for each j (1 <= j <= k), answer[j] is the number of users whose UAM equals j.
// Return the array answer as described above.


// Solution: Hashmap & Hashset

// Use a hashmap to store hashsets of timelogs for each user.
// Loop through each user and get the uam (the size of the hashset). Increment res[uam - 1] by 1.

// Time Complexity: O(n) 410ms
// Space Complexity: O(n) 73.8MB
var findingUsersActiveMinutes = function(logs, k) {
  let map = {}, res = Array(k).fill(0);
  for (let [id, time] of logs) {
    if (!map[id]) map[id] = new Set();
    map[id].add(time);
  }
  for (let id in map) {
    let uam = map[id].size;
    res[uam - 1]++;
  }
  return res;
};

// Two test cases to run function on
console.log(findingUsersActiveMinutes([[0,5],[1,2],[0,2],[0,5],[1,3]], 5)) // [0,2,0,0,0]
console.log(findingUsersActiveMinutes([[1,1],[2,2],[2,3]], 4)) // [1,1,0,0]