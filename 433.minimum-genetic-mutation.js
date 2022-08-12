// 433. Minimum Genetic Mutation
// A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.
// Suppose we need to investigate a mutation from a gene string start to a gene string end where one mutation is defined as one single character changed in the gene string.
  // For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
// There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.
// Given the two gene strings start and end and the gene bank bank, return the minimum number of mutations needed to mutate from start to end. If there is no such a mutation, return -1.
// Note that the starting point is assumed to be valid, so it might not be included in the bank.


// Solution: BFS

// Use level-by-level BFS to get the minimum number of steps to transform start into end.
// Since bank.length <= 10, we can afford to loop through each word and check whether they are exactly one character different from the current word.
// There is no point in re-using words since the first time we get to it, it will be the minimum move to get there.
  // Keep track of used words to avoid re-using.

// Note: if the length of bank becomes very long, we should use a different approach instead of looping through bank each time:
  // 1. Use a set for bank
  // 2. Try to change each individual character in a word to ['A', 'C', 'G', 'T'] and check whether the set contains the new word.
// This approach should bring the time complexity down to O(nm)

// n = bank.length, m = length of a word (8) 
// Time Complexity: O(n^2 * m) 71ms
// Space Complexity: O(nm) 42.1MB 
var minMutation = function(start, end, bank) {
  let queue = [start], n = bank.length;
  let used = Array(n).fill(0), steps = 0;
  
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let str = queue.shift();
      if (str === end) return steps;
      for (let j = 0; j < n; j++) {
        if (!used[j] && isOneCharDiff(str, bank[j])) {
          used[j] = 1;
          queue.push(bank[j]);
        }
      }
    }
    steps++;
  }
  return -1;
  
  function isOneCharDiff(str1, str2) {
    let diff = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) diff++;
    }
    return diff === 1;
  }
};

// Two test cases to run function on
console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"])) // 1
console.log(minMutation("AAAAACCC", "AACCCCCC", ["AAAACCCC","AAACCCCC","AACCCCCC"])) // 3