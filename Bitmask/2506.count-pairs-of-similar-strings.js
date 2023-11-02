// 2506. Count Pairs Of Similar Strings
// You are given a 0-indexed string array words.
// Two strings are similar if they consist of the same characters.
  // For example, "abca" and "cba" are similar since both consist of characters 'a', 'b', and 'c'.
  // However, "abacba" and "bcfd" are not similar since they do not consist of the same characters.
// Return the number of pairs (i, j) such that 0 <= i < j <= word.length - 1 and the two strings words[i] and words[j] are similar.


// Solution: Brute Force 

// Go through every pair (i, j).
// Use two arrays of size 26 (lowercase characters only) to keep track of the unique characters of each word.
// If the two arrays are not equal, then (i, j) is not a similar pair.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(n^2 * m) 343ms
// Space Complexity: O(1) 49.7MB
var similarPairs = function(words) {
  let n = words.length, ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isSimilar(words[i], words[j])) {
        ans++;
      }
    }
  }
  return ans;
};

function isSimilar(word1, word2) {
  let chars1 = Array(26).fill(0);
  let chars2 = Array(26).fill(0);
  for (let i = 0; i < word1.length; i++) {
    chars1[word1.charCodeAt(i) - 97] = 1;
  }
  for (let i = 0; i < word2.length; i++) {
    chars2[word2.charCodeAt(i) - 97] = 1;
  }
  for (let i = 0; i < 26; i++) {
    if (chars1[i] !== chars2[i]) return false;
  }
  return true;
}


// Solution: Bitmasks & Hashmap

// Since there are only 26 lowercase characters, we can keep track of each word's unique characters in a bitmask.
// Use a hashmap to count the number of occurances of each bitmask.
// From the occurances of each bitmask, we can find the number of similar pairs.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm) 105ms
// Space Complexity: O(n) 44.9MB
var similarPairs = function(words) {
  let count = new Map(), ans = 0;
  for (let word of words) {
    let mask = getMask(word);
    let occurances = count.get(mask) || 0;
    ans += occurances;
    count.set(mask, occurances + 1);
  }
  return ans;
};

function getMask(word) {
  let mask = 0;
  for (let i = 0; i < word.length; i++) {
    let charcode = word[i].charCodeAt() - 97;
    mask |= (1 << charcode);
  }
  return mask;
}

// Three test cases
console.log(similarPairs(["aba","aabb","abcd","bac","aabc"])) // 2
console.log(similarPairs(["aabb","ab","ba"])) // 3
console.log(similarPairs(["nba","cba","dba"])) // 0