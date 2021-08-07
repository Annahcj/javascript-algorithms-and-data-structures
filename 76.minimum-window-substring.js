// 76. Minimum Window Substring
// Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".


// Solution: Two Pointers / Sliding Window

// NOTE: One detail which is quite often missed is that duplicates of a character in t are to be taken into account,
//       meaning that if t contains two a's, the substring must contain at least two a's to be valid.

// Create a map which contains the occurances of each character in t.
// For e.g: If t is 'aab', the map would look like {'a': 2, 'b': 1}
// We keep a variable count, which we will use to check whether a particular substring contains all the characters (and right amount of occurances) of t.
// We initiate count to the number of unique characters in t, then decrement count when the substring contains the right amount of a character (of t).
// For e.g: s = 'abcaba', t = 'aa'
// map = {'a': 2}, count = 1
// start = 0, end = 0 : s[end] is 'a', decrement map['a'] by one. Since map['a'] is not equal to zero, we leave count as it is. Increment end.
// start = 0, end = 1 : s[end] is 'b', map doesn't contain 'b'. We leave count as it is. Increment end.
// start = 0, end = 2 : s[end] is 'c', map doesn't contain 'c'. We leave count as it is. Increment end.
// start = 0, end = 3 : s[end] is 'a', decrement map['a'] by one. Since map['a'] is equal to zero, decrement count. Increment end.
// count is now equal to 0, so we shorten the substring as much as we can.
// [count is 0] start = 0, end = 4 : the length of min (the indexes of the current smallest valid substring) is zero, so we store the start and end indexes in min,
// map[s[start]] is not undefined, so we increment map[s[start]] by one. Since map[s[start]] is bigger than zero, increment count. Increment start by one.
// count is now 1, so we stop shortening the substring.
// start = 1, end = 4 : s[end] = 'b', map doesn't contain 'b'. We leave count as it is. Increment end.
// start = 1, end = 5 : s[end] = 'a', decrement map['a'] by one. Since map['a'] is equal to zero, decrement count. Increment end.
// count is now equal to 0, so we shorten the substring as much as we can.
// [count is 0] start = 1, end = 6 : min[1] - min[0] is smaller than end - start, so we leave min. Increment start.
// [count is 0] start = 2, end = 6 : min[1] - min[0] is equal to end - start, so we leave min. Increment start.
// [count is 0], start = 3, end = 6: min[1] - min[0] is bigger than end - start, so we update min. 
// since map[s[start]] is not undefined, we increment map[s[start]] by one. Since map[s[start]] is bigger than 0, increment count. Increment start.
// start = 4, end = 6 : s[end] is undefined. We leave count as it is. Increment end.
// Since end is now 7 and bigger than the length of the s, the loop is finished.
// min is [3, 6]. 
// We return s.slice(min[0], min[1]) => 'aba'

// Time Complexity: O(n) 80ms
// Space Complexity: O(k) (k = unique characters in t) 40.7MB
  var minWindow = function(s, t) {
    let map = {};
    for (var char of t) map[char] = (map[char] || 0) + 1;
    let start = 0, end = 0;
    let min = [];
    let count = Object.keys(map).length;
    while (end <= s.length) {
      // this is a valid substring
      if (count === 0) {
        if (!min.length || min[1] - min[0] > end - start) min[0] = start, min[1] = end;
        let curr = s[start];
        if (map[curr] !== undefined) map[curr]++;
        if (map[curr] > 0) count++;
        start++;
      } else {
        let curr = s[end];
        if (map[curr] !== undefined) map[curr]--;
        if (map[curr] === 0) count--;
        end++;
      }
    }
    return min.length ? s.slice(min[0], min[1]) : "";
  };
  
  // Five test cases to run function on
  console.log(minWindow("abcaba", "aa")) // "aba"
  console.log(minWindow("bba", "ab")) // "ba"
  console.log(minWindow("ADOBECODEBANC", "ABC")) // "BANC"
  console.log(minWindow("a", "a")) // "a"
  console.log(minWindow("a", "aa")) // ""