// 3085. Minimum Deletions to Make String K-Special
// You are given a string word and an integer k.
// We consider word to be k-special if |freq(word[i]) - freq(word[j])| <= k for all indices i and j in the string.
// Here, freq(x) denotes the frequency of the character x in word, and |y| denotes the absolute value of y.
// Return the minimum number of characters you need to delete to make word k-special.


// Solution: Counting & Sorting

// Count the occurances of each character.
// Sort the frequencies in asc order.

// Go through each possible k-window (freq[i] to freq[i] + k).
// All small frequencies (on the left) will be deleted, and all larger frequencies will be turned into freq[i] + k.

// Note: 
  // It is only worthwhile to have windows that start from a freq[i], and not in between frequencies, because anyway all smaller frequencies will be deleted and have an in-between frequency will only make it further for frequencies on the right.
  // e.g: [1,2,8,9], k = 2
  // There is no point having a window (5,7). May as well start from (8,10) or (2,4).

// n = length of word
// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 53.9MB
var minimumDeletions = function(word, k) {
  let freq = Array(26).fill(0);
  for (let char of word) {
    freq[char.charCodeAt() - 97]++;
  }
  freq = freq.sort((a, b) => a - b);
  let m = freq.length, ans = Infinity, sumLeft = 0;
  for (let i = 0; i < m; i++) {
    let end = freq[i] + k, sumRight = 0;
    for (let j = i + 1; j < m; j++) {
      if (freq[j] > end) {
        sumRight += freq[j] - end;
      }
    }
    ans = Math.min(ans, sumLeft + sumRight);
    sumLeft += freq[i];
  }
  return ans;
};

// Three test cases
console.log(minimumDeletions("aabcaba", 0)) // 3
console.log(minimumDeletions("dabdcbdcdcd", 2)) // 2
console.log(minimumDeletions("aaabaaa", 2)) // 1