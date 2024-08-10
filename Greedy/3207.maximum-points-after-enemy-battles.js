// 3207. Maximum Points After Enemy Battles
// You are given an integer array enemyEnergies denoting the energy values of various enemies.
// You are also given an integer currentEnergy denoting the amount of energy you have initially.
// You start with 0 points, and all the enemies are unmarked initially.
// You can perform either of the following operations zero or multiple times to gain points:
  // Choose an unmarked enemy, i, such that currentEnergy >= enemyEnergies[i]. By choosing this option:
    // You gain 1 point.
    // Your energy is reduced by the enemy's energy, i.e. currentEnergy = currentEnergy - enemyEnergies[i].
  // If you have at least 1 point, you can choose an unmarked enemy, i. By choosing this option:
    // Your energy increases by the enemy's energy, i.e. currentEnergy = currentEnergy + enemyEnergies[i].
    // The enemy i is marked.
// Return an integer denoting the maximum points you can get in the end by optimally performing operations.


// Solution: Greedy

// It's optimal to spend all energy on the enemy with the smallest energy, since the points we get will be 1 regardless of who it is.
// The first enemy we choose must be operation 1 (gain one point), because operation 2 can only be performed with at least 1 point.

// 1. Perform operation 1 on the enemy with smallest energy. 
// 2. Mark all enemies (operation 2) apart from the one with smallest energy. 
// 3. Use the accumulated energy as many times as possible on the smallest enemy.

// Time Complexity: O(n) 81ms
// Space Complexity: O(1) 66.2MB
function maximumPoints(enemyEnergies, initialEnergy) {
  let minEnergy = Infinity, currentEnergy = initialEnergy;
  for (let energy of enemyEnergies) {
    currentEnergy += energy;
    minEnergy = Math.min(minEnergy, energy);
  }
  if (initialEnergy < minEnergy) {
    return 0;
  }
  currentEnergy -= minEnergy;
  return Math.floor(currentEnergy / minEnergy);
};

// Two test cases
console.log(maximumPoints([3,2,2], 2)) // 3
console.log(maximumPoints([2], 10)) // 5