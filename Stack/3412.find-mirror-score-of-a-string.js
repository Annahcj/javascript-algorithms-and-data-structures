// 3412. Find Mirror Score of a String
// You are given a string s.
// We define the mirror of a letter in the English alphabet as its corresponding letter when the alphabet is reversed. For example, the mirror of 'a' is 'z', and the mirror of 'y' is 'b'.
// Initially, all characters in the string s are unmarked.
// You start with a score of 0, and you perform the following process on the string s:
  // Iterate through the string from left to right.
  // At each index i, find the closest unmarked index j such that j < i and s[j] is the mirror of s[i]. Then, mark both indices i and j, and add the value i - j to the total score.
  // If no such index j exists for the index i, move on to the next index without making any changes.
// Return the total score at the end of the process.


// Solution: Stacks of Indices for Every Character

// Store an array of unmarked indices for every character.
// indices[j] = unmarked indices with character j.

// For every s[i], 
  // Pop off the rightmost index at indices[mirror of s[i]] and mark both indices.
  // If no indices exist for the mirror of s[i], push i to the end of indices[i].

// Time Complexity: O(n) 12ms
// Space Complexity: O(n) 54.68MB
function calculateScore(s) {
  const n = s.length, indices = Array(26).fill(0).map(() => []);
  let score = 0;
  for (let i = 0; i < n; i++) {
    const mirrorCharcode = 26 - (s.charCodeAt(i) - 97) - 1;
    if (indices[mirrorCharcode].length > 0) {
      score += (i - indices[mirrorCharcode].pop());
    } else {
      indices[s.charCodeAt(i) - 97].push(i);
    }
  }
  return score;
};

// Two test cases
console.log(calculateScore("aczzx")) // 5
console.log(calculateScore("abcdef")) // 0