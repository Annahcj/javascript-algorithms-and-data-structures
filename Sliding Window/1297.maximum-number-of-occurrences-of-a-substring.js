// 1297. Maximum Number of Occurrences of a Substring
// Given a string s, return the maximum number of ocurrences of any substring under the following rules:
  // The number of unique characters in the substring must be less than or equal to maxLetters.
  // The substring size must be between minSize and maxSize inclusive.


// Solution: Sliding Window

// We can ignore the maxSize because any substring of size n will repeat at least as many times as a substring of size n + 1.
// Use a sliding window approach to check each substring of size minSize.
  // Keep the count of occurances of each letter 'freq' and the number of unique characters 'k'
  // Keep the occurances of each substring and get the maximum count of a substring.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 50.1MB
var maxFreq = function(s, maxLetters, minSize, maxSize) {
  let freq = Array(26).fill(0), map = new Map();
  let k = 0, ans = 0;
  for (let j = 0, i = 0; j < s.length; j++) {
    let str = s.slice(i, j + 1);
    if (freq[s.charCodeAt(j) - 97] === 0) k++; 
    freq[s.charCodeAt(j) - 97]++;

    if (j >= minSize) { // window size exceeds minSize, move left pointer up.
      let key = s.charCodeAt(i++) - 97;
      freq[key]--;
      if (freq[key] === 0) k--;
      str = s.slice(i, j + 1); // since we move up the left pointer, update the string
    }

    if (j >= minSize - 1 && k <= maxLetters) {
      map.set(str, (map.get(str) || 0) + 1); 
      ans = Math.max(ans, map.get(str));
    } 
  }
  return ans;
};

// Two test cases
console.log(maxFreq("aababcaab", 2, 3, 4)) // 2
console.log(maxFreq("aaaa", 1, 3, 3)) // 2