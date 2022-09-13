// 467. Unique Substrings in Wraparound String
// We define the string s to be the infinite wraparound string of "abcdefghijklmnopqrstuvwxyz", so s will look like this:
  // "...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".
// Given a string p, return the number of unique non-empty substrings of p are present in s.


// Solution: Greedy 

// Find number of substrings in p with adjacent charcodes differing by +1.
// To deal with the special case 'za', currCharcode += 26 if currCharcode > prevCharcode.

// For each index i, count the number of substrings ending at index i. Keep track of the length of the current incremental substring.
// Don't count the substrings we have seen already. This will be recorded in maxLen.
  // maxLen[charcode] = maximum length of substring ending with charcode
// When calculating substrings ending at each index i, subtract the maximum length of the substring ending with currCharcode from the calculation.

// Time Complexity: O(n) 154ms
// Space Complexity: O(1) 42.3MB
var findSubstringInWraproundString = function(p) {
  let n = p.length, ans = 1, length = 1;
  let maxLen = Array(26).fill(0); // maxLen[charcode] = maximum length of substring ending with charcode
  maxLen[p.charCodeAt(0) - 97] = 1;
  for (let i = 1; i < n; i++) {
    let prevCharcode = p.charCodeAt(i - 1) - 97;
    let currCharcode = p.charCodeAt(i) - 97;
    if (prevCharcode > currCharcode) currCharcode += 26;
    if (currCharcode - prevCharcode === 1) {
      length++;
    } else {
      length = 1;
    }

    let currMaxLen = maxLen[currCharcode % 26];
    ans += Math.max(0, length - currMaxLen);
    maxLen[currCharcode % 26] = Math.max(maxLen[currCharcode % 26], length);
  }
  return ans;
};

// Three test cases to run function on
console.log(findSubstringInWraproundString("a")) // 1
console.log(findSubstringInWraproundString("cac")) // 2
console.log(findSubstringInWraproundString("zab")) // 6