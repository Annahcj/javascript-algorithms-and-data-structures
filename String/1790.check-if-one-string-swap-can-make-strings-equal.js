// 1790. Check if One String Swap Can Make Strings Equal
// You are given two strings s1 and s2 of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.
// Return true if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return false.


// Solution: 

// It's only possible if:
  // 1. The strings are already equal, or 
  // 2. There are exactly 2 positions where s1[i] !== s2[i] and they are equal when swapped.

// Collect the indices where s1[i] !== s2[i] and check if they are equal when swapped.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 49.07MB
function areAlmostEqual(s1, s2) {
  const n = s1.length, diffIndices = [];
  for (let i = 0; i < n; i++) {
    if (s1[i] === s2[i]) continue;
    diffIndices.push(i);
    if (diffIndices.length > 2) {
      return false;
    }
  }
  if (diffIndices.length === 1) {
    return false;
  }
  return diffIndices.length === 0 || (s1[diffIndices[0]] === s2[diffIndices[1]] && s1[diffIndices[1]] === s2[diffIndices[0]]);
};

// Two test cases
console.log(areAlmostEqual("bank", "kanb")) // true
console.log(areAlmostEqual("attack", "defend")) // false