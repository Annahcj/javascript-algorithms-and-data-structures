// 1702. Maximum Binary String After Change
// You are given a binary string binary consisting of only 0's or 1's. You can apply each of the following operations any number of times:
  // Operation 1: If the number contains the substring "00", you can replace it with "10".
    // For example, "00010" -> "10010"
  // Operation 2: If the number contains the substring "10", you can replace it with "01".
    // For example, "00010" -> "00001"
// Return the maximum binary string you can obtain after any number of operations. Binary string x is greater than binary string y if x's decimal representation is greater than y's decimal representation.


// Solution: Greedy 

// We need to group all 0's together to convert into the most 1's.
// Group all 0's together next to the leftmost 0.
// Any 1's to the right of the leftmost 0 will be placed at the end of the string.
  // This is because we can gain more value by having more 1's.
  // The new 1's would be in at least as significant positions as the previously positioned 1's.

// After grouping the 0's together, we can convert them into (zerosCount - 1) 1's, followed by one 0.

// The final string will be a concatenation of three parts:
  // Start: The substring until the index of the first zero
  // Mid: The (zeros - 1) 1's followed by one 0.
  // End: The remaining original 1's that will be pushed to the end. These are any 1's that was to the right of the index of the first 0.

// Time Complexity: O(n) 128ms
// Space Complexity: O(n) 52.3MB
var maximumBinaryString = function(binary) {
  let n = binary.length, firstZeroIndex = -1;
  let zeros = 0;
  for (let i = 0; i < n; i++) {
    if (binary[i] === '0') {
      if (firstZeroIndex === -1) {
        firstZeroIndex = i;
      }
      zeros++;
    }
  }
  
  let ones = n - firstZeroIndex - zeros;
  if (zeros === 0) return binary;

  let start = binary.slice(0, firstZeroIndex);
  let mid = '1'.repeat(zeros - 1) + '0';
  let end = '1'.repeat(ones);
  return start + mid + end;
};

// Two test cases
console.log(maximumBinaryString("000110")) // "111011"
console.log(maximumBinaryString("01")) // "01"