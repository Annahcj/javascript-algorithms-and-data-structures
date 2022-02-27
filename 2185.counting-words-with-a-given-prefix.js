// 2185. Counting Words With a Given Prefix
// You are given an array of strings words and a string pref.
// Return the number of strings in words that contain pref as a prefix.
// A prefix of a string s is any leading contiguous substring of s.


// Solution: Brute Force

// n = words.length, k = pref.length
// Time Complexity: O(nk) 92ms
// Space Complexity: O(1) 43.4MB
var prefixCount = function(words, pref) {
  let ans = 0;
  for (let word of words) {
    ans += isPref(word, pref) ? 1 : 0;
  }
  return ans;
};

function isPref(word, pref) {
  if (word.length < pref.length) return false;
  for (let i = 0; i < pref.length; i++) {
    if (word[i] !== pref[i]) return false;
  }
  return true;
}

// Two test cases to run function on
console.log(prefixCount(["pay","attention","practice","attend"], "at")) // 2
console.log(prefixCount(["leetcode","win","loops","success"], "code")) // 0