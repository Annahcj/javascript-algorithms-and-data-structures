// 3137. Minimum Number of Operations to Make Word K-Periodic
// You are given a string word of size n, and an integer k such that k divides n.
// In one operation, you can pick any two indices i and j, that are divisible by k, then replace the substring of length k starting at i with the substring of length k starting at j. That is, replace the substring word[i..i + k - 1] with the substring word[j..j + k - 1].
// Return the minimum number of operations required to make word k-periodic.
// We say that word is k-periodic if there is some string s of length k such that word can be obtained by concatenating s an arbitrary number of times. For example, if word == “ababab”, then word is 2-periodic for s = "ab".


// Solution: Counting

// Go through each substring at every kth index and count the occurances of each substring.
// It is optimal to turn all substrings into the substring that occurs the most.

// n = length of word
// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 64.4MB
var minimumOperationsToMakeKPeriodic = function(word, k) {
  let count = {}, maxCount = 0, n = word.length;
  for (let i = 0; i < n; i += k) {
    let substr = word.slice(i, i + k);
    count[substr] = (count[substr] || 0) + 1;
    maxCount = Math.max(maxCount, count[substr]);
  }
  let totalSubstrs = n / k;
  return totalSubstrs - maxCount;
};

// Two test cases
console.log(minimumOperationsToMakeKPeriodic("leetcodeleet", 4)) // 1
console.log(minimumOperationsToMakeKPeriodic("leetcoleet", 2)) // 3