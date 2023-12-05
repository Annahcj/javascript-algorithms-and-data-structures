// 1688. Count of Matches in Tournament
// You are given an integer n, the number of teams in a tournament that has strange rules:
  // If the current number of teams is even, each team gets paired with another team. A total of n / 2 matches are played, and n / 2 teams advance to the next round.
  // If the current number of teams is odd, one team randomly advances in the tournament, and the rest gets paired. A total of (n - 1) / 2 matches are played, and (n - 1) / 2 + 1 teams advance to the next round.
// Return the number of matches played in the tournament until a winner is decided.


// Solution 1: Simulation

// Time Complexity: O(log(n)) 56ms
// Space Complexity: O(1) 42.1MB
var numberOfMatches = function(n) {
  let matches = 0;
  while (n > 1) {
    matches += Math.floor(n / 2);
    n = Math.ceil(n / 2);
  }
  return matches;
};


// Solution 2: Logic

// In each match, one team will be eliminated.
// Each team will only get eliminated once, so the number of matches is equal to the number of teams - 1 (since the winning team will not get eliminated).

// Time Complexity: O(1) 48ms
// Space Complexity: O(1) 41.8MB
var numberOfMatches = function(n) {
  return n - 1;
};

// Two test cases
console.log(numberOfMatches(7)) // 6
console.log(numberOfMatches(14)) // 13