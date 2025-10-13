// 3494. Find the Minimum Amount of Time to Brew Potions
// You are given two integer arrays, skill and mana, of length n and m, respectively.
// In a laboratory, n wizards must brew m potions in order. Each potion has a mana capacity mana[j] and must pass through all the wizards sequentially to be brewed properly. The time taken by the ith wizard on the jth potion is timeij = skill[i] * mana[j].
// Since the brewing process is delicate, a potion must be passed to the next wizard immediately after the current wizard completes their work. This means the timing must be synchronized so that each wizard begins working on a potion exactly when it arrives. ​
// Return the minimum amount of time required for the potions to be brewed properly.


// Solution: Prefix Sum

// For each potion,
  // Calculate the minimum start time for the current potion by getting the maximum time out of all the wizards for the previous potion.
  // To calculate the maximum start time, for each wizard get the difference between the previous end time and the base start time (as if current potion starts at time 0).
// Keep track of the finish times of all the wizards for the previous potion.

// Time Complexity: O(nm) 405ms
// Space Complexity: O(n) 61MB
function minTime(skill, mana) {
  const n = skill.length, m = mana.length;
  const prevFinishTime = Array(n);
  let currTime = 0;
  for (let i = 0; i < n; i++) {
    currTime += skill[i] * mana[0];
    prevFinishTime[i] = currTime;
  }
  for (let j = 1; j < m; j++) {
    let maxFinishTime = 0, baseTime = 0;
    for (let i = 0; i < n; i++) {
      const diff = prevFinishTime[i] - baseTime;
      maxFinishTime = Math.max(maxFinishTime, diff);
      baseTime += skill[i] * mana[j];
    }
    prevFinishTime[0] = maxFinishTime + skill[0] * mana[j];
    for (let i = 1; i < n; i++) {
      prevFinishTime[i] = prevFinishTime[i - 1] + skill[i] * mana[j];
    }
  }
  return prevFinishTime[n - 1];
};

// Three test cases
console.log(minTime([1,5,2,4], [5,1,4,2])) // 110
console.log(minTime([1,1,1], [1,1,1])) // 5
console.log(minTime([1,2,3,4], [1,2])) // 21