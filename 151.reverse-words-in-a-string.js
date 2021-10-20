// 151. Reverse Words in a String
// Given an input string s, reverse the order of the words.
// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
// Return a string of the words in reverse order concatenated by a single space.
// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.


// Solution 1: Built-in Functions

// 1. trim any white spaces at the start and end
// 2. split by spaces
// 3. reverse
// 4. join

// Time Complexity: O(n) 111ms
// Space Complexity: O(n) 40.2MB
var reverseWords = function(s) {
  let regex = /\s+/g;
  return s.trim().split(regex).reverse().join(" ");
};

// Solution 2: Manually Processing Input

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 40.8MB
var reverseWords = function(s) {
  let words = [];
  let curr = '';
  for (var char of s) {
    if (char === ' ') {
      if (curr.length) words.push(curr);
      curr = '';
    } else {
      curr += char;
    }
  }
  if (curr.length) words.push(curr);

  let i = 0, j = words.length - 1;
  while (i < j) {
    let temp = words[i];
    words[i] = words[j];
    words[j] = temp;
    i++, j--;
  } 
  return words.join(" ");
};

// Three test cases to run function on
console.log(reverseWords("the sky is blue")) // "blue is sky the"
console.log(reverseWords("  hello world  ")) // "world hello"
console.log(reverseWords("a good   example")) // "example good a"