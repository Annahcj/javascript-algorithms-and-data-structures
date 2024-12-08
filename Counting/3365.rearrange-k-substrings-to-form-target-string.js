// 3365. Rearrange K Substrings to Form Target String
// You are given two strings s and t, both of which are anagrams of each other, and an integer k.
// Your task is to determine whether it is possible to split the string s into k equal-sized substrings, rearrange the substrings, and concatenate them in any order to create a new string that matches the given string t.
// Return true if this is possible, otherwise, return false.
// An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Counting w/ Hashmap

// Count the occurances of every (n/k)-segment of s and t in a hashmap.
// Compare the counts between s and t and return true if they match.

// Time Complexity: O(n) 255ms
// Space Complexity: O(n) 83.7MB
function isPossibleToRearrange(s, t, k) {
  let countS = {}, countT = {};
  let n = s.length, substrSize = n / k;
  for (let i = 0; i < n; i += substrSize) {
    const substrS = s.slice(i, i + substrSize);
    countS[substrS] = (countS[substrS] || 0) + 1;
    const substrT = t.slice(i, i + substrSize);
    countT[substrT] = (countT[substrT] || 0) + 1;
  }
  for (let count in countS) {
    if (countS[count] !== countT[count]) {
      return false;
    }
  }
  for (let count in countT) {
    if (countT[count] !== countS[count]) {
      return false;
    }
  }
  return true;
};

// Three test cases
console.log(isPossibleToRearrange("abcd", "cdab", 2)) // true
console.log(isPossibleToRearrange("aabbcc", "bbaacc", 3)) // true
console.log(isPossibleToRearrange("aabbcc", "bbaacc", 2)) // false