// 2063. Vowels of All Substrings
// Given a string word, return the sum of the number of vowels ('a', 'e', 'i', 'o', and 'u') in every substring of word.
// A substring is a contiguous (non-empty) sequence of characters within a string.
// Note: Due to the large constraints, the answer may not fit in a signed 32-bit integer. Please be careful during the calculations.


// Solution 1: Dynamic Programming

// We calculate the number of times element i gets included in all the substrings.

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 42.5MB
var countVowels = function(word) {
  let ans = 0;
  let prev = 0, n = word.length;
  for (let i = 0; i < n; i++) {
    // n - i: number of substrings that start with i
    // prev: number of substrings formed by previous characters
    // -i: minus the number of substrings formed by only the previous characters
    let curr = (n - i) + prev - i;
    prev = curr;
    if (isVowel(word[i])) ans += curr;
  }
  return ans;
};

function isVowel(char) {
  if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') return true;
}


// Solution 2: Simpler Formula

// An even simpler formula is: (n - i) * (i + 1)
// Meaning: 
// (n - i): number of substrings that start with word[i]
// (i + 1): number of characters on the left of i (including i) that would each have a set of these (n - i) substrings

// For e.g: "abcd"
// For character c:
// (n - i): 2 substrings that start with c -> c, cd
// (i + 1): 2 * 3 -> [c, cd], [bc, bcd], [abc, abcd]
// In total, there are 6 substrings that include the character c.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 43.1MB
var countVowels = function(word) {
  let ans = 0, n = word.length;
  for (let i = 0; i < n; i++) {
    if (isVowel(word[i])) ans += (n - i) * (i + 1);
  }
  return ans;
};

function isVowel(char) {
  if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') return true;
}

// A test case
console.log(countVowels("noosabasboosa")) // 237