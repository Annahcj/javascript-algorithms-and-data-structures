// 1366. Rank Teams by Votes
// In a special ranking system, each voter gives a rank from highest to lowest to all teams participated in the competition.
// The ordering of teams is decided by who received the most position-one votes. If two or more teams tie in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.
// Given an array of strings votes which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.
// Return a string of all teams sorted by the ranking system.


// Solution: Custom Sorting

// Get the frequencies of ranks each team places in.
// Since the teams can only be uppercase letters, there can only be a maximum of 26. 
// This means that there can also only be 26 possible ranks.
// We can use a 26 by 26 matrix to store the frequencies of ranks for each team.

// Then, get the teams and sort them using their rank frequencies.
// To elaborate, whichever team has a higher rank frequency faster is the team to go ahead of the other.

// n = votes.length
// Time Complexity: O(n log(n)) 133ms
  // inner loop and custom comparator is 26 at most, constant.
// Space Complexity: O(26^2 + log(n)) 42MB
  // each character has 26 possible ranks, so 26 * 26.
  // the sorting algo takes log(n) space
var rankTeams = function(votes) {
  let teams = Array(26), chars = [];
  for (var i = 0; i < votes.length; i++) {
    for (var j = 0; j < votes[i].length; j++) {
      let idx = votes[i].charCodeAt(j) - 65;
      if (!teams[idx]) {
        teams[idx] = Array(26).fill(0);
        chars.push(votes[i][j]);
      }
      // the position/rank = j 
      teams[idx][j]++;
    }
  }
  return chars.sort((a, b) => {
    let aIdx = a.charCodeAt() - 65, bIdx = b.charCodeAt() - 65;
    for (var i = 0; i < 26; i++) {
      if (teams[aIdx][i] > teams[bIdx][i]) return -1;
      else if (teams[bIdx][i] > teams[aIdx][i]) return 1;
    }
    return aIdx - bIdx
  }).join("");
};

// Three test cases to run function on
console.log(rankTeams(["ABC","ACB","ABC","ACB","ACB"])) // ACB
console.log(rankTeams(["WXYZ","XYZW"])) // XWYZ
console.log(rankTeams(["ZMNAGUEDSJYLBOPHRQICWFXTVK"])) // ZMNAGUEDSJYLBOPHRQICWFXTVK