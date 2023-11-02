// 1007. Minimum Domino Rotations For Equal Row
// In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)
// We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.
// Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.
// If it cannot be done, return -1.


// Solution: Count Occurances in Top & Bottom

// 1. Count the occurances of a number in top - countT
// 2. Count the occurances of a number in bottom - countB
// 3. Count the occurances of a number where both the top and bottom is equal - countSame
// 4. Loop through the possible numbers: 1 to 6
  // They can be swapped successfully if countT[i] + countB[i] - countSame[i] is equal to n.
  // Take the minimum cost of swapping:
    // 1. Swap from the top to bottom (where a number is at the top): n - countT[i]
    // 2. Swap from the bottom to top (where a number is at the bottom): n - countB[i]
 
// Time Complexity: O(n) 102ms
// Space Complexity: O(1) 51.5MB
var minDominoRotations = function(tops, bottoms) {
  let n = tops.length, countT = Array(7).fill(0), countB = Array(7).fill(0), countSame = Array(7).fill(0);
  for (let i = 0; i < n; i++) {
    let top = tops[i], bottom = bottoms[i];
    countT[top]++;
    countB[bottom]++;
    if (top === bottom) countSame[top]++;
  }
  
  let ans = Infinity;
  for (let i = 1; i <= 6; i++) {
    if (countT[i] + countB[i] - countSame[i] === n) {
      let swapDown = n - countT[i], swapUp = n - countB[i];
      ans = Math.min(ans, swapDown, swapUp);
    }
  }
  return ans === Infinity ? -1 : ans;
};

// Two test cases 
console.log(minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2])) // 2
console.log(minDominoRotations([2,1,2,2], [2,1,2,2])) // -1