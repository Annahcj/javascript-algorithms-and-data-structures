// 3320. Count The Number of Winning Sequences
// Alice and Bob are playing a fantasy battle game consisting of n rounds where they summon one of three magical creatures each round: a Fire Dragon, a Water Serpent, or an Earth Golem. In each round, players simultaneously summon their creature and are awarded points as follows:
  // If one player summons a Fire Dragon and the other summons an Earth Golem, the player who summoned the Fire Dragon is awarded a point.
  // If one player summons a Water Serpent and the other summons a Fire Dragon, the player who summoned the Water Serpent is awarded a point.
  // If one player summons an Earth Golem and the other summons a Water Serpent, the player who summoned the Earth Golem is awarded a point.
  // If both players summon the same creature, no player is awarded a point.
// You are given a string s consisting of n characters 'F', 'W', and 'E', representing the sequence of creatures Alice will summon in each round:
  // If s[i] == 'F', Alice summons a Fire Dragon.
  // If s[i] == 'W', Alice summons a Water Serpent.
  // If s[i] == 'E', Alice summons an Earth Golem.
// Bob’s sequence of moves is unknown, but it is guaranteed that Bob will never summon the same creature in two consecutive rounds. Bob beats Alice if the total number of points awarded to Bob after n rounds is strictly greater than the points awarded to Alice.
// Return the number of distinct sequences Bob can use to beat Alice.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP

// Memoize each dp[score][prev], where
  // score = the running score of the sequence
  // prev = previous character in the sequence

// Only store the results from the previous index in s.
// Derive the current row based on the previous row.
// For every index i, try to take every character (add 1 point, subtract 1 point, or stay the same depending on the character we take).
// For every curr[score][char], there are two possible characters we could have taken previously. Add them up for the total number of sequences ending with `char`.

// At the end, return the sum of sequences with a score greater than 0.

// n = length of s
// Time Complexity: O(n^2) 751ms
// Space Complexity: O(n^2) 62.4MB
var countWinningSequences = function(s) {
  let n = s.length, charMap = {F: 0, W: 1, E: 2};
  let MOD = 1000000007, offset = n;
  let prev = Array(n * 2 + 1).fill(0).map(() => Array(3).fill(0));
  for (let char = 0; char < 3; char++) {
    let score = getScore(char, charMap[s[0]]);
    prev[offset + score][char] = 1;
  }
  for (let i = 1; i < n; i++) {
    let curr = Array(n * 2 + 1).fill(0).map(() => Array(3).fill(0));
    for (let score = -i - 1 + offset; score <= i + 1 + offset; score++) {
      for (let char = 0; char < 3; char++) {
        let diffChars = getDifferentChars(char);
        for (let prevChar of diffChars) {
          let currScore = getScore(char, charMap[s[i]]);
          if (score - currScore < 0 || score - currScore > n * 2) continue;
          curr[score][char] = (curr[score][char] + prev[score - currScore][prevChar]) % MOD;
        }
      }
    }
    prev = curr;
  }
  let ans = 0;
  for (let score = 1 + offset; score <= n + offset; score++) {
    for (let char = 0; char < 3; char++) {
      ans = (ans + prev[score][char]) % MOD; 
    }
  }
  return ans;
};

function getDifferentChars(char) {
  if (char === 0) return [1, 2];
  if (char === 1) return [0, 2];
  return [0, 1];
}

// F = 0, W = 1, E = 2
// Fire Dragon > Earth Golem
// Water Serpent > Fire Dragon
// Earth Golem > Water Serpent
// 0 > 2
// 1 > 0
// 2 > 1
function getScore(bob, alice) {
  if (bob === alice) return 0;
  if (bob === 0 && alice === 2) return 1;
  if (bob === 1 && alice === 0) return 1;
  if (bob === 2 && alice === 1) return 1;
  return -1;
}

// Two test cases
console.log(countWinningSequences("FFF")) // 3
console.log(countWinningSequences("FWEFW")) // 18