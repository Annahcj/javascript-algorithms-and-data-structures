// 854. K-Similar Strings
// Strings s1 and s2 are k-similar (for some non-negative integer k) if we can swap the positions of two letters in s1 exactly k times so that the resulting string equals s2.
// Given two anagrams s1 and s2, return the smallest k for which s1 and s2 are k-similar.


// Solution: BFS

// Use level-by-level BFS to find the minimum number of swaps to make s1 equal to s2.
// From each string state, 
  // 1. Find the first character s[i] where s[i] !== s2[i].
  // 2. Find all candidates s[j] where s[j] === s2[i]. These are the neighbors of the current string. This ensures that we only swap if it makes s[j] have the correct character.

var kSimilarity = function(s1, s2) {
  let n = s1.length, seen = new Set();
  let queue = [s1], steps = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let s = queue.pop();
      if (s === s2) return steps;
      let i = 0, arr = s.split(""); 
      while (s[i] === s2[i]) i++;
      for (let j = i + 1; j < n; j++) {
        if (arr[i] === arr[j]) continue;
        if (arr[j] === s2[i]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          let str = arr.join("");
          if (!seen.has(str)) {
            seen.add(str);
            next.push(str);
          }
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
};

// Two test cases
console.log(kSimilarity("ab", "ba")) // 1
console.log(kSimilarity("abc", "bca")) // 2