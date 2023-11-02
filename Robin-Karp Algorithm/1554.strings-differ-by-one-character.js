// 1554. Strings Differ by One Character
// Given a list of strings dict where all the strings are of the same length.
// Return true if there are 2 strings that only differ by 1 character in the same index, otherwise return false.


// Solution: Robin Karp

// Perform robin karp on each of the words in dict.
// Pick a power: 26

// To add to a hash: power * hash + charcode.
// To remove a char from a hash: hash - charcode * base (power^(m - j - 1)).

// Loop through each word from right to left so that we can build the base from 1 upwards.


// For each word in dict, try removing each character from the hash.
// Store the indices in an array (for collision checking) in a hashmap.
// Collision check:
  // When we find a matching hash, go through each indice and check whether there is a match.

// Time Complexity: O(nm) 528ms
  // worst case O(nm^2) due to the collision check
// Space Complexity: O(nm) 167.4MB
var differByOne = function(dict) {
  let n = dict.length, hashes = Array(n).fill(0);
  let mod = 10 ** 9 + 7, pow = 26;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < dict[i].length; j++) {
      let charcode = dict[i].charCodeAt(j) - 97;
      hashes[i] = (pow * hashes[i] + charcode) % mod;
    }
  }
  
  let seen = new Map();
  for (let i = 0; i < n; i++) {
    let word = dict[i], m = word.length, base = 1;
    for (let j = m - 1; j >= 0; j--) {
      let charcode = word.charCodeAt(j) - 97;
      let hash = (hashes[i] - charcode * base % mod + mod) % mod;
      if (seen.has(hash)) {
        let indices = seen.get(hash);
        for (let index of indices) {
          if (index !== i && isMatch(dict[index], dict[i], j)) return true;
        }
      } else {
        seen.set(hash, []);
      }
      base = (base * pow) % mod;
      seen.get(hash).push(i);
    }
  }
  return false;
};

function isMatch(word1, word2, index) {
  return word1.slice(0, index) + word1.slice(index + 1) === word2.slice(0, index) + word2.slice(index + 1);
}

// Three test cases
console.log(differByOne(["abcd","acbd", "aacd"])) // true
console.log(differByOne(["ab","cd","yz"])) // false
console.log(differByOne(["abcd","cccc","abyd","abab"])) // true