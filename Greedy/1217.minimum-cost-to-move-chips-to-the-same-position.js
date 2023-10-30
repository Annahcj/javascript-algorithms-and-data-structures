// 1217. Minimum Cost to Move Chips to The Same Position
// We have n chips, where the position of the ith chip is position[i].
// We need to move all the chips to the same position. In one step, we can change the position of the ith chip from position[i] to:
  // position[i] + 2 or position[i] - 2 with cost = 0.
  // position[i] + 1 or position[i] - 1 with cost = 1.
// Return the minimum cost needed to move all the chips to the same position.


// Solution: 

// Note: Each number in position indicates the index.
// e.g: [1,2,2,2] -> [[chip0], [chip1, chip2, chip3]]

// There is no cost to move a chip two spaces, which also means there is no cost to move indefinitely in either direction as long as the index we are moving to is an even distance away.
// If the distance to another chip is odd, it costs 1 to get there, since we can move the chip one space, then jump 2 spots until we reach the target.

// All we need to do is count the number of even chips and odd chips, and return the minimum of these counts.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 39.2MB
var minCostToMoveChips = function(position) {
  let even = 0, odd = 0;
  for (let idx of position) {
    idx % 2 === 0 ? even++ : odd++;
  }
  return Math.min(even, odd);
};

// Four test cases
console.log(minCostToMoveChips([1,2,3])) // 1
console.log(minCostToMoveChips([2,2,2,3,3])) // 2
console.log(minCostToMoveChips([1,1000000000])) // 1
console.log(minCostToMoveChips([1,2,2,2,2])) // 1