// 2151. Maximum Good People Based on Statements
// There are two types of persons:
  // The good person: The person who always tells the truth.
  // The bad person: The person who might tell the truth and might lie.
// You are given a 0-indexed 2D integer array statements of size n x n that represents the statements made by n people about each other. More specifically, statements[i][j] could be one of the following:
  // 0 which represents a statement made by person i that person j is a bad person.
  // 1 which represents a statement made by person i that person j is a good person.
  // 2 represents that no statement is made by person i about person j.
// Additionally, no person ever makes a statement about themselves. Formally, we have that statements[i][i] = 2 for all 0 <= i < n.
// Return the maximum number of people who can be good based on the statements made by the n people.


// Solution: Combinations of Bitmasks

// Get all combinations for n people. Each person can be good or bad (1 or 0).
// Since n <= 15 and we only need to mark 1 or 0, we can use bitmasks to represent these combinations.
// For each combination, check if the combination is valid:
  // All statements made by good people must be correct
  // Statements made by bad people are completely disregarded
// If the combination is valid, get the number of ones in the bitmask, keep track of the largest number of ones.

// Time Complexity: O(2^n * n^2) 184ms
// Space Complexity: O(1) 39.1MB
var maximumGood = function(statements) {
  let n = statements.length, ans = 0;
  getCombinations(0, 0);
  return ans;

  function getCombinations(i, mask) {
    if (i === n) {
      mask >>= 1; // was shifted one extra, shift back
      if (valid(mask)) ans = Math.max(ans, getOnes(mask)); // if combination is valid, keep track of the max ones.
      return;
    }
    getCombinations(i + 1, mask << 1);
    getCombinations(i + 1, (mask | 1) << 1);
  }

  function valid(mask) {
    for (var i = 0; i < n; i++) {
      let person = (mask >> i) & 1;
      if (person === 0) continue;
      for (var j = 0; j < n; j++) {
        if (statements[i][j] === 2) continue;
        let jPerson = (mask >> j) & 1;
        if (jPerson !== statements[i][j]) return false;
      }
    }
    return true;
  }
};

function getOnes(num) { // returns the number of ones in num
  let ans = 0;
  while (num > 0) {
    ans += num & 1;
    num >>= 1;
  }
  return ans;
}

// Three test cases to run function on
console.log(maximumGood([[2,0,2,2,0],[2,2,2,1,2],[2,2,2,1,2],[1,2,0,2,2],[1,0,2,1,2]])) // 2
console.log(maximumGood([[2,1,2],[1,2,2],[2,0,2]])) // 2
console.log(maximumGood([[2,0],[0,2]])) // 1