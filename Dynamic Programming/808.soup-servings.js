// 808. Soup Servings
// There are two types of soup: type A and type B. Initially, we have n ml of each type of soup. There are four kinds of operations:
  // 1. Serve 100 ml of soup A and 0 ml of soup B,
  // 2. Serve 75 ml of soup A and 25 ml of soup B,
  // 3. Serve 50 ml of soup A and 50 ml of soup B, and
  // 4. Serve 25 ml of soup A and 75 ml of soup B.
// When we serve some soup, we give it to someone, and we no longer have it. Each turn, we will choose from the four operations with an equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as possible. We stop once we no longer have some quantity of both types of soup.
// Note that we do not have an operation where all 100 ml's of soup B are used first.
// Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time. Answers within 10^-5 of the actual answer will be accepted.


// Solution: DP & Logic

// Notice that the amount of soup served in each operation is a multiple of 25.
// We can make n smaller by taking 100ml as 4 servings of 25ml, 75ml as 3 servings, and so on.

// With some trial and error, we can see that when n is larger than 4500, the answer is always 1 (being 10^-5 off at most). 
// This is true because the change of soup A being empty first will only go up as n increases, since we don't have an operation where all 100mls of soup B are used first.

// Memoize each dp(servingsA, servingsB), where servingsA and servingsB represents the number of servings left for soup A and soupB respectively.
// For each dp(servingsA, servingsB), get the total probability from the four types of operations.

// m = min(4500/25, n/25)
// Time Complexity: O(m^2) 66ms
// Space Complexity: O(m^2) 43.2MB
var soupServings = function(n) {
  if (n > 4500) return 1;
  let m = Math.ceil(n / 25), memo = Array(m + 1).fill(0).map(() => Array(m + 1).fill(-1));
  return dp(m, m);
  
  function dp(servingsA, servingsB) {
    if (servingsA <= 0 && servingsB <= 0) return 0.5;
    if (servingsA <= 0) return 1;
    if (servingsB <= 0) return 0;
    if (memo[servingsA][servingsB] !== -1) return memo[servingsA][servingsB];
    
    return memo[servingsA][servingsB] = 0.25 * (dp(servingsA - 4, servingsB) + dp(servingsA - 3, servingsB - 1) + dp(servingsA - 2, servingsB - 2) + dp(servingsA - 1, servingsB - 3));
  }
};

// Two test cases
console.log(soupServings(50)) // 0.62500
console.log(soupServings(100)) // 0.71875