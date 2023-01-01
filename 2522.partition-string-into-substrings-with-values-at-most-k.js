// 2522. Partition String Into Substrings With Values at Most K
// You are given a string s consisting of digits from 1 to 9 and an integer k.
// A partition of a string s is called good if:
  // Each digit of s is part of exactly one substring.
  // The value of each substring is less than or equal to k.
// Return the minimum number of substrings in a good partition of s. If no good partition of s exists, return -1.
// Note that:
  // The value of a string is its result when interpreted as an integer. For example, the value of "123" is 123 and the value of "1" is 1.
  // A substring is a contiguous sequence of characters within a string.


// Solution: Greedy

// It is optimal to partition s greedily by taking as many digits in each substring as possible.
// We keep taking digits until it exceeds k.

// One special case to watch out for is when k < 10 and a digit is greater than k.

// Time Complexity: O(n) 64ms
// Space Complexity: O(1) 44.4MB
var minimumPartition = function(s, k) {
  let count = 0, n = s.length, num = 0;
  for (let i = 0; i < n; i++) {
    let digit = Number(s[i]);
    let nextNum = num * 10 + digit;
    if (digit > k && k < 10) return -1; 
    if (nextNum > k) {
      num = digit;
      count++;
    } else {
      num = nextNum;
    }
  }
  if (num > 0) count++;
  return count;
};

// Two test cases
console.log(minimumPartition("165462", 60)) // 4
console.log(minimumPartition("238182", 5)) // -1