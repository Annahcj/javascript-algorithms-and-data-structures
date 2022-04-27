// 1864. Minimum Number of Swaps to Make the Binary String Alternating
// Given a binary string s, return the minimum number of character swaps to make it alternating, or -1 if it is impossible.
// The string is called alternating if no two adjacent characters are equal. For example, the strings "010" and "1010" are alternating, while the string "0100" is not.
// Any two characters may be swapped, even if they are not adjacent.


// Solution: Greedy Logic

// The impossible case: If the difference between the number of 1's and 0's is greater than 1, it is impossible to become alternating.
// Case where 1's > 0's: The sequence must start with 1.
// Case where 0's > 1's: The sequence must start with 0.
// Case 1's === 0's: Get the minimum swaps out of the two possibilities: Starting with 1 and starting with 0.

// To get the number of swaps needed to get to each sequence, count the number of misplaced characters.
// The number of swaps we need = the number of misplaced characters / 2

// Time Complexity: O(n) 101ms
// Space Complexity: O(1) 44.6MB
var minSwaps = function(s) {
  let ones = 0, zeros = 0;
  for (let char of s) {
    if (char === '1') ones++;
    else zeros++;
  }
  
  if (Math.abs(ones - zeros) > 1) return -1; // if the count diff > 1, it is impossible to be alternating.
  if (ones > zeros) return getCount('1'); // start with 1
  else if (zeros > ones) return getCount('0'); // start with 0
  return Math.min(getCount('1'), getCount('0')); // get best of starting with 0 or 1
  
  function getCount(currChar) { // gets the count of misplaced characters
    let badCount = 0;
    for (let char of s) {
      if (char !== currChar) badCount++;
      currChar = currChar === '1' ? '0' : '1'; // flip the character
    }
    return badCount / 2;
  }
};

// Three test cases to run function on
console.log(minSwaps("111000")) // 1
console.log(minSwaps("1110")) // -1
console.log(minSwaps("010")) // 0