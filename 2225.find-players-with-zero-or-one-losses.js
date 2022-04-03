// 2225. Find Players With Zero or One Losses
// You are given an integer array matches where matches[i] = [winneri, loseri] indicates that the player winneri defeated player loseri in a match.
// Return a list answer of size 2 where:
  // answer[0] is a list of all players that have not lost any matches.
  // answer[1] is a list of all players that have lost exactly one match.
// The values in the two lists should be returned in increasing order.


// Solution: Hashmap

// Use a hashmap to count the number of losses for each player.
// In case a player hasn't lost any matches, we need to give it a count of 0 so that they are included in the hashmap.

// Get the players with count 0 and the players with count 1.
// Note: In JavaScript, the object keeps keys in ascending order, so we don't need to sort before returning.

// Time Complexity: O(n) 556ms
// Space Complexity: O(n) 116.8MB
var findWinners = function(matches) {
  let lost = {};
  for (let [winner, loser] of matches) {
    lost[winner] = (lost[winner] || 0);
    lost[loser] = (lost[loser] || 0) + 1;
  }
  let res = [[], []];
  for (let player in lost) {
    if (lost[player] === 0) res[0].push(+player);
    else if (lost[player] === 1) res[1].push(+player);
  }
  return res;
};

// Two test cases to run function on
console.log(findWinners([[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]])) // [[1,2,10],[4,5,7,8]]
console.log(findWinners([[2,3],[1,3],[5,4],[6,4]])) // [[1,2,5,6],[]]