// 2306. Naming a Company
// You are given an array of strings ideas that represents a list of names to be used in the process of naming a company. The process of naming a company is as follows:
  // 1. Choose 2 distinct names from ideas, call them ideaA and ideaB.
  // 2. Swap the first letters of ideaA and ideaB with each other.
  // 3. If both of the new names are not found in the original ideas, then the name ideaA ideaB (the concatenation of ideaA and ideaB, separated by a space) is a valid company name.
  // 4. Otherwise, it is not a valid name.
// Return the number of distinct valid names for the company.


// Solution: Compare Pairs of Letters

// Try each pair of lowercase letters.
// Map suffixes (in a set) to letters -> { a: [suffix, suffix, ...], b: [suffix, ...], ... }

// Try each pair of letters
  // e.g: a: ["aa", "ab", "bb"], b: ["aa", "ba"]
  // Get the number of suffixes that are common to both letters.
  // Get the combination count: ((suffixes1.length - common) * (suffixes2.length - common)) * 2
    // (suffixes1.length - common) = the number of suffixes in "a" but not in "b"
    // (suffixes2.length - common) = the number of suffixes in "b" but not in "a"
    // * 2 = multiply by 2 because we count the flipped pairs too.

// Time Complexity: O(n + 26^2) 491ms
// Space Complexity: O(n) 74.5MB
var distinctNames = function(ideas) {
  let suffixes = Array(26).fill(0).map(() => new Set());
  for (let idea of ideas) {
    let firstCharCode = idea.charCodeAt(0) - 97, suffix = idea.slice(1);
    suffixes[firstCharCode].add(suffix);
  }

  let ans = 0;
  for (let i = 0; i < 26; i++) {
    for (let j = i + 1; j < 26; j++) {
      let common = getCommon(suffixes[i], suffixes[j]);
      ans += ((suffixes[i].size - common) * (suffixes[j].size - common)) * 2;
    }
  }
  return ans;

  function getCommon(set1, set2) {
    let count = 0;
    for (let suffix of set1) {
      if (set2.has(suffix)) count++;
    } 
    return count;
  }
};

// Three test cases
console.log(distinctNames(["coffee","donuts","time","toffee"])) // 6
console.log(distinctNames(["lack","back"])) // 0
console.log(distinctNames(["aaa","baa","caa","bbb","cbb","dbb"])) // 2