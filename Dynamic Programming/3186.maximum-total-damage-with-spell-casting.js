// 3186. Maximum Total Damage With Spell Casting
// A magician has various spells.
// You are given an array power, where each element represents the damage of a spell. Multiple spells can have the same damage value.
// It is a known fact that if a magician decides to cast a spell with a damage of power[i], they cannot cast any spell with a damage of power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2.
// Each spell can be cast only once.
// Return the maximum possible total damage that a magician can cast.


// Solution: DP

// Since we can take powers with the same damage, group them together by taking the count and making powers distinct - we can calculate the sum of damages from that.
// We only need to keep track of the last three results, since if we can't take power[i - 1] and power[i - 2], we can always take power[i - 3].

// For every distinct power, find the maximum previous index where the different in damage >= 3.
// Take the current damage + previous damage, and shift all the previous results to the left by 1.
// It's also possible that previous results are bigger than the current result, so take the maximum out of all the results.

// n = length of power
// Time Complexity: O(n log(n)) 506ms
// Space Complexity: O(n) 89.3MB
var maximumTotalDamage = function(power) {
  let count = {}, sorted = [];
  for (let p of power) {
    count[p] = (count[p] || 0) + 1;
    if (count[p] === 1) {
      sorted.push(p);
    }
  }
  sorted.sort((a, b) => a - b);
  let n = sorted.length, prev = Array(3).fill(0);
  for (let i = 0; i < n; i++) {
    let prevIndex = getPrevIndex(sorted, i);
    let damage = sorted[i] * count[sorted[i]];
    let totalDamage = prev[prevIndex] + damage;
    for (let j = 1; j <= 2; j++) {
      prev[j - 1] = prev[j];
    }
    prev[2] = Math.max(prev[0], prev[1], totalDamage);
  }
  return Math.max(...prev);
  
  // get the maximum previous index where sorted[i] - sorted[prevIndex] >= 3
  function getPrevIndex(sorted, i) {
    let indices = [i - 1, i - 2, i - 3];
    for (let index of indices) {
      if (index >= 0 && sorted[i] - sorted[index] >= 3) {
        // return index in prev array
        return 2 - (i - index - 1);
      }
    }
    return 0;
  }
};

// Two test cases
console.log(maximumTotalDamage([1,1,3,4])) // 6
console.log(maximumTotalDamage([7,1,6,6])) // 13