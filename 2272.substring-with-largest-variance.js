// 2272. Substring With Largest Variance
// The variance of a string is defined as the largest difference between the number of occurrences of any 2 characters present in the string. Note the two characters may or may not be the same.
// Given a string s consisting of lowercase English letters only, return the largest variance possible among all substrings of s.
// A substring is a contiguous sequence of characters within a string.


// Solution: Try Each Pair of Characters & Kadane's Algorithm

// When we only have two unique characters, we can find the largest difference in O(n) time using kadane's algorithm.
// Since s consists of lowercase letters only, there are only at most 26 * 26 different pairs.
// We can try each pair of characters.

// To recap kadane's algorithm: Keep an ongoing sum, when it becomes negative reset it to the current number -> take max(sum + curr, curr)

// One catch is that the substring must contain both of the characters, so we need to account for the case where the substring only consists of one character.
// We can do this by keeping track of whether the other character existed before, and can 'virtually' add it back when we need it.
  // e.g: "abbb", where we need the "a" in front of the 3 b's.

// Time Complexity: O(26^2 * n) 1286ms
// Space Complexity: O(n) 44.4MB
var largestVariance = function(s) {
  let chars = new Set(s.split("")), maxDiff = 0;
  for (let l of chars) {
    for (let r of chars) {
      if (l === r) continue;
      let lCount = 0, rCount = 0, hasRight = false;
      for (let char of s) {
        lCount += char === l ? 1 : 0;
        rCount += char === r ? 1 : 0;
        if (rCount > 0 && lCount > rCount) { // has both characters and positive difference
          maxDiff = Math.max(maxDiff, lCount - rCount);
        }
        if (lCount > rCount && hasRight) { // has positive difference and a previous "right" character we can add to the start
          maxDiff = Math.max(maxDiff, lCount - rCount - 1);
        }
        if (lCount < rCount) {
          lCount = 0, rCount = 0;
          hasRight = true; 
        }
      }
    }
  }
  return maxDiff;
};

// Two test cases to run function on
console.log(largestVariance("aababbb")) // 3
console.log(largestVariance("abcde")) // 0