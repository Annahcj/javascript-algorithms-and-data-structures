// 318. Maximum Product of Word Lengths
// Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.


// Solution 1: Precompute Character Count Arrays

// 1. Precompute the character counts (or whether the character exists) of each word.
  // Use an array of length 26 to represent each lowercase character.
  // If the character exists, count[i] = 1, otherwise count[i] = 0.
// 2. Try each pair combination, use the character arrays to check whether they share common characters.

// n = words.length, m = average words[i].length
// Time Complexity: O(nm + n^2) 156ms
// Space Complexity: O(26n) = O(n) 49MB
var maxProduct = function(words) {
  let n = words.length, wordFreq = Array(n);
  for (let i = 0; i < n; i++) {
    let count = Array(26).fill(0);
    for (let char of words[i]) count[char.charCodeAt() - 97] = 1;
    wordFreq[i] = count;
  }
  
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (!sharesCommon(wordFreq[i], wordFreq[j])) {
        ans = Math.max(ans, words[i].length * words[j].length);
      }
    }
  }
  return ans;
  
  function sharesCommon(count1, count2) {
    for (let i = 0; i < 26; i++) {
      if (count1[i] && count2[i]) return true;
    }
    return false;
  }
};


// Solution 2: Precompute Bitmasks

// Since we only have at most 26 different characters, we can use a bitmask to represent a set of the characters.

// 1. Precompute a bitmask for the characters of each word.
// 2. Try each pair combination: If masks[i] & masks[j] is 0, they don't share any common characters.

// Time Complexity: O(nm + n^2) 114ms
// Space Complexity: O(n) 45.2MB
var maxProduct = function(words) {
  let n = words.length, masks = Array(n);
  for (let i = 0; i < n; i++) {
    let mask = 0;
    for (let char of words[i]) {
      let charcode = char.charCodeAt() - 97;
      mask |= 1 << charcode;
    }
    masks[i] = mask;
  }
  
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((masks[i] & masks[j]) === 0) {
        ans = Math.max(ans, words[i].length * words[j].length);
      }
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(maxProduct(["abcw","baz","foo","bar","xtfn","abcdef"])) // 16
console.log(maxProduct(["a","ab","abc","d","cd","bcd","abcd"])) // 4
console.log(maxProduct(["a","aa","aaa","aaaa"])) // 0