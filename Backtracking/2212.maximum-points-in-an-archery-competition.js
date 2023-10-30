// 2212. Maximum Points in an Archery Competition


// Solution: Backtracking

// Use backtracking to find all combinations of using the arrows.
// For each slot, try two choices:
  // 1. Don't use any arrows
  // 2. Use aliceArrows[idx] + 1 arrows to gain idx number of points

// Note: When we fill all slots and still have some arrows left, we can put the extra arrows in any slot.
  // In this solution, I have placed them in the last slot.

// Time Complexity: O(2^n) 80ms
// Space Complexity: O(2^n) 42.7MB
var maximumBobPoints = function(numArrows, aliceArrows) {
  let max = 0, n = aliceArrows.length, res;
  backtrack(numArrows, 0, 0, Array(n).fill(0));
  return res;

  function backtrack(arrows, idx, points, bobArrows) {
    if (idx === n || arrows === 0) {
      let origVal = bobArrows[n - 1];
      if (arrows > 0) bobArrows[n - 1] += arrows; // put extra arrows in any slot
      if (points > max) {
        max = points;
        res = [...bobArrows]; 
      }
      bobArrows[n - 1] = origVal;
      return;
    }

    backtrack(arrows, idx + 1, points, bobArrows); // don't use any arrows
    if (aliceArrows[idx] + 1 <= arrows) { // use aliceArrows[idx] + 1 arrows to gain idx points
      bobArrows[idx] = aliceArrows[idx] + 1;
      backtrack(arrows - (aliceArrows[idx] + 1), idx + 1, points + idx, bobArrows);
      bobArrows[idx] = 0;
    }
  }  
};

// Three test cases
console.log(maximumBobPoints(9, [1,1,0,1,0,0,2,1,0,1,2,0])) // [0,0,0,0,1,1,0,0,1,2,3,1]
console.log(maximumBobPoints(3, [0,0,1,0,0,0,0,0,0,0,0,2])) // [0,0,0,0,0,0,0,0,1,1,1,0]
console.log(maximumBobPoints(8, [0,0,3,0,0,0,0,0,0,2,3,0])) // [0,0,0,0,0,1,1,1,1,3,0,1]