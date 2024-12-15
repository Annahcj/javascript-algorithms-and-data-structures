// 3376. Minimum Time to Break Locks I
// Bob is stuck in a dungeon and must break n locks, each requiring some amount of energy to break. The required energy for each lock is stored in an array called strength where strength[i] indicates the energy needed to break the ith lock.
// To break a lock, Bob uses a sword with the following characteristics:
  // The initial energy of the sword is 0.
  // The initial factor X by which the energy of the sword increases is 1.
  // Every minute, the energy of the sword increases by the current factor X.
  // To break the ith lock, the energy of the sword must reach at least strength[i].
  // After breaking a lock, the energy of the sword resets to 0, and the factor X increases by a given value K.
// Your task is to determine the minimum time in minutes required for Bob to break all n locks and escape the dungeon.
// Return the minimum time required for Bob to break all n locks.


// Solution: Backtracking w/ Bitmasks

// Use backtracking to go through every permutation of locks, and use bitmasks to keep track of which locks we have already broken.
// We also need to keep track of the current minutes, the current energy, and X.
// Try to take every strength[i] as the next lock and calculate the number of minutes where we do nothing before we have enough energy: Math.ceil((strength[i] - curr energy) / X) + 1.

// n = length of strength
// Time Complexity: O(n! * n) 446ms
// Space Complexity: O(n) 52MB
function findMinimumTime(strength, K) {
  const n = strength.length, fullMask = (1 << n) - 1;
  let minTime = Infinity;
  backtrack(0, 0, 1, 0);
  return minTime;
  
  function backtrack(mask, currEnergy, X, minutes) {
    if (mask === fullMask) {
      minTime = Math.min(minTime, minutes - 1);
      return;
    }
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) continue;
      const newMask = mask | (1 << i);
      const minsToAcquireEnergy = Math.ceil((strength[i] - currEnergy) / X);
      const newX = X + K;
      backtrack(newMask, newX, newX, minutes + minsToAcquireEnergy + 1);
    }
  }  
};

// Two test cases
console.log(findMinimumTime([3,4,1], 1)) // 4
console.log(findMinimumTime([2,5,4], 2)) // 5