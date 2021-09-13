// 1189. Maximum Number of Balloons
// Solution 1: Hardcoded

// Map frequency of each character in text
// Count the min of each frequency of letters b, a, l, o, n.
// there are two l's and o's, so change freq['l'] and freq['o'] to Math.floor(freq of letter/ 2)

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 40.9MB (max space is 26, since it is constant, it can be rounded down to O(1))
var maxNumberOfBalloons = function(text) {
  let freq = {};
  for (var char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  let min = Infinity;
  if (freq['l']) freq['l'] = Math.floor(freq['l'] / 2);
  if (freq['o']) freq['o'] = Math.floor(freq['o'] / 2);
  min = Math.min(min, freq['b']);
  min = Math.min(min, freq['a']);
  min = Math.min(min, freq['l']);
  min = Math.min(min, freq['o']);
  min = Math.min(min, freq['n']);
  return !min ? 0: min;
};

// Three test cases to run function on
console.log(maxNumberOfBalloons("nlaebolko")) // 1
console.log(maxNumberOfBalloons("loonbalxballpoon")) // 2
console.log(maxNumberOfBalloons("leetcode")) // 0