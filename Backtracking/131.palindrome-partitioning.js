// 131. Palindrome Partitioning
// Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.
// A palindrome string is a string that reads the same backward as forward.


// Solution: Backtracking

// Create a backtracking function with 
  // idx (the index which we are up to)
  // arr (where we keep our partitioned palindromes)

// backtrack:
  // if idx is equal to the length of s,
    // push arr into res and return.
  // loop from idx to s.length (pointer = i) (generate substrings and check whether they are palindromes)
    // if the substring from idx to i is a palindrome,
      // push the substring into arr
      // backtrack(i + 1, arr)
      // go back to prev state: pop the substring off arr

// Time Complexity: O(n * 2^n) 228ms
// Space Complexity: O(n) (not including output) 62.9MB
var partition = function(s) {
  let res = [];
  backtrack(0, []);
  return res;

  function backtrack(idx, arr) {
    if (idx === s.length) {
      res.push([...arr]);
      return;
    }
    for (var i = idx; i < s.length; i++) {
      if (isPalindrome(idx, i)) {
        arr.push(s.slice(idx, i + 1));
        backtrack(i + 1, arr);
        arr.pop();
      }
    }
  }
  function isPalindrome(start, end) {
    while (start < end) {
      if (s[start] === s[end]) start++, end--;
      else return false;
    }
    return true;
  }
};

// Two test cases to run function on
console.log(partition("aab")) // [["a","a","b"],["aa","b"]]
console.log(partition("a")) // [["a"]]