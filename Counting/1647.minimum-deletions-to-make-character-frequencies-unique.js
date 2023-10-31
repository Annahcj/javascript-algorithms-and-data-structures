// 1647. Minimum Deletions to Make Character Frequencies Unique
// A string s is called good if there are no two different characters in s that have the same frequency.
// Given a string s, return the minimum number of characters you need to delete to make s good.


// Solution: Count Frequency

// Use an array of length 26 filled with 0's (since there are 26 letters)

// 1. Count frequency of each letter
// 2. Count frequency of frequencies (e.g: there are 2 letters with a frequency of 3)
// 3. Loop backwards, 
  // if there are more than 1 letters with the same frequency, take those letters and add them to the one less frequency.
  // (for e.g: if there are 2 letters with a frequency of 3, take one letter (leaving one) and add it to frequency of 2)

// Time Complexity: O(n) 136ms
// Space Complexity: O(n) 50.4MB
var minDeletions = function(s) {
  let freq = Array(26).fill(0);
  for (let char of s) {
    freq[char.charCodeAt() - 97]++;
  }
  let count = Array(s.length).fill(0);
  for (let c of freq) {
    if (c > 0) count[c]++;
  }
  let ans = 0;
  for (let i = s.length - 1; i > 0; i--) {
    let diff = count[i] > 1 ? count[i] - 1 : 0;
    ans += diff;
    count[i - 1] += diff;
  }
  return ans;
};

// Three test cases
console.log(minDeletions("aab")) // 0
console.log(minDeletions("aaabbbcc")) // 2
console.log(minDeletions("ceabaacb")) // 2