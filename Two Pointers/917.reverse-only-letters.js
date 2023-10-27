// 917. Reverse Only Letters
// Given a string s, reverse the string according to the following rules:
// All the characters that are not English letters remain in the same position.
// All the English letters (lowercase or uppercase) should be reversed.
// Return s after reversing it.


// Solution: Reverse Pointer

// res = new reversed string to return at the end
// set j to s.length - 1
// loop through s from left to right (pointer = i)
  // if s[i] is a letter
    // decrement j until s[j] is a letter
    // add s[j] to res
    // decrement j by one
  // otherwise, if s[i] is not a letter
    // add s[i] to res
// return res

// Time Complexity: O(n) 89ms
// Space Complexity: O(n) 39MB
var reverseOnlyLetters = function(s) {
  function isLetter(char) {
    if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) return true;
  }
  let res = '';
  let j = s.length - 1;
  for (let i = 0; i < s.length; i++) {
    if (isLetter(s[i])) {
      while (!isLetter(s[j])) j--;
      res += s[j];
      j--;
    } else {
      res += s[i];
    }
  }
  return res;
};

// Three test cases 
console.log(reverseOnlyLetters("ab-cd")) // "dc-ba"
console.log(reverseOnlyLetters("a-bC-dEf-ghIj")) // "j-Ih-gfE-dCba"
console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!")) // "Qedo1ct-eeLg=ntse-T!"