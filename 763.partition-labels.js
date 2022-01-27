// 763. Partition Labels
// You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
// Return a list of integers representing the size of these parts.


// Solution: Two Pointers / Greedy

// 1. Get last occurance of each letter in s
// 2. Use two pointers to get each partition
  // e.g: abcabd, lastIdx = a: 3, b: 4, c = 2, d = 5
  // loop while i <= maxIdx
  // i = 0, maxIdx = 0
    // i = 0: maxIdx = last occurance of a (3). Loop up to 3, while updating maxIdx.
    // i = 1: maxIdx = last occurance of b (4). Loop up to 4.
    // i = 2: maxIdx = Math.max(4, last occurance of c (2)). Loop up to 4.
    // i = 3: maxIdx = Math.max(4, last occurance of a (3)). Loop up to 4.
    // i = 4: maxIdx = Math.max(4, last occurance of b (4)). Loop up to 4.
  // --- one partition --- increase maxIdx by 1.
  // i = 5, maxIdx = 5
  // loop while i <= maxIdx
    // i = 5: maxIdx = Math.max(5, last occurance of d (5)). Loop up to 5.
  // --- second partition ---
  // answer = 2 partitions

// Time Complexity: O(n) 71ms
// Space Complexity: O(26) = O(1) 42.9MB
var partitionLabels = function(s) {
  let lastIdx = Array(26), n = s.length;
  for (var i = 0; i < n; i++) lastIdx[s.charCodeAt(i) - 97] = i; 
  
  let maxIdx = 0, res = [];
  i = 0;
  while (i < n) {
    let start = i;
    while (i <= maxIdx) {
      let charKey = s.charCodeAt(i) - 97;
      maxIdx = Math.max(maxIdx, lastIdx[charKey]);
      i++;
    }
    res.push(maxIdx - start + 1);
    maxIdx++;
  }
  return res;
}; 

// Two test cases to run function on
console.log(partitionLabels("ababcbacadefegdehijhklij")) // [9,7,8]
console.log(partitionLabels("eccbbbbdec")) // [10]