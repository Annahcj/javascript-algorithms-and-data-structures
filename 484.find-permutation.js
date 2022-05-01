// 484. Find Permutation
// A permutation perm of n integers of all the integers in the range [1, n] can be represented as a string s of length n - 1 where:
  // s[i] == 'I' if perm[i] < perm[i + 1], and
  // s[i] == 'D' if perm[i] > perm[i + 1].
// Given a string s, reconstruct the lexicographically smallest permutation perm and return it.


// Solution 1: Stack

// The pattern is that everytime we see a D, the subarray from D to the next I should be reversed.
// We can achieve this by using a stack, then popping them off to reverse them.

// Time Complexity: O(n) 143ms
// Space Complexity: O(n) 47.4MB
var findPermutation = function(s) {
  let stack = [], res = [];
  s += 'I'; // extra I so that we don't have to check again after the loop
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'I') {
      res.push(i + 1);
      while (stack.length) res.push(stack.pop());
    } else {
      stack.push(i + 1);
    }
  }
  return res;
};


// Solution 2: Reverse Subarrays

// Fill the array with [1,2,3,4,...,n]
// Everytime you see D's followed by an I, reverse that part of the result array.

// Time Complexity: O(n) 165ms
// Space Complexity: O(1) (not including output) 49.7MB
var findPermutation = function(s) {
  let res = [], n = s.length;
  for (let i = 0; i <= n; i++) res.push(i + 1);
  s += 'I';
  for (let i = 0; i < n; i++) {
    if (s[i] === 'I') continue;
    let start = i;
    while (s[i] === 'D') i++;
    reverse(start, i);
  }
  return res;
  
  function reverse(start, end) { // reverse subarray from start to end inclusive
    while (start < end) {
      [res[start], res[end]] = [res[end], res[start]];
      start++, end--;
    }
  }
};

// Two test cases to run function on
console.log(findPermutation("I")) // [1,2]
console.log(findPermutation("DI")) // [2,1,3]