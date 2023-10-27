// 1208. Get Equal Substrings Within Budget
// You are given two strings s and t of the same length and an integer maxCost.
// You want to change s to t. Changing the ith character of s to ith character of t costs |s[i] - t[i]| (i.e., the absolute difference between the ASCII values of the characters).
// Return the maximum length of a substring of s that can be changed to be the same as the corresponding substring of t with a cost less than or equal to maxCost. If there is no substring from s that can be changed to its corresponding substring from t, return 0.


// Solution: Sliding Window

// Maintain a sliding window with cost <= maxCost.
// Record the longest length of the window.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 42.1MB
var equalSubstring = function(s, t, maxCost) {
  let n = s.length, cost = 0, ans = 0;
  for (let j = 0, i = 0; j < n; j++) {
    cost += Math.abs(s.charCodeAt(j) - t.charCodeAt(j));
    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
      i++;
    }
    ans = Math.max(ans, j - i + 1);
  }  
  return ans;
};

// Two test cases 
console.log(equalSubstring("abcd", "bcdf", 3)) // 3
console.log(equalSubstring("abcd", "cdef", 3)) // 1