// 2079. Watering Plants
// You want to water n plants in your garden with a watering can. The plants are arranged in a row and are labeled from 0 to n - 1 from left to right where the ith plant is located at x = i. There is a river at x = -1 that you can refill your watering can at.
// Each plant needs a specific amount of water. You will water the plants in the following way:
// Water the plants in order from left to right.
// After watering the current plant, if you do not have enough water to completely water the next plant, return to the river to fully refill the watering can.
// You cannot refill the watering can early.
// You are initially at the river (i.e., x = -1). It takes one step to move one unit on the x-axis.
// Given a 0-indexed integer array plants of n integers, where plants[i] is the amount of water the ith plant needs, and an integer capacity representing the watering can capacity, return the number of steps needed to water all the plants.


// Solution: Simulation

// Time Complexity: O(n)
// Space Complexity: O(1)
var wateringPlants = function(plants, capacity) {
  let steps = 0;
  let water = capacity;
  for (var i = 0; i < plants.length; i++) {
    if (plants[i] <= water) { // if we have enough water to water the entire plant
      steps++;
      water -= plants[i];
    } else { // not enough water, go back and refill
      steps += i + i + 1; // go back: i - 1 to -1, then come back from -1 to i
      water = capacity - plants[i]; // left-over water
    }
  }
  return steps;
};

// Two test cases
console.log(wateringPlants([2,2,3,3], 5)) // 14
console.log(wateringPlants([1,1,1,4,2,3], 4)) // 30