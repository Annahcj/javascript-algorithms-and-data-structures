// 522. Longest Uncommon Subsequence II
// Given an array of strings strs, return the length of the longest uncommon subsequence between them. If the longest uncommon subsequence does not exist, return -1.
// An uncommon subsequence between an array of strings is a string that is a subsequence of one string but not the others.
// A subsequence of a string s is a string that can be obtained after deleting any number of characters from s.
  // For example, "abc" is a subsequence of "aebdc" because you can delete the underlined characters in "aebdc" to get "abc". Other subsequences of "aebdc" include "aebdc", "aeb", and "" (empty string).


// Solution: Greedy w/ Sorting & Two Pointers

// The longer a subsequence is, the less likely it is to be a subsequence of another string.
// We only need to try and take each nums[i] as the uncommon subsequence.
// Go through each nums[i] and check whether it is a subsequence of any nums[j].
// Sort strs in desc order by length, since strs[i] will never be a subsequence of a shorter string.

// n = length of strs, m = strs[i].length
// Time Complexity: O(n^2 * m) 46ms
// Space Complexity: O(log(n)) (space for sorting) 42MB
var findLUSlength = function(strs) {
  let n = strs.length;
  strs.sort((a, b) => b.length - a.length);
  for (let i = 0; i < n; i++) {
    let notUncommon = false;
    for (let j = 0; j < n && strs[j].length >= strs[i].length; j++) {
      if (i === j) continue;
      if (isSubsequence(strs[j], strs[i])) {
        notUncommon = true;
        break;
      }
    }
    if (!notUncommon) return strs[i].length;
  }
  return -1;
};

function isSubsequence(str, subseq) {
  let j = 0;
  for (let i = 0; i < str.length && j < subseq.length; i++) {
    if (str[i] === subseq[j]) j++;
  }
  return j === subseq.length;
}

// Two test cases
console.log(findLUSlength(["aba","cdc","eae"])) // 3
console.log(findLUSlength(["aaa","aaa","aa"])) // -1