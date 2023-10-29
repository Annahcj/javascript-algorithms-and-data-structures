// 1434. Number of Ways to Wear Different Hats to Each Other
// There are n people and 40 types of hats labeled from 1 to 40.
// Given a 2D integer array hats, where hats[i] is a list of all hats preferred by the ith person.
// Return the number of ways that the n people wear different hats to each other.
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: DP & Bitmask

// The key of this problem is to assign people to hats, not hats to people. 
// e.g: for the ith hat, assign people to it, instead of assigning hats to people.
// Use a bitmask to keep track of which people we have used so far.
// The finished state is (1 << n) - 1. e.g: when n = 5, (1 << n) = 100000 and (1 << n) - 1 = 11111

// Memoize each dp(i, pplMask), where 
  // i = hat index
  // pplMask = bitmask of people 
    // ith bit is 1 (used) or 0 (unused)

// Reverse hats to people, such that people[i] = people who can use the ith hat.
// For each hat i, count the number of ways:
  // 1. Skip it - we don't have to use every hat
  // 2. Assign it to a person - this must be an unused person in people[i].

// Time Complexity: O(40 * 2^n * n) 137ms
// Space Complexity: O(40 * 2^n) 44.2MB
var numberWays = function(hats) {
  let n = hats.length, finishedState = (1 << n) - 1, mod = 10 ** 9 + 7;
  let memo = Array(41).fill(0).map(() => Array(1 << n).fill(-1));
  let people = Array(41).fill(0).map(() => []); // people[i] = people who can use the ith hat
  for (let i = 0; i < n; i++) {
    for (let hat of hats[i]) {
      people[hat].push(i);
    }
  }
  return dp(1, 0);
  
  function dp(i, pplMask) { 
    if (pplMask === finishedState) return 1;
    if (i === 41) return 0;
    if (memo[i][pplMask] !== -1) return memo[i][pplMask];
    
    let ans = dp(i + 1, pplMask); // don't use the ith hat
    for (let person of people[i]) {
      if ((pplMask >> person) & 1) continue; // already used
      ans = (ans + dp(i + 1, pplMask | (1 << person))) % mod;  // assign ith hat to person
    }
    return memo[i][pplMask] = ans;
  }
};

// Three test cases 
console.log(numberWays([[3,4],[4,5],[5]])) // 1
console.log(numberWays([[3,5,1],[3,5]])) // 4
console.log(numberWays([[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]])) // 24