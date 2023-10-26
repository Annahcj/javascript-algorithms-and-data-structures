// 132. Palindrome Partitioning II
// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return the minimum cuts needed for a palindrome partitioning of s.


// Solution: Recursion w/ Memoization

// At each index, iteratively loop through from index and check whether each substring is a palindrome. 
// Save the minimum number of palindromes for each index in a memo. (memo[idx] = minimum number of palindromes from idx to the end of s)


// Create a function 'recurse' with 
  // idx (the index which we are up to)
  // count (number of palindromes so far)

// recurse:
  // if idx is equal to the length of s,
    // return 0.
  // set min (minimum palindromes) to 0
  // loop from idx to s.length (pointer = i) (generate substrings and check whether they are palindromes)
    // if the substring from idx to i is a palindrome,
      // set min to Math.min(min, recurse(i + 1, count) + 1)
  // set memo[idx] to min
  // return min for earlier calls

// Time Complexity: O(n^2 * n) 604ms
// Space Complexity: O(n) 40.2MB
var minCut = function(s) {
  let n = s.length;
  let memo = Array(n);
  return recurse(0, 0) - 1;

  function recurse(idx, count) {
    if (idx === n) return 0;
    if (memo[idx] !== undefined) return memo[idx];
    let min = Infinity;
    for (var i = idx; i < s.length; i++) {
      if (isPalindrome(idx, i)) {
        min = Math.min(min, recurse(i + 1, count) + 1);
      }
    }
    memo[idx] = min;
    return min;
  } 
  function isPalindrome(start, end) {
    while (start < end) {
      if (s[start] === s[end]) start++, end--;
      else return false;
    }
    return true;
  } 
};

// Three test cases to run function on
console.log(minCut("aab")) // 1
console.log(minCut("a")) // 0
console.log(minCut("ab")) // 1