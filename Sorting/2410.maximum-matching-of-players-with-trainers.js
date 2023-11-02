// 2410. Maximum Matching of Players With Trainers
// You are given a 0-indexed integer array players, where players[i] represents the ability of the ith player. You are also given a 0-indexed integer array trainers, where trainers[j] represents the training capacity of the jth trainer.
// The ith player can match with the jth trainer if the player's ability is less than or equal to the trainer's training capacity. Additionally, the ith player can be matched with at most one trainer, and the jth trainer can be matched with at most one player.
// Return the maximum number of matchings between players and trainers that satisfy these conditions.


// Solution: Greedy w/ Sorting & Two Pointers 

// Greedily match players with trainers.
// Sort players and trainers in asc order.
// Use two pointers to keep track of which player and trainer we are up to.
  // If trainers[j] < players[i], we can't match trainers[j] with any remaining player. Skip the jth trainer.
  // Otherwise, match trainers[j] with players[i].
// Count and return the number of matches.

// Time Complexity: O(n log(n) + m log(m)) 416ms
// Space Complexity: O(log(n) + log(m)) (space for sorting) 54MB
var matchPlayersAndTrainers = function(players, trainers) {
  players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);
  let n = trainers.length, m = players.length, matches = 0;
  for (let j = 0, i = 0; j < n; j++) {
    if (players[i] <= trainers[j]) {
      i++;
      matches++;
    }
    if (i === m) break;
  }
  return matches;
};

// Two test cases
console.log(matchPlayersAndTrainers([4,7,9], [8,2,5,8])) // 2
console.log(matchPlayersAndTrainers([1,1,1], [10])) // 1