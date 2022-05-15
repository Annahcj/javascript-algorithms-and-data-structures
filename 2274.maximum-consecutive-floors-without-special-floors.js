// 2274. Maximum Consecutive Floors Without Special Floors
// Alice manages a company and has rented some floors of a building as office space. Alice has decided some of these floors should be special floors, used for relaxation only.
// You are given two integers bottom and top, which denote that Alice has rented all the floors from bottom to top (inclusive). You are also given the integer array special, where special[i] denotes a special floor that Alice has designated for relaxation.
// Return the maximum number of consecutive floors without a special floor.


// Solution: Sorting & Get Max Adjacent Difference

// 1. Get all the special floors within the range of [bottom, ..., top].
  // Add the edge cases bottom - 1 and top + 1, these are the starting and ending floors within the range.
  // The reason for -1 and +1 is that when we compare adjacent floors, both floors are not part of the consecutive floors, but the starting and ending floor is.
// 2. Sort the floors.
// 3. Get the max difference between two adjacent floors. 

// Time Complexity: O(n log(n)) 366ms
// Space Complexity: O(n) 60.3MB
var maxConsecutive = function(bottom, top, special) {
  let floors = [bottom - 1, top + 1];
  for (let floor of special) {
    if (floor >= bottom && floor <= top) floors.push(floor);
  } 
  floors.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 1; i < floors.length; i++) {
    ans = Math.max(ans, floors[i] - floors[i - 1] - 1);
  }
  return ans;
};

// Two test cases to run function on
console.log(maxConsecutive(2, 9, [4,6])) // 3
console.log(maxConsecutive(6, 8, [7,6,8])) // 0