// 3258. Count Substrings That Satisfy K-Constraint I
// You are given a binary string s and an integer k.
// A binary string satisfies the k-constraint if either of the following conditions holds:
  // The number of 0's in the string is at most k.
  // The number of 1's in the string is at most k.
// Return an integer denoting the number of substrings of s that satisfy the k-constraint.


// Solution 1: Enumeration

// Iterate through each starting index i,
// and iterate through each ending index j while keeping track of the count of zeros and ones.
// Count every substring starting from index i until both the number of zeros and ones exceed k.

// Time Complexity: O(n^2) 57ms
// Space Complexity: O(1) 50.8MB
var countKConstraintSubstrings = function(s, k) {
  let n = s.length, substrings = 0;
  for (let i = 0; i < n; i++) {
    let zeros = 0, ones = 0;
    for (let j = i; j < n; j++) {
      zeros += s[j] === '0' ? 1 : 0;
      ones += s[j] === '1' ? 1 : 0;
      if (zeros > k && ones > k) break;
      substrings++;
    }
  }
  return substrings;
};


// Solution 2: Sliding Window

// Anchor at the right pointer j and increment from 0 to n - 1.
// Move up the left pointer i while both the number of zeros and ones exceeds k.
// Count the number of substrings ending at each index j.

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 51.5MB
var countKConstraintSubstrings = function(s, k) {
  let n = s.length, substrings = 0;
  let zeros = 0, ones = 0;
  for (let j = 0, i = 0; j < n; j++) {
    zeros += s[j] === '0' ? 1 : 0;
    ones += s[j] === '1' ? 1 : 0;
    while (zeros > k && ones > k) {
      zeros -= s[i] === '0' ? 1 : 0;
      ones -= s[i] === '1' ? 1 : 0; 
      i++;
    }
    substrings += j - i + 1;
  }
  return substrings;
};

// Three test cases
console.log(countKConstraintSubstrings("10101", 1)) // 12
console.log(countKConstraintSubstrings("1010101", 2)) // 25
console.log(countKConstraintSubstrings("11111", 1)) // 15