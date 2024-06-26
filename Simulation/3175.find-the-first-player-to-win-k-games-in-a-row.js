// 3175. Find The First Player to win K Games in a Row
// A competition consists of n players numbered from 0 to n - 1.
// You are given an integer array skills of size n and a positive integer k, where skills[i] is the skill level of player i. All integers in skills are unique.
// All players are standing in a queue in order from player 0 to player n - 1.
// The competition process is as follows:
  // The first two players in the queue play a game, and the player with the higher skill level wins.
  // After the game, the winner stays at the beginning of the queue, and the loser goes to the end of it.
// The winner of the competition is the first player who wins k games in a row.
// Return the initial index of the winning player.


// Solution: Simulation

// If k >= n, there is only one possible winner - the maximum element.
// Otherwise, we can simulate the process.

// n = skills.length
// Time Complexity: O(n + k) 366ms
  // It takes at most n comparisons to find the maximum element, then another k comparisons to get k wins.
// Space Complexity: O(n) 95.1MB
var findWinningPlayer = function(skills, k) {
  let n = skills.length;
  if (k >= n) {
    let maxIndex = 0;
    for (let i = 1; i < n; i++) {
      if (skills[i] > skills[maxIndex]) maxIndex = i;
    }
    return maxIndex;
  }
  
  let indices = {};
  for (let i = 0; i < n; i++) {
    indices[skills[i]] = i;
  }
  let consec = 0, i = 0;
  while (consec < k) {
    if (skills[i] > skills[i + 1]) {
      skills.push(skills[i + 1]);
      skills[i + 1] = skills[i];
      consec++;
    } else {
      skills.push(skills[i]);
      consec = 1;
    }
    i++;
  }
  return indices[skills[i]];
};

// Two test cases
console.log(findWinningPlayer([4,2,6,3,9], 2)) // 2
console.log(findWinningPlayer([2,5,4], 3)) // 1