// 1575. Count All Possible Routes
// You are given an array of distinct positive integers locations where locations[i] represents the position of city i. You are also given integers start, finish and fuel representing the starting city, ending city, and the initial amount of fuel you have, respectively.
// At each step, if you are at city i, you can pick any city j such that j != i and 0 <= j < locations.length and move to city j. Moving from city i to city j reduces the amount of fuel you have by |locations[i] - locations[j]|. Please notice that |x| denotes the absolute value of x.
// Notice that fuel cannot become negative at any point in time, and that you are allowed to visit any city more than once (including start and finish).
// Return the count of all possible routes from start to finish. Since the answer may be too large, return it modulo 109 + 7.


// Solution: Top Down DP - Recursion w/ Memoization

// All the possible situations are each of the locations and the amount of fuel left. 
  // memo[i][fuel] = count of all possible routes from location i to finish with 'fuel' amount of fuel left.
// From each location, try to visit every other location as long as
  // 1. The location is not the same
  // 2. There is enough fuel to visit that location

// Time Complexity: O(n^2 * fuel) 293ms
// Space Complexity: O(n * fuel) 44.6MB
var countRoutes = function(locations, start, finish, fuel) {
  let n = locations.length, mod = 10 ** 9 + 7;
  let memo = Array(n).fill(0).map(() => Array(fuel + 1).fill(-1));
  return dfs(start, fuel);
  
  function dfs(i, fuel) {
    if (memo[i][fuel] !== -1) return memo[i][fuel]; // use memoized results
    
    let ans = i === finish ? 1 : 0; // one way to reach the finish
    for (let j = 0; j < n; j++) {
      let cost = Math.abs(locations[i] - locations[j]);
      if (j === i || cost > fuel) continue; // same location or not enough fuel
      ans = (ans + dfs(j, fuel - cost)) % mod;
    }
    return memo[i][fuel] = ans;
  }
};

// Three test cases to run function on
console.log(countRoutes([2,3,6,8,4], 1, 3, 5)) // 4
console.log(countRoutes([4,3,1], 1, 0, 6)) // 5
console.log(countRoutes([5,2,1], 0, 2, 3)) // 0