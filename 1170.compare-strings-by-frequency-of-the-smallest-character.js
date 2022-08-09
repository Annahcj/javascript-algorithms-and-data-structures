// 1170. Compare Strings by Frequency of the Smallest Character
// Let the function f(s) be the frequency of the lexicographically smallest character in a non-empty string s. For example, if s = "dcce" then f(s) = 2 because the lexicographically smallest character is 'c', which has a frequency of 2.
// You are given an array of strings words and another array of query strings queries. For each query queries[i], count the number of words in words such that f(queries[i]) < f(W) for each W in words.
// Return an integer array answer, where each answer[i] is the answer to the ith query.


// Solution: Precomputing & Sorting

// To calculate the frequency of each word, 
  // collect the count of each character (a-z) in an array of size 26.
  // find the smallest character with count > 0.

// Since words[i].length <= 10, we can keep the frequencies of each word frequency.
// Populate freqFreq so that freqFreq[i] = number of words with frequency of i.

// n = words.length, m = queries.length, k = max words[i].length
// Time Complexity: O(nk + m) = O(n + m) 166ms
// Space Complexity: O(n) 48MB
var numSmallerByFrequency = function(queries, words) {
  let m = queries.length, n = words.length;
  let freqFreq = Array(11).fill(0);
  for (let i = 0; i < m; i++) {
    queries[i] = getFreq(queries[i]);
  }
  for (let i = 0; i < n; i++) {
    freqFreq[getFreq(words[i])]++;
  }
  let ans = Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    let freq = queries[i];
    for (let j = 10; j > freq; j--) {
      ans[i] += freqFreq[j];
    }
  }
  return ans;
  
  function getFreq(word) {
    let freq = Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
      freq[word.charCodeAt(i) - 97]++;
    }
    for (let i = 0; i < 26; i++) {
      if (freq[i] > 0) return freq[i];
    }
  }
};

// Two test cases to run function on
console.log(numSmallerByFrequency(["cbd"], ["zaaaz"])) // [1]
console.log(numSmallerByFrequency(["bbb","cc"], ["a","aa","aaa","aaaa"])) // [1,2]