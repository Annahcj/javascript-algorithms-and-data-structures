// 1653. Minimum Deletions to Make String Balanced
// You are given a string s consisting only of characters 'a' and 'b'​​​​.
// You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.
// Return the minimum number of deletions needed to make s balanced.


// Solution 1: Dynamic Programming

// Find the best split position: the index where a's meet b's.
// For each position, find:
  // 1. The number of b's on the left 
  // 2. The number of a's on the right
// These are the number of deletions we would need for each index.

// Time Complexity: O(n) 207ms
// Space Complexity: O(n) 52.5MB
var minimumDeletions = function(s) {
  let n = s.length, right = Array(n);
  // right[i] = number of a's to the right of and at i
  for (let i = n - 1; i >= 0; i--) {
    let next = i === n - 1 ? 0 : right[i + 1];
    let count = s[i] === 'a' ? 1 : 0;
    right[i] = count + next;
  }
  
  let left = 0, ans = Infinity; // left = number of b's on the left
  for (let i = 0; i < n; i++) {
    let next = i === n - 1 ? 0 : right[i + 1];
    ans = Math.min(ans, left + next);
    left += s[i] === 'b' ? 1 : 0;
  }
  return ans;
};


// Solution 2: Counting - Two Passes

// Try each index in s as the pivot index - all characters to the left must be 'a' and to the right must be 'b'.
// Keep track of the running count of b's on the left and a's on the right.

// Two passes:
  // 1. Iterate over s to count the total a's.
  // 2. Iterate over s for each pivot index and count the number of b's on the left. Update the count of a's as we iterate through s.

// Record and return the minimum b's left + a's right.

// Time Complexity: O(n) 106ms
// Space Complexity: O(1) 57.3MB
var minimumDeletions = function(s) {
  let n = s.length, aRight = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === 'a') aRight++;
  }
  let bLeft = 0, minDeletions = n;
  for (let i = 0; i < n; i++) {
    if (s[i] === 'a') aRight--;
    minDeletions = Math.min(minDeletions, bLeft + aRight);
    if (s[i] === 'b') bLeft++;
  }
  return minDeletions;
};


// Solution 3: DP/Counting - One Pass

// Count the current maximum balanced sequence length ending with 'a' and 'b'.
// For each s[i], 
  // If s[i] is 'a', we can only extend the sequence that ends with 'a'.
  // If s[i] is 'b', we have two choices:
    // 1. Append 'b' to the sequence ending with 'a'.
    // 2. Extend the current sequence ending with 'b'.

// At the end, return n - the maximum of length of the two sequences.

// Time Complexity: O(n) 77ms
// Space Complexity: O(1) 55.4MB
var minimumDeletions = function(s) {
  let n = s.length, endA = 0, endB = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === 'a') {
      endA++;
    } else {
      endB = Math.max(endA + 1, endB + 1);
    }
  }
  return n - Math.max(endA, endB);
};

// Two test cases
console.log(minimumDeletions("aababbab")) // 2
console.log(minimumDeletions("bbaaaaabb")) // 2