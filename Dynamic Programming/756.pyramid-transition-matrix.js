// 756. Pyramid Transition Matrix
// You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.
// To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.
// For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
// You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.
// Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.


// Solution: DP - Recursion w/ Memoization

// For each row with n blocks, there are 6^n combinations.
// Use recursion to backtrack through each valid combination.
// Memoize the states dp(prevRow, currRow) in a hashmap.

// Time Complexity: O(6^n * 6^(n-1)) 315ms
// Space Complexity: O(6^n * 6^(n-1)) 79MB
function pyramidTransition(bottom, allowed) {
  const allowedMap = {};
  for (let str of allowed) {
    const below = str.slice(0, 2);
    if (!allowedMap[below]) allowedMap[below] = [];
    allowedMap[str.slice(0, 2)].push(str[2]);
  }  
  const memo = new Map();
  return dp(bottom, "");
  
  function dp(prevRow, currRow) {
    const key = `${prevRow}-${currRow}`;
    if (memo.has(key)) return memo.get(key);
    if (currRow.length === prevRow.length - 1) {
      if (currRow.length === 1) {
        memo.set(key, true);
        return true;
      }
      return dp(currRow, "");
    }
    let valid = false, i = currRow.length;
    for (const nextBlock of (allowedMap[prevRow.slice(i, i + 2)] ?? [])) {
      if (dp(prevRow, currRow + nextBlock)) {
        valid = true;
        break;
      }
    }
    memo.set(key, valid);
    return valid;
  }
};

// Two test cases
console.log(pyramidTransition("BCD", ["BCC","CDE","CEA","FFF"])) // true
console.log(pyramidTransition("AAAA", ["AAB","AAC","BCD","BBE","DEF"])) // false