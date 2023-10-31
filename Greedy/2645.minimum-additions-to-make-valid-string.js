// 2645. Minimum Additions to Make Valid String
// Given a string word to which you can insert letters "a", "b" or "c" anywhere and any number of times, return the minimum number of letters that must be inserted so that word becomes valid.
// A string is called valid if it can be formed by concatenating the string "abc" several times.


// Solution: Greedy 

// Count the number of repetitions of "abc".
// If word[i] <= word[i - 1], then we know we need a new "abc".

// Time Complexity: O(n) 81ms
// Space Complexity: O(1) 45MB
var addMinimum = function(word) {
  let repeats = 1, n = word.length;
  for (let i = 1; i < n; i++) {
    if (word[i] <= word[i - 1]) repeats++;
  }
  return repeats * 3 - n;
};

// Three test cases
console.log(addMinimum("b")) // 2
console.log(addMinimum("aaa")) // 6
console.log(addMinimum("abc")) // 0