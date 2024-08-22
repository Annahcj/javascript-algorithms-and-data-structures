// 3259. Maximum Energy Boost From Two Drinks
// You are given two integer arrays energyDrinkA and energyDrinkB of the same length n by a futuristic sports scientist. These arrays represent the energy boosts per hour provided by two different energy drinks, A and B, respectively.
// You want to maximize your total energy boost by drinking one energy drink per hour. However, if you want to switch from consuming one energy drink to the other, you need to wait for one hour to cleanse your system (meaning you won't get any energy boost in that hour).
// Return the maximum total energy boost you can gain in the next n hours.
// Note that you can start consuming either of the two energy drinks.


// Solution: DP

// Keep track of four states:
  // 1. prevPrevA: The max energy ending with drink A, at the previous previous index (needed when we switch to another drink type).
  // 2. prevPrevB: The max energy ending with drink B, at the previous previous index (needed when we switch to another drink type).
  // 3. prevA: The max energy ending with drink A, at the previous index.
  // 4. prevB: The max energy ending with drink B, at the previous index.

// For each index i, we can either 
  // 1. Stay with the same drink type and take the energy at the previous energy ending with the same type.
  // 2. Switch the drink type and take the energy at the previous previous energy ending with the other type.

// Update those four states as we go through each index.

// Time Complexity: O(n) 109ms
// Space Complexity: O(1) 68.4MB
function maxEnergyBoost(energyDrinkA, energyDrinkB) {
  let prevPrevA = 0, prevPrevB = 0;
  let prevA = 0, prevB = 0;
  let n = energyDrinkA.length;
  for (let i = 0; i < n; i++) {
    let currA = Math.max(energyDrinkA[i] + prevA, energyDrinkA[i] + prevPrevB);
    let currB = Math.max(energyDrinkB[i] + prevB, energyDrinkB[i] + prevPrevA);
    prevPrevA = prevA;
    prevPrevB = prevB;
    prevA = currA;
    prevB = currB;
  }
  return Math.max(prevA, prevB);
};

// Two test cases
console.log(maxEnergyBoost([1,3,1], [3,1,1])) // 5
console.log(maxEnergyBoost([4,1,1], [1,1,3])) // 7