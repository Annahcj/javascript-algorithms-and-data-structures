// 916. Word Subsets
// You are given two string arrays words1 and words2.
// A string b is a subset of string a if every letter in b occurs in a including multiplicity.
  // For example, "wrr" is a subset of "warrior" but is not a subset of "world".
// A string a from words1 is universal if for every string b in words2, b is a subset of a.
// Return an array of all the universal strings in words1. You may return the answer in any order.


// Solution: Count Occurances of Letters

// Get the max occurance of each letter in each words2[i].
// The valid words in words1 must have each character count >= the character count for words2.

// n = length of words1, m = length of words2
// Time Complexity: O(n + m) 226ms
// Space Complexity: O(1) 64.9MB
var wordSubsets = function(words1, words2) {
  // get max occurances of each character in words2
  let count2 = Array(26).fill(0);
  for (let word of words2) {
    let count = getCount(word);
    for (let i = 0; i < 26; i++) {
      count2[i] = Math.max(count2[i], count[i]);
    }
  }
  
  let res = [];
  for (let word of words1) {
    let count1 = Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
      count1[word.charCodeAt(i) - 97]++;
    }
    let isUniversal = true;
    for (let i = 0; i < 26; i++) {
      if (count1[i] < count2[i]) {
        isUniversal = false;
        break;
      }
    }
    if (isUniversal) res.push(word);
  }
  return res;
};

function getCount(word) {
  let count = Array(26).fill(0);
  for (let i = 0; i < word.length; i++) {
    count[word.charCodeAt(i) - 97]++;
  }
  return count;
}

// Two test cases
console.log(wordSubsets(["amazon","apple","facebook","google","leetcode"], ["e","o"])) // ["facebook","google","leetcode"]
console.log(wordSubsets(["amazon","apple","facebook","google","leetcode"], ["l","e"])) // ["apple","google","leetcode"]