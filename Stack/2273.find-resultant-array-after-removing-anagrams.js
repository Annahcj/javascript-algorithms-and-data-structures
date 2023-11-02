// 2273. Find Resultant Array After Removing Anagrams
// You are given a 0-indexed string array words, where words[i] consists of lowercase English letters.
// In one operation, select any index i such that 0 < i < words.length and words[i - 1] and words[i] are anagrams, and delete words[i] from words. Keep performing this operation as long as you can select an index that satisfies the conditions.
// Return words after performing all operations. It can be shown that selecting the indices for each operation in any arbitrary order will lead to the same result.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase using all the original letters exactly once. For example, "dacb" is an anagram of "abdc".


// Solution: Stack

// Since it is proven that the order of removal does not affect the end result, we can use a stack to store the current words.
// Compare the current word and the top word in the stack, if they are not anagrams, push the current word to the stack.

// n = words.length, m = max words[i].length
// Time Complexity: O(nm) 110ms
// Space Complexity: O(n) 47.8MB
var removeAnagrams = function(words) {
  let stack = [];
  for (let word of words) {
    if (!stack.length || !isMatch(stack[stack.length - 1], word)) stack.push(word);
  }  
  return stack;
};

function isMatch(a, b) {
  let countA = Array(26).fill(0), countB = Array(26).fill(0);
  for (let char of a) countA[char.charCodeAt() - 97]++;
  for (let char of b) countB[char.charCodeAt() - 97]++;
  for (let i = 0; i < 26; i++) {
    if (countA[i] !== countB[i]) return false;
  }
  return true;
}

// Two test cases
console.log(removeAnagrams(["abba","baba","bbaa","cd","cd"])) // ["abba","cd"]
console.log(removeAnagrams(["a","b","c","d","e"])) // ["a","b","c","d","e"]