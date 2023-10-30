// 2564. Substring XOR Queries
// You are given a binary string s, and a 2D integer array queries where queries[i] = [firsti, secondi].
// For the ith query, find the shortest substring of s whose decimal value, val, yields secondi when bitwise XORed with firsti. In other words, val ^ first[i] == second[i].
// The answer to the ith query is the endpoints (0-indexed) of the substring [left[i], right[i]] or [-1, -1] if no such substring exists. If there are multiple answers, choose the one with the minimum lefti.
// Return an array ans where ans[i] = [left[i], right[i]] is the answer to the ith query.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Sliding Window 

// From each [first, second] of each query, we can deduct the value that we need.
  // There can only be one value: val = first ^ second
// Map each (first ^ second) to the initial value of [-1, -1] (there can be multiply queries needing the same value)

// A number has at most 32 bits.
// Use a sliding window for each length (1 to 32),
  // Maintain the value of the current window.
  // If queriesMap contains the value of the current window, update the indices in the map.

// At the end, go through each query and get the indices from queriesMap.

// n = length of s, m = number of queries
// Time Complexity: O(32 * n + m) 659ms
// Space Complexity: O(m) 94.8MB
var substringXorQueries = function(s, queries) {
  let n = s.length, queriesMap = new Map();
  for (let i = 0; i < queries.length; i++) {
    let [first, second] = queries[i];
    queriesMap.set(first ^ second, [-1, -1]);
  }
  for (let len = 32; len >= 1; len--) {
    let val = 0;
    for (let i = 0; i < n; i++) {
      val = (val << 1) | Number(s[i]);
      if (i >= len) { 
        if ((val >> len) & 1) val = val ^ (1 << len); // remove the (i-len)th bit
      }
      if (i >= len - 1) {
        if (queriesMap.has(val)) {
          let [start, end] = queriesMap.get(val);
          let currLen = end - start + 1;
          if (currLen !== len || start === -1) {
            queriesMap.set(val, [i - len + 1, i]);
          }
        }
      }
    }
  }
  return queries.map(([first, second]) => queriesMap.get(first ^ second));
};

// Two test cases
console.log(substringXorQueries("101101", [[0,5],[1,2]])) // [[0,2],[2,3]]
console.log(substringXorQueries("1", [[4,5]])) // [[0,0]]