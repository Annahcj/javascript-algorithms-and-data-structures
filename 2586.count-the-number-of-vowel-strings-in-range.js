// 2586. Count the Number of Vowel Strings in Range
// You are given a 0-indexed array of string words and two integers left and right.
// A string is called a vowel string if it starts with a vowel character and ends with a vowel character where vowel characters are 'a', 'e', 'i', 'o', and 'u'.
// Return the number of vowel strings words[i] where i belongs to the inclusive range [left, right].


// Solution:

// Count the words in the range of [left, right] starting and ending with a vowel.

// n = right - left
// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 45.4MB
var vowelStrings = function(words, left, right) {
  let ans = 0;
  for (let i = left; i <= right; i++) {
    if (isVowel(words[i][0]) && isVowel(words[i][words[i].length - 1])) {
      ans++;
    }
  }
  return ans;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

// Two test cases
console.log(vowelStrings(["are","amy","u"], 0, 2)) // 2
console.log(vowelStrings(["hey","aeo","mu","ooo","artro"], 1, 4)) // 3