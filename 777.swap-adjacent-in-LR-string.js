// 777. Swap Adjacent in LR String
// In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string end, return True if and only if there exists a sequence of moves to transform one string to the other.


// Solution: Two Pointers

// Being able to swap "XL" with "LX" means we can move L as far LEFT as we want until it reaches an R.
// Being able to swap RX" with "XR" means we can move R as far RIGHT as we want until it reaches an L.
// When L and R meet, they can't be swapped.

// Conditions that need to be met:
  // 1. Start without X's must be equal to end without X's.
  // 2. Positions of L in start must be <= to the positions of L in end.
  // 3. Positions of R in start must be >= to the positions of R in end.

// To check for conditions 2 & 3, we can keep a running counter of L's and R's in start and end.
// If the count of L's in start is greater than the count of L's in end, it is invalid.
// If the count of R's in start is less than the count of R's in end, it is invalid.

// Time Complexity: O(n) 79ms
// Space Complexity: O(1) 44.3MB
var canTransform = function(start, end) {  
  let n = start.length;
  let start_str = "", end_str = "";
  for (let i = 0; i < n; i++) {
    if (start[i] !== 'X') start_str += start[i];
    if (end[i] !== 'X') end_str += end[i];
  }
  if (start_str !== end_str) return false; // the start and end without X's should be equal.

  let start_l_count = 0, end_l_count = 0;
  let start_r_count = 0, end_r_count = 0;
  for (let i = 0; i < n; i++) {
    if (start[i] === 'L') start_l_count++;
    else if (start[i] === 'R') start_r_count++;
    
    if (end[i] === 'L') end_l_count++;
    else if (end[i] === 'R') end_r_count++;
    
    if (start_l_count > end_l_count) return false; // this means there is an L in start ahead of an L in end.
    if (start_r_count < end_r_count) return false; // this means there is an R in start behind an R in end.
  }
  return true;
};

// Three test cases to run function on
console.log(canTransform("RXXLRXRXL", "XRLXXRRLX")) // true
console.log(canTransform("X", "L")) // false
console.log(canTransform("XXLRRL", "LRXXRL")) // false