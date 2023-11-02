// 2800. Shortest String That Contains Three Strings
// Given three strings a, b, and c, your task is to find a string that has the minimum length and contains all three strings as substrings.
// If there are multiple such strings, return the lexicographically smallest one.
// Return a string denoting the answer to the problem.
// Notes
  // A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b.
  // A substring is a contiguous sequence of characters within a string.


// Solution: Find Matching Suffix/Prefix

// There are 6 different permutations of (a, b, c).
// For each (a, b, c), 
  // 1. Find each suffix a.slice(0, i) which is equal to the prefix in b.
  // 2. For each matching suffix/prefix, merge the merged a & b with c (find the longest suffix equal to the prefix in c).

// n = max(a.length, b.length, c.length)
// Time Complexity: O(n^4) 204ms
  // Note that O(n^4) is in the worst case, where (a, b) are all the same character and c doesn't match any suffix.
// Space Complexity: O(n) 50.6MB
var minimumString = function(a, b, c) {
  let ans = getMinimumString(a, b, c);
  ans = minStr(ans, getMinimumString(a, c, b));
  ans = minStr(ans, getMinimumString(b, a, c));
  ans = minStr(ans, getMinimumString(b, c, a));
  ans = minStr(ans, getMinimumString(c, a, b));
  ans = minStr(ans, getMinimumString(c, b, a));
  return ans;
};

function getMinimumString(a, b, c) {
  let ans = minMerge(a + b, c);
  for (let i = 0; i < a.length; i++) {
    if (a.length - i > b.length) {
      if (a.slice(i).includes(b)) {
        ans = minStr(ans, minMerge(a, c));
      }
    } else {
      let suffix = a.slice(i), prefix = b.slice(0, suffix.length);
      if (suffix === prefix) {
        ans = minStr(ans, minMerge(a.slice(0, i) + b, c));
      }
    }
  }
  return ans;
}

function minStr(x, y) {
  if (x.length !== y.length) {
    return x.length < y.length ? x : y;
  }
  return x < y ? x : y;
}

// returned the minimum lengthed merged string (x always comes first)
function minMerge(x, y) {
  if (x.includes(y)) return x;
  for (let i = 0; i < x.length; i++) {
    if (x.length - i > y.length) continue;
    let suffix = x.slice(i), prefix = y.slice(0, suffix.length);
    if (suffix === prefix) return x.slice(0, i) + y;
  }
  return x + y;
}

// Two test cases
console.log(minimumString("abc", "bca", "aaa")) // "aaabca"
console.log(minimumString("ab", "ba", "aba")) // "aba"