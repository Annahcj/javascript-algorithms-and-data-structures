// 3147. Taking Maximum Energy From the Mystic Dungeon
// In a mystic dungeon, n magicians are standing in a line. Each magician has an attribute that gives you energy. Some magicians can give you negative energy, which means taking energy from you.
// You have been cursed in such a way that after absorbing energy from magician i, you will be instantly transported to magician (i + k). This process will be repeated until you reach the magician where (i + k) does not exist.
// In other words, you will choose a starting point and then teleport with k jumps until you reach the end of the magicians' sequence, absorbing all the energy during the journey.
// You are given an array energy and an integer k. Return the maximum possible energy you can gain.


// Solution: Prefix Sum

// Each index is part of the group i % k.
// For each mod group, we need to find the sum of all elements in the group.
// However, there is the possibility that numbers near the start have a negative sum, and since we can start at any index, we can choose to start later.
// Go through energy from left-to-right and store the running sum for each mod group.
// If the current sum is negative, just take the current number - essentially resetting the sum.
// At the end, return the maximum running sum out of all mod groups.

// Time Complexity: O(n) 93ms
// Space Complexity: O(k) 65MB
var maximumEnergy = function(energy, k) {
  let n = energy.length, maxEnergy = Array(k).fill(-Infinity);
  for (let i = 0; i < n; i++) {
    let modIndex = i % k;
    maxEnergy[modIndex] = Math.max(maxEnergy[modIndex] + energy[i], energy[i]);
  }
  return Math.max(...maxEnergy);
};

// Two test cases
console.log(maximumEnergy([5,2,-10,-5,1], 3)) // 3
console.log(maximumEnergy([-2,-3,-1], 2)) // -1