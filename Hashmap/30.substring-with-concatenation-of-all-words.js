// 30. Substring with Concatenation of All Words
// You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once, in any order, and without any intervening characters.


// Solution: Two Hashmaps

// Map each word to its frequency -> wordFreq
// Get the total length of all the words together -> length
// For every substring of length 'length' (total length)
  // group this substring into groups of length 'wordLength'
  // find the frequencies of all of these words
  // if the frequencies of these words match the frequencies of the original words, push i into the result.

// wl = word length, m = number of words, n = s length
// Time Complexity: O(wl * (n - wl - 1)) 204ms
// Space Complexity: O(m) 49.1MB
var findSubstring = function(s, words) {
  let wordFreq = {};
  let length = 0, wordLength = words[0].length;
  let res = [];
  for (var word of words) {
    length += word.length;
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  }  
  for (var i = 0; i + length <= s.length; i++) {
    let subFreq = {};
    for (var j = i; j < i + length; j += wordLength) {
      let word = s.slice(j, j + wordLength);
      if (!wordFreq[word] || subFreq[word] >= wordFreq[word]) break;
      subFreq[word] = (subFreq[word] || 0) + 1;
    }
    let valid = true;
    for (var word in wordFreq) {
      if (wordFreq[word] !== subFreq[word]) {
        valid = false;
        break;
      }
    }
    if (valid) res.push(i);
  }
  return res;
};

// Three test cases to run function on
console.log(findSubstring("barfoothefoobarman", ["foo","bar"])) // [0,9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])) // []
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])) // [6,9,12]