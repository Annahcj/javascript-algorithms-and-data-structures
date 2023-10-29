// 1626. Best Team With No Conflicts
// You are the manager of a basketball team. For the upcoming tournament, you want to choose the team with the highest overall score. The score of the team is the sum of scores of all the players in the team.
// However, the basketball team is not allowed to have conflicts. A conflict exists if a younger player has a strictly higher score than an older player. A conflict does not occur between players of the same age.
// Given two lists, scores and ages, where each scores[i] and ages[i] represents the score and age of the ith player, respectively, return the highest overall score of all possible basketball teams.


// Solution: DP & Sorting

// 1. Extract each [scores[i], ages[i]] to an array "players".
// 2. Sort players by score (desc) then by age (desc). This is so that we can take all players regardless or age when the score is equal.
// 3. Memoize each dp(i, prevAge). 
  // For each player[i], record the maximum score out of the two choices: Either take the ith player or not.
  // We can only take the ith player if the age is less than or equal to the previous age.

// n = number of players, m = max age
// Time Complexity: O(nm + n log(n)) 1085ms
// Space Complexity: O(nm) 74.9MB
var bestTeamScore = function(scores, ages) {
  let n = scores.length, maxAge = Math.max(...ages);
  let memo = Array(n).fill(0).map(() => Array(maxAge + 1).fill(-1)), players = [];
  for (let i = 0; i < n; i++) players.push([scores[i], ages[i]]);
  players.sort((a, b) => b[0] === a[0] ? b[1] - a[1] : b[0] - a[0]); // sort by score (desc) then by age (desc)
  return dp(0, maxAge);
  
  function dp(i, prevAge) {
    if (i === n) return 0;
    if (memo[i][prevAge] !== -1) return memo[i][prevAge];
    
    let max = dp(i + 1, prevAge); // don't take ith player
    let [score, age] = players[i];
    if (age <= prevAge) { // can only take ith player if the age is less than or equal to prevAge
      max = Math.max(max, dp(i + 1, age) + score);
    }
    return memo[i][prevAge] = max;
  }
};

// Three test cases
console.log(bestTeamScore([1,3,5,10,15], [1,2,3,4,5])) // 34
console.log(bestTeamScore([4,5,6,5], [2,1,2,1])) // 16
console.log(bestTeamScore([1,2,3,5], [8,9,10,1])) // 6