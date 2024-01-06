// 2983. Palindrome Rearrangement Queries
// You are given a 0-indexed string s having an even length n.
// You are also given a 0-indexed 2D integer array, queries, where queries[i] = [ai, bi, ci, di].
// For each query i, you are allowed to perform the following operations:
  // Rearrange the characters within the substring s[ai:bi], where 0 <= ai <= bi < n / 2.
  // Rearrange the characters within the substring s[ci:di], where n / 2 <= ci <= di < n.
// For each query, your task is to determine whether it is possible to make s a palindrome by performing the operations.
// Each query is answered independently of the others.
// Return a 0-indexed array answer, where answer[i] == true if it is possible to make s a palindrome by performing operations specified by the ith query, and false otherwise.
  // A substring is a contiguous sequence of characters within a string.
  // s[x:y] represents the substring consisting of characters from the index x to index y in s, both inclusive.


// Solution: Prefix Sum of Counts

// First, flip the left half of s, the problem then becomes how to make two strings equal.
// e.g: 'abcd|dfba' -> 
  // 'dfba'
  // 'dcba'
// Is it possible to make the left and right halves equal.

// Precomputation:
// 1. Calculate the prefix sum of occurances for each character, for the left and right strings.
// 2. Calculate the prefix sum of the matching symmetric characters starting from the middle of s.
  // e.g: ecbaabde -> [1,2,2,3] (aa (1), bb(1), cd(0), ee(1))
  // We can then use the prefix sum to get the range sum, from which we can figure out if a substring is symmetric to the other side in the string.

// For each query, there are two scenarios:
  // 1. (a, b) and (c, d) are not overlapping.
    // For each rearrangeable segment, check whether the character counts are equal between the left and right side (we can rearrange to match the other).
    // For each non-rearrangeable segment, check whether they are symmetrically equal to the other side.
  // 2. (a, b) and (c, d) are overlapping.
    // Rearrangeable part:
      // Join the two intervals, and check whether the joined interval has the same character counts.
      // If there are non-intersecting rearrangable ranges in one side only on the left,
        // If a < c,
          // Check if left(a, b) contains all letters in right(a, c - 1).
        // Otherwise if c <= a,
          // Check if right(c, d) contains all letters in left(c, a - 1).
      // If there are non-intersecting rearrangable ranges in one side only on the right,
        // If d < b,
          // Check if left(a, b) contains all letters in right(d + 1, b).
        // Otherwise if b <= d,
          // Check if right(c, d) contains all letters in left(d + 1, b).
    // Non-rearrangeable segments:
      // Check that the left side of the intervals is symmetrically equal.
      // Check that the right side of the intervals is symmetrically equal.

