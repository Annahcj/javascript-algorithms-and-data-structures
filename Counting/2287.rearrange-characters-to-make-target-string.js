// 2287. Rearrange Characters to Make Target String
// You are given two 0-indexed strings s and target. You can take some letters from s and rearrange them to form new strings.
// Return the maximum number of copies of target that can be formed by taking letters from s and rearranging them.


// Solution: Count Character Frequencies

// Count the frequency of each character in s and target using arrays of size 26.
// Get the minimum Math.floor(count[i] / targCount[i]).

// n = s.length, m = target.length
// Time Complexity: O(n + m) 67ms
// Space Complexity: O(26) = O(1) 43.3MB
var rearrangeCharacters = function(s, target) {
  let count = Array(26).fill(0), targCount = Array(26).fill(0);
  for (let char of s) {
    count[char.charCodeAt() - 97]++;
  }
  for (let char of target) {
    targCount[char.charCodeAt() - 97]++;
  } 

  let ans = Infinity;
  for (let i = 0; i < 26; i++) {
    if (targCount[i] > 0) {
      let times = Math.floor(count[i] / targCount[i]);
      ans = Math.min(ans, times);
    }
  }
  return ans;
};

// Three test cases
console.log(rearrangeCharacters("ilovecodingonleetcode", "code")) // 2
console.log(rearrangeCharacters("abcba", "abc")) // 1
console.log(rearrangeCharacters("abbaccaddaeea", "aaaaa")) // 1