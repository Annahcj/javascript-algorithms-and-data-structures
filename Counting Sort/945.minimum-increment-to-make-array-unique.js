// 945. Minimum Increment to Make Array Unique
// You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.
// Return the minimum number of moves to make every value in nums unique.


// Solution: Greedy w/ Counting

// For every duplicate number, we need to find the next available number.
// Whether this is done by jumping to the next number with no other occurances, or by incrementing by 1, then incrementing the next number by 1, until it reaches that earliest available number, makes no difference to the number of moves.

// Count the occurances of each number.
// Go through each number from 0 to the maximum, 
  // Count the "carry over" from the previous number. This is the count of duplicates.
  // Add the current count to the "carry over" count for the next number.
  // Add the carry over count to the total number of moves.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n + m) 89ms
// Space Complexity: O(m) 62.3MB
var minIncrementForUnique = function(nums) {
  let max = Math.max(...nums);
  let count = Array(max + 1).fill(0);
  for (let num of nums) {
    count[num]++;
  }
  let currCount = 0, moves = 0;
  for (let i = 0; i <= max || currCount > 1; i++) {
    // subtract one from previous carry over since we only want to count the duplicates
    currCount = Math.max(0, currCount - 1);
    // add on the current count for index i
    currCount += i <= max ? count[i] : 0;
    // add the carry over to the total number of moves
    moves += Math.max(0, currCount - 1);
  }
  return moves;
};

// Two test cases
console.log(minIncrementForUnique([1,2,2])) // 1
console.log(minIncrementForUnique([3,2,1,2,1,7])) // 6