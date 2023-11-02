// 1604. Alert Using Same Key-Card Three or More Times in a One Hour Period
// LeetCode company workers use key-cards to unlock office doors. Each time a worker uses their key-card, the security system saves the worker's name and the time when it was used. The system emits an alert if any worker uses the key-card three or more times in a one-hour period.
// You are given a list of strings keyName and keyTime where [keyName[i], keyTime[i]] corresponds to a person's name and the time when their key-card was used in a single day.
// Access times are given in the 24-hour time format "HH:MM", such as "23:51" and "09:49".
// Return a list of unique worker names who received an alert for frequent keycard use. Sort the names in ascending order alphabetically.


// Solution: Sorting

// 1. Group the keyTimes so their keyName. Turn each keyTime into the total minutes. format -> people: {keyName: [keyTime in mins, keyTime in mins]}
// 2. For each unique person, sort the minutes in asc order, 
  // use sliding window technique to check whether any time[i + 2] - time[i] >= 60.
  // if such a pair exists, push the name into the result and break out of it (since we only take unique names)

// Time Complexity: O(n log(n)) 328ms
// Space Complexity: O(n) 84.1MB
var alertNames = function(keyName, keyTime) {
  let people = {}, n = keyName.length;
  for (let i = 0; i < n; i++) {
    let hour = +keyTime[i].slice(0, 2), mins = +keyTime[i].slice(3);
    let totalMins = hour * 60 + mins;
    if (!people[keyName[i]]) people[keyName[i]] = [];
    people[keyName[i]].push(totalMins);
  }
  let res = [];
  for (let name in people) {
    people[name].sort((a, b) => a - b);
    for (let i = 0; i < people[name].length - 2; i++) {
      if (people[name][i + 2] - people[name][i] <= 60) {
        res.push(name);
        break;
      }
    }
  }
  return res.sort();
};

// Two test cases
console.log(alertNames(["daniel","daniel","daniel","luis","luis","luis","luis"], ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"])) //["daniel"]
console.log(alertNames(["alice","alice","alice","bob","bob","bob","bob"], ["12:01","12:00","13:01","21:00","21:20","21:30","23:00"])) // ["bob"]