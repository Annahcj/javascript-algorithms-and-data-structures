// 1156. Swap For Longest Repeated Character Substring
// You are given a string text. You can swap two of the characters in the text.
// Return the length of the longest substring with repeated characters.


// Solution: Sliding Window of Each Character

// Maintain a sliding window of at most 1 different character.
// Try each character as the 'main' character of it's window.
  // In this window, all characters must be equal to this character except at most 1 character.
// Move the left pointer up when the number of characters not equal to the main character exceeds 1.

// To calculate the size of the window, we must consider a few cases:
  // 1. The window only consists of one character, we take the entire window size (j - i + 1).
  // 2. The window has one different character
    // a. There exists a character we can swap in from outside of the window: size = j - i + 1.
    // b. There does not exists a character we can swap in from outside of the window, meaning we have to swap in one from either end of the window: size = j - i

// Time Complexity: O(26n) 106ms
  // 26 = number of lowercase characters
// Space Complexity: O(1) 42.5MB
var maxRepOpt1 = function(text) {
  let ans = 0;
  for (let charcode = 0; charcode < 26; charcode++) {
    let char = String.fromCharCode(charcode + 97);
    let firstIndex = text.indexOf(char);
    let lastIndex = text.lastIndexOf(char);
    let i = 0, j = 0, diff = 0;
    while (j < text.length) {
      diff += text[j] !== char ? 1 : 0;
      while (diff > 1) diff -= text[i++] !== char ? 1 : 0;
      let len = diff > 0 ? (i > firstIndex || j < lastIndex ? j - i + 1 : j - i) : j - i + 1;
      ans = Math.max(ans, len);
      j++;
    }
  }
  return ans;
};

// Three test cases 
console.log(maxRepOpt1("ababa")) // 3
console.log(maxRepOpt1("aaabaaa")) // 6
console.log(maxRepOpt1("aaaaa")) // 5