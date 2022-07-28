// 1456. Maximum Number of Vowels in a Substring of Given Length
// Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.
// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.


// Solution: Sliding Window

// Maintain a sliding window of size k.
// Keep track of the number of vowels within the window. 

// Time Complexity: O(n) 175ms
// Space Complexity: O(1) 45.2MB
var maxVowels = function(s, k) {
  let ans = 0, count = 0;
  for (let j = 0, i = 0; j < s.length; j++) {
    if (isVowel(s[j])) count++;
    if (j >= k) {
      if (isVowel(s[i++])) count--;
    }
    if (j >= k - 1) {
      ans = Math.max(ans, count);
    }
  }
  return ans;
  
  function isVowel(char) {
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    return vowels.has(char);
  }
};

// Three test cases to run function on
console.log(maxVowels("abciiidef", 3)) // 3
console.log(maxVowels("aeiou", 2)) // 2
console.log(maxVowels("leetcode", 3)) // 2