// 1750. Minimum Length of String After Deleting Similar Ends
// Given a string s consisting only of characters 'a', 'b', and 'c'. You are asked to apply the following algorithm on the string any number of times:
  // 1. Pick a non-empty prefix from the string s where all the characters in the prefix are equal.
  // 2. Pick a non-empty suffix from the string s where all the characters in this suffix are equal.
  // 3. The prefix and the suffix should not intersect at any index.
  // 4. The characters from the prefix and suffix must be the same.
  // 5. Delete both the prefix and the suffix.
// Return the minimum length of s after performing the above operation any number of times (possibly zero times).


// Solution: Greedy w/ Two Pointers
 
// It is optimal to take as many characters as possible from both sides when they are equal.
// Use two pointers.

// Time Complexity: O(n) 110ms
// Space Complexity: O(1) 46.2MB
var minimumLength = function(s) {
  let i = 0, j = s.length - 1;
  while (i < j && s[i] === s[j]) {
    let char = s[i];
    while (i <= j && s[i] === char) i++;
    while (i <= j && s[j] === char) j--;
  }
  return j - i + 1;
};

// Three test cases
console.log(minimumLength("ca")) // 2
console.log(minimumLength("cabaabac")) // 0
console.log(minimumLength("aabccabba")) // 3