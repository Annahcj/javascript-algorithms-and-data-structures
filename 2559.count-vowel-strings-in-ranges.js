// 2559. Count Vowel Strings in Ranges
// You are given a 0-indexed array of strings words and a 2D array of integers queries.
// Each query queries[i] = [l[i], r[i]] asks us to find the number of strings present in the range l[i] to r[i] (both inclusive) of words that start and end with a vowel.
// Return an array ans of size queries.length, where ans[i] is the answer to the ith query.
// Note that the vowel letters are 'a', 'e', 'i', 'o', and 'u'.


// Solution: Prefix Sum

// Calculate the prefix sum: pSum[i] = the number of words in range [0, i] that start and end with vowels
// For each query [left, right], the answer = pSum[right] - pSum[left - 1]
  // pSum[right] = words that start and end with vowels in range [0, right].
  // Then we subtract pSum[left - 1] since those counts were also included in pSum[right].

// n = number of words, m = number of queries
// Time Complexity: O(n + m) 170ms
// Space Complexity: O(n + m) 69.6MB
var vowelStrings = function(words, queries) {
  let n = words.length;
  let pSum = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (i > 0) pSum[i] = pSum[i - 1];
    if (isVowel(words[i][0]) && isVowel(words[i][words[i].length - 1])) {
      pSum[i]++;
    }
  }
  
  let res = [];
  for (let [l, r] of queries) {
    if (l === 0) res.push(pSum[r]);
    else res.push(pSum[r] - pSum[l - 1]);
  }
  return res;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

// Two test cases
console.log(vowelStrings(["aba","bcb","ece","aa","e"], [[0,2],[1,4],[1,1]])) // [2,3,0]
console.log(vowelStrings(["a","e","i"], [[0,2],[0,1],[2,2]])) // [3,2,1]