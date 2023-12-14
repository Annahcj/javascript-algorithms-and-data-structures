// 2957. Remove Adjacent Almost-Equal Characters
// You are given a 0-indexed string word.
// In one operation, you can pick any index i of word and change word[i] to any lowercase English letter.
// Return the minimum number of operations needed to remove all adjacent almost-equal characters from word.
// Two characters a and b are almost-equal if a == b or a and b are adjacent in the alphabet.

 
// Solution: Greedy

// Compare each word[i] and word[i - 1], if they are almost equal, we can always change word[i] to a different character which is NOT almost equal to word[i - 1] or word[i + 1].
// When changing word[i], we can jump to index i + 2.

// Time Complexity: O(n) 69ms
// Space Complexity: O(1) 43.4MB
var removeAlmostEqualCharacters = function(word) {
  let n = word.length, ans = 0;
  for (let i = 1; i < n; i++) {
    if (almostEqual(word[i], word[i - 1])) {
      ans++;
      i++;
    }
  }
  return ans;
};

function almostEqual(a, b) {
  return Math.abs(a.charCodeAt() - b.charCodeAt()) <= 1;
}

// Three test cases
console.log(removeAlmostEqualCharacters("aaaaa")) // 2
console.log(removeAlmostEqualCharacters("abddez")) // 2
console.log(removeAlmostEqualCharacters("zyxyxyz")) // 3