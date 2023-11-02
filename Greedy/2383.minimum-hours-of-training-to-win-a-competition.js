// 2383. Minimum Hours of Training to Win a Competition
// You are entering a competition, and are given two positive integers initialEnergy and initialExperience denoting your initial energy and initial experience respectively.
// You are also given two 0-indexed integer arrays energy and experience, both of length n.
// You will face n opponents in order. The energy and experience of the ith opponent is denoted by energy[i] and experience[i] respectively. When you face an opponent, you need to have both strictly greater experience and energy to defeat them and move to the next opponent if available.
// Defeating the ith opponent increases your experience by experience[i], but decreases your energy by energy[i].
// Before starting the competition, you can train for some number of hours. After each hour of training, you can either choose to increase your initial experience by one, or increase your initial energy by one.
// Return the minimum number of training hours required to defeat all n opponents.


// Solution: Greedy Approach

// Keep track of the current energy and experience we have.
// When we reach an opponent, add to the energy and experience if we don't have enough.
  // If we don't have enough energy, we need to add energy[i] - current energy + 1 to make the current energy exceed energy[i].
    // After defeating the opponent, we will be left with 1 energy.
  // If we don't have enough experience, we need to add experience[i] - current experience + 1 to make the current experience exceed experience[i].
    // After defeating the opponent, we will gain experience[i].

// Record the total amount of energy and experience that has been added.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 42.2MB
var minNumberOfHours = function(initialEnergy, initialExperience, energy, experience) {
  let n = energy.length, hours = 0;
  let en = initialEnergy, ex = initialExperience;
  for (let i = 0; i < n; i++) {
    if (energy[i] >= en) {
      let diff = energy[i] - en + 1;
      en = 1;
      hours += diff;
    } else {
      en -= energy[i];
    } 

    if (experience[i] >= ex) {
      let diff = experience[i] - ex + 1;
      ex = experience[i] + 1 + experience[i];
      hours += diff;
    } else {
      ex += experience[i];
    }
  }  
  return hours;
};

// Two test cases
console.log(minNumberOfHours(5, 3, [1,4,3,2], [2,6,3,1])) // 8
console.log(minNumberOfHours(2, 4, [1], [3])) // 0