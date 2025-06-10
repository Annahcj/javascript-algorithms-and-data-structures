// 3442. Maximum Difference Between Even and Odd Frequency I
// You are given a string s consisting of lowercase English letters.
// Your task is to find the maximum difference diff = freq(a1) - freq(a2) between the frequency of characters a1 and a2 in the string such that:
  // a1 has an odd frequency in the string.
  // a2 has an even frequency in the string.
// Return this maximum difference.


// Solution: Counting

// Count the occurances of each character.
// Find the maximum odd frequency and minimum even frequency.

// Time Complexity: O(n) 1ms
// Space Complexity: O(1) 55MB
function maxDifference(s) {
  const count = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }   
  let maxOdd = -Infinity, minEven = Infinity;
  for (let i = 0; i < 26; i++) {
    if (count[i] === 0) continue;
    if (count[i] % 2 === 1) {
      maxOdd = Math.max(maxOdd, count[i]);
    } else {
      minEven = Math.min(minEven, count[i]);
    }
  }
  return maxOdd - minEven;
};

// Two test cases
console.log(maxDifference("aaaaabbc")) // 3
console.log(maxDifference("abcabcab")) // 1