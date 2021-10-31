// 2059. Minimum Operations to Convert Number
// You are given a 0-indexed integer array nums containing distinct numbers, an integer start, and an integer goal. There is an integer x that is initially set to start, and you want to perform operations on x such that it is converted to goal. You can perform the following operation repeatedly on the number x:
// If 0 <= x <= 1000, then for any index i in the array (0 <= i < nums.length), you can set x to any of the following:
// x + nums[i]
// x - nums[i]
// x ^ nums[i] (bitwise-XOR)
// Note that you can use each nums[i] any number of times in any order. Operations that set x to be out of the range 0 <= x <= 1000 are valid, but no more operations can be done afterward.
// Return the minimum number of operations needed to convert x = start into goal, and -1 if it is not possible.


// Solution: Level by Level BFS w/ Set

// n = length of nums, m = range size
// Time Complexity: O(nm) 376ms
// Space Complexity: O(nm) 45.3MB
var minimumOperations = function(nums, start, goal) {
  let seen = new Set(), queue = [start];
  let lvl = 0;
  while (queue.length) {
    // level by level bfs, so that we know how many moves it took.
    let next = [];
    while (queue.length) {
      let curr = queue.pop();
      // loop through each num in nums
      for (var num of nums) {
        // three new numbers
        let add = curr + num;
        let subtract = curr - num;
        let xor = curr ^ num;
        let choices = [add, subtract, xor];
        // loop through the three new numbers
        for (var choice of choices) {
          // immediately check whether choice is equal to goal
          if (choice === goal) return lvl + 1;
          // skip if we have already seen choice or choice is out of bounds
          if (seen.has(choice) || choice < 0 || choice > 1000) continue;
          // add it to next, and mark it as visited.
          next.push(choice);
          seen.add(choice);
        }
      }
    }
    // increment the level by one, and reset queue to next
    lvl++;
    queue = next;
  }
  // if it is impossible, return -1
  return -1;
};

// Three test cases to run function on
console.log(minimumOperations([2,8,16], 0, 1)) // -1
console.log(minimumOperations([1,3], 6, 4)) // 2
console.log(minimumOperations([3,5,7], 0, -4)) // 2