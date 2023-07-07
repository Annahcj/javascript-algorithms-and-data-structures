// 2744. Find Maximum Number of String Pairs
// You are given a 0-indexed array words consisting of distinct strings.
// The string words[i] can be paired with the string words[j] if:
  // The string words[i] is equal to the reversed string of words[j].
  // 0 <= i < j < words.length.
// Return the maximum number of pairs that can be formed from the array words.
// Note that each string can belong in at most one pair.


// Solution: Hashmap

// Iterate through each words[i] and count the number of occurances of each string.
// For each words[i], add count[reversed word] to the total pairs.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 45.4MB
var maximumNumberOfStringPairs = function(words) {
  let count = {}, pairs = 0;
  for (let word of words) {
    let reversed = word[1] + word[0];
    pairs += count[reversed] || 0;
    count[word] = (count[word] || 0) + 1;
  }
  return pairs;
};

// Three test cases
console.log(maximumNumberOfStringPairs(["cd","ac","dc","ca","zz"])) // 2
console.log(maximumNumberOfStringPairs(["ab","ba","cc"])) // 1
console.log(maximumNumberOfStringPairs(["aa","ab"])) // 0