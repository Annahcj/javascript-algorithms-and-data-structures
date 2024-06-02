// 3170. Lexicographically Minimum String After Removing Stars
// You are given a string s. It may contain any number of '*' characters. Your task is to remove all '*' characters.
// While there is a '*', do the following operation:
  // Delete the leftmost '*' and the smallest non-'*' character to its left. If there are several smallest characters, you can delete any of them.
// Return the lexicographically smallest resulting string after removing all '*' characters.


// Solution: Buckets of Indices

// When we have multiple occurances of the smallest character on the left side, it's optimal to remove the rightmost one to get the lexicographically smallest resulting string.
// This is because we need the smallest characters as early on in the string as possible to ensure the lexicographically smallest string.

// Use 26 buckets to store indices for each lowercase character.
// Iterate through s, 
  // If we come across a '*', find the smallest character where we have at least one index in the bucket. Pop it off the bucket and mark it as deleted.
  // If it's a normal character, add it to the end of the appropriate bucket.

// Build up and return the final string: without '*'s and deleted characters.

// Time Complexity: O(26n) 147ms
  // Note: String concatenation in JS is O(n), so technically the time complexity is O(n^2), but in practice it's a bit faster.
// Space Complexity: O(n) 62.5MB
var clearStars = function(s) {
  let n = s.length, indices = Array(26).fill(0).map(() => []);
  let deleted = Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (s[i] === '*') {
      for (let j = 0; j < 26; j++) {
        if (indices[j].length > 0) {
          deleted[indices[j].pop()] = true;
          break;
        }
      }
    } else {
      indices[s.charCodeAt(i) - 97].push(i);
    }
  }
  let ans = "";
  for (let i = 0; i < n; i++) {
    if (s[i] !== '*' && !deleted[i]) {
      ans += s[i];
    }
  }
  return ans;
};

// Two test cases
console.log(clearStars("aaba*")) // "aab"
console.log(clearStars("abc")) // "abc"