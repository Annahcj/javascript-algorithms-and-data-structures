// 3445. Maximum Difference Between Even and Odd Frequency II
// You are given a string s and an integer k. Your task is to find the maximum difference between the frequency of two characters, freq[a] - freq[b], in a substring subs of s, such that:
  // subs has a size of at least k.
  // Character a has an odd frequency in subs.
  // Character b has a non-zero even frequency in subs.
// Return the maximum difference.
// Note that subs can contain more than 2 distinct characters.


// Solution: Prefix Sum & Sliding Window

// Enumerate each pair of (i, j), where i is the character with odd frequency and j is the even one.

// Maintain a sliding window of at least size k, and contains at least 2 occurances of j.
// Keep track of:
  // Prefix sum of the current difference (count i - count j).
  // Parity of occurances of i and j.
// Store the minimum score for each key (parity of count of i, parity of count of j), for indices that we are moving out of the window.
// To find the maximum difference, find the maximum (current score - minimum score with a key of parity (flipped, same)).

// Time Complexity: O(25n) 209ms
// Space Complexity: O(1) 62MB
function maxDifference(s, k) {
  const n = s.length;
  let maxDiff = -Infinity;
  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 4; j++) {
      if (i === j) continue;
      const minScore = Array(2).fill(0).map(() => Array(2).fill(Infinity));
      minScore[0][0] = 0;
      let oddCount = 0, evenCount = 0;
      let prevOddCount = 0, prevEvenCount = 0;
      let l = 0;
      for (let r = 0; r < n; r++) {
        oddCount += s[r] == i ? 1 : 0;
        evenCount += s[r] == j ? 1 : 0;
        // we only store minimum score for previous indices if the window has at least two occurrances of j
        while (r - l >= k && evenCount - prevEvenCount >= 2) {
          prevOddCount += s[l] == i ? 1 : 0;
          prevEvenCount += s[l] == j ? 1 : 0;
          minScore[prevOddCount % 2][prevEvenCount % 2] = Math.min(prevOddCount - prevEvenCount, minScore[prevOddCount % 2][prevEvenCount % 2]);
          l++;
        }
        if (r >= k - 1 && oddCount > 0 && evenCount > 0) {
          const currScore = oddCount - evenCount;
          maxDiff = Math.max(maxDiff, currScore - minScore[1 ^ (oddCount % 2)][evenCount % 2]);
        }
      }
    }
  }
  return maxDiff;
};

// Three test cases
console.log(maxDifference("12233", 4)) // -1
console.log(maxDifference("1122211", 3)) // 1
console.log(maxDifference("110", 3)) // -1