// 696. Count Binary Substrings
// Give a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively.
// Substrings that occur multiple times are counted the number of times they occur.


// Solution 1: One Pass

// Thoughts:
// In a string '00011', the maximum number of consecutive substrings with the same number of 0's and 1's is two, -> (01, 0011)
// The answer is basically the minimum of the number of 0's and 1's.
// We will keep a current count and previous count to count consecutive sequences of 0's or 1's
// Each time we come across a different binary ('0' or '1') number, add the minimum of previous count and current count to our total count.

// Algorithm: Set count (total count) to 0, curr to 1 (we will start from 1 since we need to keep track of adjacent values), and prev to 0.
// Loop through s from 1 to the end of s (pointer = i)
  // If s[i] is equal to s[i - 1] (if still in a consecutive sequence), increment curr.
  // Else
    // Add the minimum of (curr, prev) to count.
    // Set prev to curr
    // Set curr to 1
// Since we wouldn't have added the last sequence to the total count, add the miniumum of (curr, prev) to count and return it.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 42.7MB
  var countBinarySubstrings = function(s) {
    let count = 0, curr = 1, prev = 0;
    for (var i = 1; i < s.length; i++) {
      if (s[i] === s[i - 1]) curr++;
      else {
        count += Math.min(curr, prev);
        prev = curr;
        curr = 1;
      }
    }
    return count += Math.min(curr, prev);
  };
  
  // Two test cases to run function on
  console.log(countBinarySubstrings("00110011")) // 6
  console.log(countBinarySubstrings("10101")) // 4