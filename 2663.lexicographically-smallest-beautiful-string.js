// 2663. Lexicographically Smallest Beautiful String
// A string is beautiful if:
  // It consists of the first k letters of the English lowercase alphabet.
  // It does not contain any substring of length 2 or more which is a palindrome.
// You are given a beautiful string s of length n and a positive integer k.
// Return the lexicographically smallest string of length n, which is larger than s and is beautiful. If there is no such string, return an empty string.
// A string a is lexicographically larger than a string b (of the same length) if in the first position where a and b differ, a has a character strictly larger than the corresponding character in b.
  // For example, "abcd" is lexicographically larger than "abcc" because the first position they differ is at the fourth character, and d is greater than c.


// Solution: Greedy

// Going from right to left, find the first s[i] that we can increase as little as possible such that it is still beautiful.
// Then, greedily fill the rest of the characters with the smallest characters that are still beautiful.

// Note: To check whether a palindrome exists, we only need to check the last 1 and 2 characters, since the palindrome can only exist with the middle (e.g: "aa" or "aba").

// Time Complexity: O(n) 145ms
// Space Complexity: O(n) 64.6MB
var smallestBeautifulString = function(s, k) {
  let n = s.length, res = "";
  for (let i = n - 1; i >= 0; i--) {
    for (let j = s.charCodeAt(i) - 95; j <= k; j++) {
      let char = String.fromCharCode(j + 96);
      if (!isPalindrome(s, i, char)) {
        res = [...s.slice(0, i).split(""), char];
        while (res.length < n) { // greedily fill the rest of the characters
          let foundChar = false;
          for (let charcode = 1; charcode <= k; charcode++) {
            let char = String.fromCharCode(charcode + 96);
            if (!isPalindrome(res, res.length, char)) {
              res.push(char);
              foundChar = true;
              break;
            }
          }
          if (!foundChar) return "";
        }
        return res.join("");
      }
    }
  }
  return "";
};

function isPalindrome(s, index, char) {
  return (index && char === s[index - 1]) || (index > 1 && char === s[index - 2]);
}

// Two test cases
console.log(smallestBeautifulString("abcz", 26)) // "abda"
console.log(smallestBeautifulString("dc", 4)) // ""