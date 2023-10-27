// 1100. Find K-Length Substrings With No Repeated Characters
// Given a string s and an integer k, return the number of substrings in s of length k with no repeated characters.


// Solution: Sliding Window

// Time Complexity: O(n) 78ms
// Space Complexity: O(26) = O(1) 42.2MB
var numKLenSubstrNoRepeats = function(s, k) {
  let freq = Array(26).fill(0), ans = 0, n = s.length;
  let i = 0;
  for (let j = 0; j < n; j++) {
    freq[s.charCodeAt(j) - 97]++;
    // while the window is too big or there is a repeated character, move i up.
    while (i + k <= j || freq[s.charCodeAt(j) - 97] > 1) { 
      freq[s.charCodeAt(i++) - 97]--;
    }
    if (j - i + 1 === k) ans++; // if the window size is k
  }
  return ans;
};

// Two test case 
console.log(numKLenSubstrNoRepeats("havefunonleetcode", 5)) // 6
console.log(numKLenSubstrNoRepeats("home", 5)) // 0