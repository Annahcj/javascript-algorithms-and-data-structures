// 2712. Minimum Cost to Make All Characters Equal
// You are given a 0-indexed binary string s of length n on which you can apply two types of operations:
  // Choose an index i and invert all characters from index 0 to index i (both inclusive), with a cost of i + 1
  // Choose an index i and invert all characters from index i to index n - 1 (both inclusive), with a cost of n - i
// Return the minimum cost to make all characters of the string equal.
// Invert a character means if its value is '0' it becomes '1' and vice-versa.


// Solution: Greedy w/ Two Pointers 

// Set two pointers at the start and end of s.
// Incrementally move them closer to each other, such that they are the same distance away from the ends.
// Note: Think of the two sides separately until they meet. Our goal is to make the characters on each side the same.
// If a s[i] is not equal to the previous one, the cost is:
  // i if on the left side
  // n-i-1 if on the right side

// Explanation: This is the minimum number of moves since the pointers are an equal distance away from the ends.

// At the end, we have the following situations:
  // i === j: At this point, we know all characters up to i-1 are equal, and all characters up to j+1 are equal. 
    // The cost is i (if s[i - 1] !== s[i]) + n-j-1 (if s[j + 1] !== s[j]).
  // i > j: There can only be two cases. 1: all equal, or 2: the two halves are not equal. 
    // The cost is i if they are not equal, since both sides have the same distance.

// Time Complexity: O(n) 107ms
// Space Complexity: O(1) 47MB
var minimumCost = function(s) {
  let n = s.length, i = 1, j = n - 2, cost = 0;
  while (i < j) {
    if (s[i] !== s[i - 1]) cost += i;
    if (s[j] !== s[j + 1]) cost += (n - j - 1);
    i++, j--;
  }
  if (i === j) {
    return cost + (i > 0 && s[i - 1] !== s[i] ? i : 0) + (j < n - 1 && s[j + 1] !== s[j] ? n - j - 1 : 0);
  } 
  return s[i - 1] !== s[j + 1] ? i + cost : cost;
};

// Two test cases
console.log(minimumCost("0011")) // 2
console.log(minimumCost("010101")) // 9