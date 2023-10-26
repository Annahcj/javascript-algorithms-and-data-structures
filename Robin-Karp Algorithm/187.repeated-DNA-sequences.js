// 187. Repeated DNA Sequences
// The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.
  // For example, "ACGAATTCCG" is a DNA sequence.
// When studying DNA, it is useful to identify repeated sequences within the DNA.
// Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.


// Solution: Robin-Karp Algorithm w/ Rolling Hash

// Use Horner's Method for the Rolling Hash.
// Pick a power of 10, and give each of the four nucleotides a key: A = 1, C = 2, G = 3, T = 4.

// Use a map to keep track of how many times a hash has occured: If a hash has occured exactly once before, slice the string and push into the result.

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 49.7MB
var findRepeatedDnaSequences = function(s) {
  let hashes = new Map(), res = [], n = s.length;
  let key = {
    'A': 1,
    'C': 2,
    'G': 3,
    'T': 4
  };
  let powerK = 10 ** 10, hash = 0;
  for (var i = 0; i < n; i++) {
    hash = (hash * 10 + key[s[i]]);
    if (i >= 10) { // shift the i-10th character off the hash only if we have more than 10 characters
      hash = (hash - key[s[i - 10]] * powerK);
    }
    if (i >= 9) { // we have at least 10 characters
      if (hashes.get(hash) === 1) res.push(s.slice(i - 9, i + 1));
      hashes.set(hash, (hashes.get(hash) || 0) + 1);
    }
  }
  return res;
};

// Two test cases to run function on
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT")) // ["AAAAACCCCC","CCCCCAAAAA"]
console.log(findRepeatedDnaSequences("AAAAAAAAAAAAA")) // ["AAAAAAAAAA"]