// 3458. Select K Disjoint Special Substrings
// Given a string s of length n and an integer k, determine whether it is possible to select k disjoint special substrings.
// A special substring is a substring where:
  // Any character present inside the substring should not appear outside it in the string.
  // The substring is not the entire string s.
// Note that all k substrings must be disjoint, meaning they cannot overlap.
// Return true if it is possible to select k such disjoint special substrings; otherwise, return false.


// Solution: Greedy

// Start from every character, and expand outwards to get the whole substring.
// Map substring end indices to start indices.

// Greedily find the maximum number of non-overlapping substrings.
// Sort the start and end indices (let's call them intervals) by end index.
// If the current start index > previous end index, extend the sequence.
  // This is optimal since we sort by end index.
  // Having the minimum possible end index increases the chances of a longer sequence.

// Time Complexity: O(26n + n log(n)) 13ms
// Space Complexity: O(n) 62.3MB
function maxSubstringLength(s, k) {
  const n = s.length;
  const firstIndex = Array(26).fill(-1), lastIndex = Array(26).fill(-1);
  for (let i = 0; i < n; i++) {
    if (firstIndex[s.charCodeAt(i) - 97] === -1) {
      firstIndex[s.charCodeAt(i) - 97] = i;
    }
    lastIndex[s.charCodeAt(i) - 97] = i;
  } 
  const intervals = [];
  for (let i = 0; i < 26; i++) {
    if (firstIndex[s.charCodeAt(i) - 97] === -1) continue;
    // expand the substring
    let start = firstIndex[i];
    let end = lastIndex[i];
    for (let j = start + 1; j <= end; j++) {
      // if a smaller starting index is found, skip this character as we'll find a larger substring that includes it
      if (firstIndex[s.charCodeAt(j) - 97] < start) {
        start = -1;
        break;
      }
      end = Math.max(end, lastIndex[s.charCodeAt(j) - 97]);
    }
    if (start > -1 && (start > 0 || end < n - 1)) intervals.push([start, end]);
  }
  intervals.sort((a, b) => a[1] - b[1]);
  let prevEnd = -1, substrings = 0;
  for (let [start, end] of intervals) {
    if (start > prevEnd) {
      prevEnd = end;
      substrings++;
    }
  }
  return substrings >= k;
};

// Three test cases
console.log(maxSubstringLength("abcdbaefab", 2)) // true
console.log(maxSubstringLength("cdefdc", 3)) // false
console.log(maxSubstringLength("abeabe", 0)) // true