// 2933. High-Access Employees
// You are given a 2D 0-indexed array of strings, access_times, with size n. For each i where 0 <= i <= n - 1, access_times[i][0] represents the name of an employee, and access_times[i][1] represents the access time of that employee. All entries in access_times are within the same day.
// The access time is represented as four digits using a 24-hour time format, for example, "0800" or "2250".
// An employee is said to be high-access if he has accessed the system three or more times within a one-hour period.
// Times with exactly one hour of difference are not considered part of the same one-hour period. For example, "0815" and "0915" are not part of the same one-hour period.
// Access times at the start and end of the day are not counted within the same one-hour period. For example, "0005" and "2350" are not part of the same one-hour period.
// Return a list that contains the names of high-access employees with any order you want.


// Solution: Sorting & Hashmap

// 1. Convert each access time to minutes: minutes + hours * 60.
// 2. Sort the access times in asc order.
// 3. Group the access times by employee name.
// 4. For each employee, go through each access time for that employee, and check if the previous previous access time was less than 1 hour ago.

// n = length of access_times
// Time Complexity: O(n log(n)) 123ms
// Space Complexity: O(n) 54.2MB
var findHighAccessEmployees = function(access_times) {
  access_times = access_times.map(([name, time]) => [name, getMinutes(time)]).sort((a, b) => a[1] - b[1]);
  let accessTimesMap = {};
  for (let [name, time] of access_times) {
    if (!accessTimesMap[name]) accessTimesMap[name] = [];
    accessTimesMap[name].push(time);
  }
  let highAccess = [];
  for (let name in accessTimesMap) {
    let m = accessTimesMap[name].length;
    for (let i = 2; i < m; i++) {
      let accessTime = accessTimesMap[name][i];
      let prevPrevAccessTime = accessTimesMap[name][i - 2];
      if (accessTime - prevPrevAccessTime < 60) {
        highAccess.push(name);
        break;
      }
    }
  }
  return highAccess;
};

function getMinutes(time) {
  let mins = Number(time.slice(2));
  let hours = Number(time.slice(0, 2));
  return mins + hours * 60;
}

// Three test cases
console.log(findHighAccessEmployees([["a","0549"],["b","0457"],["a","0532"],["a","0621"],["b","0540"]])) // ["a"]
console.log(findHighAccessEmployees([["d","0002"],["c","0808"],["c","0829"],["e","0215"],["d","1508"],["d","1444"],["d","1410"],["c","0809"]])) // ["c","d"]
console.log(findHighAccessEmployees([["cd","1025"],["ab","1025"],["cd","1046"],["cd","1055"],["ab","1124"],["ab","1120"]])) // ["ab","cd"]