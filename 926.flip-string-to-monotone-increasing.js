// 926. Flip String to Monotone Increasing
// A binary string is monotone increasing if it consists of some number of 0's (possibly none), followed by some number of 1's (also possibly none).
// You are given a binary string s. You can flip s[i] changing it from 0 to 1 or from 1 to 0.
// Return the minimum number of flips to make s monotone increasing.


// Solution: Dynamic Programming

// Logic:
// We loop through s and keep counting the minimum number of flips needed to make it increasing.
// For e.g: '10011001'
// ones = 0, minFlips = 0
// idx = 0, char = '1' -> increment ones, set minFlips to Math.min(minFlips (0), ones (1)) (still 0)
// idx = 1, char = '0' -> increment minFlips, set minFlips to Math.min(minFlips (1), ones (1)) (1) 
// (at this point, we have the chars '10'. We can either turn the zero into a one, or turn the one into a zero, so the minimum is 1)
// idx = 2, char = '0' -> increment minFlips, set minFlips to Math.min(minFlips (1), ones (1)) (1)
// (the chars are now '100'. We can either turn the one into a zero, or flip the two zeros to ones, so the minimum is 1)
// idx = 3, char = '1' -> increment ones, set minFlips to Math.min(minFlips (1), ones (2)) (1)
// (the chars are now '1001'. To make it monotone increasing, we can just flip the first one)
// idx = 4, char = '1' -> increment ones, set minFlips to Math.min(minFlips (1), ones (3)) (1)
// (the chars are now '10011'. We can just flip the first one)
// idx = 5, char = '0' -> increment minFlips, set minFlips to Math.min(minFlips (2), ones (3)) (2)
// (the chars are now '100110'. We can flip the first one and flip the last zero)
// idx = 6, char = '0' -> increment minFlips, set minFlips to Math.min(minFlips (3), ones (3)) (3)
// (the chars are now '1001100'. We can flip the first one, flip the last two zeros, or flip all three ones)
// idx = 7, char = '1' -> increment minFlips, set minFlips to Math.min(minFlips (3), ones (4)) (3)
// (the chars are now 10011001'. We can flip the first one, flip the last two zeros, and it will be monotone increasing)
// We return minFlips, which is 3.

// Algorithm:
// Keep count of ones and minFlips, set them both to 0 initially.
// Loop through each char in s
  // If char is '1', increment ones.
  // Else, increment minFlips.
  // Set minFlips to Math.min(minFlips, ones)
// Return minFlips.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 42.3MB
  var minFlipsMonoIncr = function(s) {
    let ones = 0, minFlips = 0;
    for (var char of s) {
      if (char === '1') ones++;
      else minFlips++;
      minFlips = Math.min(minFlips, ones);
    }
    return minFlips;
  };
  
  // Four test cases to run function on
  console.log(minFlipsMonoIncr("0101100011")) // 3
  console.log(minFlipsMonoIncr("00110")) // 1
  console.log(minFlipsMonoIncr("010110")) // 2
  console.log(minFlipsMonoIncr("00011000")) // 2