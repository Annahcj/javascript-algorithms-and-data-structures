// 1653. Minimum Deletions to Make String Balanced
// You are given a string s consisting only of characters 'a' and 'b'​​​​.
// You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.
// Return the minimum number of deletions needed to make s balanced.


// Solution: Dynamic Programming

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

// Two test cases to run function on
console.log(minimumDeletions("aababbab")) // 2
console.log(minimumDeletions("bbaaaaabb")) // 2