// n = length of s, m = number of queries
// Time Complexity: O(26n + m) 410ms
// Space Complexity: O(26n + m) 189MB
var canMakePalindromeQueries = function(s, queries) {
  let n = s.length, mid = n / 2;
  let left = s.slice(0, mid).split("").reverse().join(""), right = s.slice(mid);
  let leftPrefixCount = Array(mid + 1), leftCount = Array(26).fill(0);
  let rightPrefixCount = Array(mid + 1), rightCount = Array(26).fill(0);
  leftPrefixCount[0] = [...leftCount];
  rightPrefixCount[0] = [...rightCount];
  for (let i = 0; i < mid; i++) {
    leftCount[left.charCodeAt(i) - 97]++;
    leftPrefixCount[i + 1] = [...leftCount];
    rightCount[right.charCodeAt(i) - 97]++;
    rightPrefixCount[i + 1] = [...rightCount];
  }
  let symmetricCount = Array(mid + 1).fill(0);
  let equalCount = 0;
  for (let i = 0; i < mid; i++) {
    if (left[i] === right[i]) equalCount++;
    else equalCount = 0;
    symmetricCount[i + 1] = equalCount;
  }
  
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [a, b, c, d] = queries[i];
    // offset indices
    let prevA = a;
    a = mid - b - 1, b = mid - prevA - 1;
    c -= mid, d -= mid;

    if (hasOverlap(a, b, c, d)) {
      let joinedStartIndex = Math.min(a, c);
      let joinedEndIndex = Math.max(b, d);
      // full joint range of (a, b) and (c, d) must have equal counts
      // non-rearrangable ranges must be equal
      if (
        !rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, joinedStartIndex, joinedEndIndex, 0) ||
        !rangeIsSymmetricallyEqual(symmetricCount, 0, joinedStartIndex - 1) ||
        !rangeIsSymmetricallyEqual(symmetricCount, joinedEndIndex + 1, mid - 1)
      ) {
        ans[i] = false;
        continue;
      }
      // Check if left(a, b) contains all letters in right(a, c - 1)
      if (a < c) {
        if (!rangeCountsAreSubset(getRangeCount(leftPrefixCount, a, b), getRangeCount(rightPrefixCount, a, c - 1))) {
          ans[i] = false;
          continue;
        }
      } else { // Check if right(c, d) contains all letters in left(c, a - 1)
        if (!rangeCountsAreSubset(getRangeCount(rightPrefixCount, c, d), getRangeCount(leftPrefixCount, c, a - 1))) {
          ans[i] = false;
          continue;
        }
      }

      // Check if right(c, d) contains all letters in left(d + 1, b)
      if (b < d) {
        if (!rangeCountsAreSubset(getRangeCount(rightPrefixCount, c, d), getRangeCount(leftPrefixCount, d + 1, b))) {
          ans[i] = false;
          continue;
        }
      } else { // Check if left(a, b) contains all letters in right(d + 1, b)
        if (!rangeCountsAreSubset(getRangeCount(leftPrefixCount, a, b), getRangeCount(rightPrefixCount, d + 1, b))) {
          ans[i] = false;
          continue;
        }
      }

      // passed all checks
      ans[i] = true;
    } else {
      // no overlap, there will be 5 segments
      if (a < c) {
        ans[i] = 
          rangeIsSymmetricallyEqual(symmetricCount, 0, a - 1) &&
          rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, a, b, 0) &&
          rangeIsSymmetricallyEqual(symmetricCount, b + 1, c - 1) &&
          rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, c, d, 0) &&
          rangeIsSymmetricallyEqual(symmetricCount, d + 1, mid - 1);
      } else {
        // otherwise, swap the order of (a, b) and (c, d) and perform the same checks
        ans[i] = 
          rangeIsSymmetricallyEqual(symmetricCount, 0, c - 1) &&
          rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, c, d, 0) &&
          rangeIsSymmetricallyEqual(symmetricCount, d + 1, a - 1) &&
          rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, a, b, 0) &&
          rangeIsSymmetricallyEqual(symmetricCount, b + 1, mid - 1);
      }
    }
  }
  return ans;
};

function hasOverlap(a, b, c, d) {
  let start = Math.max(a, c);
  let end = Math.min(b, d);
  return start <= end;
}

// Check if countB is a subset of countA, meaning each countB[i] <= countA[i]
function rangeCountsAreSubset(countA, countB) {
  for (let i = 0; i < 26; i++) {
    if (countB[i] > countA[i]) return false;
  }
  return true;
}

function getRangeCount(prefixCount, x, y) {
  let rangeCount = Array(26);
  for (let i = 0; i < 26; i++) {
    rangeCount[i] = prefixCount[y + 1][i] - prefixCount[x][i];
  }
  return rangeCount;
}
  
function rangeHasEqualCounts(leftPrefixCount, rightPrefixCount, start, end, maxDiff) {
  if (start > end) return true;
  let leftCount = getRangeCount(leftPrefixCount, start, end);
  let rightCount = getRangeCount(rightPrefixCount, start, end);
  let diff = 0;
  for (let i = 0; i < 26; i++) {
    diff += Math.abs(leftCount[i] - rightCount[i]);
  }
  return (diff / 2) <= maxDiff;
}
  
function rangeIsSymmetricallyEqual(symmetricCount, start, end) {
  if (start > end) return true;
  return symmetricCount[end + 1] - symmetricCount[start] === end - start + 1;
}

// Three test cases
console.log(canMakePalindromeQueries("abcabc", [[1,1,3,5],[0,2,5,5]])) // [true,true]
console.log(canMakePalindromeQueries("abbcdecbba", [[0,2,7,9]])) // [false]
console.log(canMakePalindromeQueries("acbcab", [[1,2,4,5]])) // [true]