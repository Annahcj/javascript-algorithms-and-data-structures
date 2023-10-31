// 1813. Sentence Similarity III
// A sentence is a list of words that are separated by a single space with no leading or trailing spaces. For example, "Hello World", "HELLO", "hello world hello world" are all sentences. Words consist of only uppercase and lowercase English letters.
// Two sentences sentence1 and sentence2 are similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. For example, sentence1 = "Hello my name is Jane" and sentence2 = "Hello Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in sentence2.
// Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.


// Solution: Match Prefix and Suffix

// Split sentence1 and sentence2 into words.
// First match the prefixes of words from sentence1 and sentence2 until characters don't match.
// Then, match the remaining suffix of words left in sentence2 with the suffix in sentence1.

// n = length of sentence1, m = length of sentence2
// Time Complexity: O(n + m) 49ms
// Space Complexity: O(n + m) 42.2MB
var areSentencesSimilar = function(sentence1, sentence2) {
  if (sentence2.length > sentence1.length) return areSentencesSimilar(sentence2, sentence1);
  let words1 = sentence1.split(" "), words2 = sentence2.split(" ");
  for (let i = 0; i < words2.length; i++) {
    if (words2[i] !== words1[i]) {
      let suffixLen = words2.length - i;
      return isSuffixMatch(suffixLen);
    }
  }
  return true;
  
  function isSuffixMatch(suffixLen) {
    let words1J = words1.length - suffixLen;
    for (let j = words2.length - suffixLen; j < words2.length; j++, words1J++) {
      if (words2[j] !== words1[words1J]) return false;
    }
    return true;
  }
};

// Two test cases
console.log(areSentencesSimilar("My name is Haley", "My Haley")) // true
console.log(areSentencesSimilar("of", "A lot of words")) // false