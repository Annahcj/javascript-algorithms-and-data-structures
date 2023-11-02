// 2766. Relocate Marbles
// You are given a 0-indexed integer array nums representing the initial positions of some marbles. You are also given two 0-indexed integer arrays moveFrom and moveTo of equal length.
// Throughout moveFrom.length steps, you will change the positions of the marbles. On the ith step, you will move all marbles at position moveFrom[i] to position moveTo[i].
// After completing all the steps, return the sorted list of occupied positions.
// Notes:
  // We call a position occupied if there is at least one marble in that position.
  // There may be multiple marbles in a single position.


// Solution: Set

// Initialize a set with the initial state of nums.
// For each move, remove moveFrom[i] from the set and add moveTo[i] to the set.
// At the end, sort and return the final positions in the set.

// n = length of nums, m = number of moves
// Time Complexity: O(n log(n) + m) 263ms
// Space Complexity: O(n) 77.5MB
var relocateMarbles = function(nums, moveFrom, moveTo) {
  let positions = new Set(nums);
  for (let i = 0; i < moveFrom.length; i++) {
    positions.delete(moveFrom[i]);
    positions.add(moveTo[i]);
  }
  return [...positions].sort((a, b) => a - b);
};

// Two test cases
console.log(relocateMarbles([1,6,7,8], [1,7,2], [2,9,5])) // [5,6,8,9]
console.log(relocateMarbles([1,1,3,3], [1,3], [2,2])) // [2]