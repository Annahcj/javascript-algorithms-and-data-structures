// 1839. Longest Substring Of All Vowels in Order
// A string is considered beautiful if it satisfies the following conditions:
  // Each of the 5 English vowels ('a', 'e', 'i', 'o', 'u') must appear at least once in it.
  // The letters must be sorted in alphabetical order (i.e. all 'a's before 'e's, all 'e's before 'i's, etc.).
// For example, strings "aeiou" and "aaaaaaeiiiioou" are considered beautiful, but "uaeio", "aeoiu", and "aaaeeeooo" are not beautiful.
// Given a string word consisting of English vowels, return the length of the longest beautiful substring of word. If no such substring exists, return 0.
// A substring is a contiguous sequence of characters in a string.


// Solution: Count Distinct Characters

// Starting from each 'a', find the longest substring where all vowels are in alphabetical order and there are 5 distinct characters.

// Time Complexity: O(n) 157ms
// Space Complexity: O(1) 50.7MB
var longestBeautifulSubstring = function(word) {
  let ans = 0, n = word.length;
  for (let i = 0; i < n; i++) {
    if (word[i] === 'a') {
      let count = 1, j = i + 1;
      while (j < n && word[j] >= word[j - 1]) { // only move forward if next character is >= curr character
        if (word[j] > word[j - 1]) count++;
        j++;
      }
      if (count === 5) ans = Math.max(ans, j - i);
      i = j - 1;
    }
  }
  return ans;
};

// Three test cases
console.log(longestBeautifulSubstring("aeiaaioaaaaeiiiiouuuooaauuaeiu")) // 13
console.log(longestBeautifulSubstring("aeeeiiiioooauuuaeiou")) // 5
console.log(longestBeautifulSubstring("a")) // 0