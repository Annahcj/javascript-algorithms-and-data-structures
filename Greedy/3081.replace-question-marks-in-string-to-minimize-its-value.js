// 3081. Replace Question Marks in String to Minimize Its Value
// You are given a string s. s[i] is either a lowercase English letter or '?'.
// For a string t having length m containing only lowercase English letters, we define the function cost(i) for an index i as the number of characters equal to t[i] that appeared before it, i.e. in the range [0, i - 1].
// The value of t is the sum of cost(i) for all indices i.
// For example, for the string t = "aab":
  // cost(0) = 0
  // cost(1) = 1
  // cost(2) = 0
  // Hence, the value of "aab" is 0 + 1 + 0 = 1.
// Your task is to replace all occurrences of '?' in s with any lowercase English letter so that the value of s is minimized.
// Return a string denoting the modified string with replaced occurrences of '?'. If there are multiple strings resulting in the minimum value, return the lexicographically smallest one.


// Solution: Greedy w/ Counting & Sorting

// Keep track of the counts of characters in s, and keep updating them as we use them to replace '?'s.

// When we come across a '?', 
  // Find the first character in the counts array with has the lowest usage count. 
  // Update the usage count for that character and collect that character in an array `replaced`.

// Now that we have collected all characters to replace the '?'s, sort those characters in lexicographical order before replacing the '?'s.
// This example will illustrate why this extra sorting is needed:
  // s = "abcdefghijklmnopqrstuvwxy??"
  // expected answer = "abcdefghijklmnopqrstuvwxyaz"
  // The last two characters are replaced by 'az' instead of 'za', because either way, 'a' will have to be used twice, but the cost will stay the same no matter the order of the replaced characters.
  // To return the lexiographical answer, these characters need to be sorted before replacing the '?'s.

// Note: This solution is fast enough because the number of lowercase characters is 26.

// n = length of s
// Time Complexity: O(26n + n log(n)) 265ms
// Space Complexity: O(n) 73.8MB
var minimizeStringValue = function(s) {
  let n = s.length, count = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  let replaced = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === '?') {
      let charIndex = getCharWithMinCount(count);
      count[charIndex]++;
      replaced.push(String.fromCharCode(charIndex + 97));
    } 
  }
  replaced.sort();
  let res = Array(n);
  for (let i = 0, j = 0; i < n; i++) {
    if (s[i] === '?') {
      res[i] = replaced[j];
      j++;
    } else {
      res[i] = s[i];
    }
  }
  return res.join("");
};

function getCharWithMinCount(count) {
  let minCount = Infinity, charIndex = -1;
  for (let i = 0; i < 26; i++) {
    if (count[i] < minCount) {
      minCount = count[i];
      charIndex = i;
    }
  }
  return charIndex;
}

// Two test cases
console.log(minimizeStringValue("???")) // "abc"
console.log(minimizeStringValue("a?a?")) // "abac"