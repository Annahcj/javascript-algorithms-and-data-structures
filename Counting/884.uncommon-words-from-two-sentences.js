// 884. Uncommon Words from Two Sentences
// A sentence is a string of single-space separated words where each word consists only of lowercase letters.
// A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.
// Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.


// Solution: Counting w/ Hashmap

// Count the occurrences of each word and at the end, return all the words with exactly one occurrence across both sentences.

// n = length of s1, m = length of s2
// Time Complexity: O(n + m) 61ms
// Space Complexity: O(n + m) 48.6MB
function uncommonFromSentences(s1, s2) {
  s1 = s1.split(" ");
  s2 = s2.split(" ");
  let count = {};
  for (let word of s1) {
    count[word] = (count[word] || 0) + 1;
  }
  for (let word of s2) {
    count[word] = (count[word] || 0) + 1;
  }
  let uncommon = [];
  for (let word in count) {
    if (count[word] === 1) {
      uncommon.push(word);
    }
  }
  return uncommon;
};

// Two test cases
console.log(uncommonFromSentences("this apple is sweet", "this apple is sour")) // ["sweet","sour"]
console.log(uncommonFromSentences("apple apple", "banana")) // ["banana"]