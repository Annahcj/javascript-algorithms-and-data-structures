// 2337. Move Pieces to Obtain a String
// You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:
  // The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
  // The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
// Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.


// Solution: Check Positions

// Being able to swap "_L" with "L_" means we can move L as far LEFT as we want until it reaches an R.
// Being able to swap "R_" with "_R" means we can move R as far RIGHT as we want until it reaches an L.
// When L and R meet, they can't be swapped.

// Conditions that need to be met:
  // 1. Start without _'s must be equal to end without _'s.
  // 2. Positions of L in start must be <= to the positions of L in end.
  // 3. Positions of R in start must be >= to the positions of R in end.

// To check for conditions 2 & 3, we can keep a running counter of L's and R's in start and end.
// If the count of L's in start is greater than the count of L's in end, it is invalid.
// If the count of R's in start is less than the count of R's in end, it is invalid.

// Time Complexity: O(n) 232ms
// Space Complexity: O(n) 63.7MB
var canChange = function(start, target) {
  let n = start.length;
  let start_str = "", target_str = "";
  for (let i = 0; i < n; i++) {
    if (start[i] !== '_') start_str += start[i];
    if (target[i] !== '_') target_str += target[i];
  }
  if (start_str !== target_str) return false; 

  let start_l_count = 0, target_l_count = 0;
  let start_r_count = 0, target_r_count = 0;
  for (let i = 0; i < n; i++) {
    if (start[i] === 'L') start_l_count++;
    else if (start[i] === 'R') start_r_count++;
    
    if (target[i] === 'L') target_l_count++;
    else if (target[i] === 'R') target_r_count++;
    
    if (start_l_count > target_l_count) return false; 
    if (start_r_count < target_r_count) return false; 
  }
  return true;  
};

// Three test cases to run function on
console.log(canChange("_L__R__R_", "L______RR")) // true
console.log(canChange("R_L_", "__LR")) // false
console.log(canChange("_R", "R_")) // false