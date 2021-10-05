// 423. Reconstruct Original Digits from English
// Given a string s containing an out-of-order English representation of digits 0-9, return the digits in ascending order.


// Solution: 

// Thoughts:
// We can make use of the unique character in each even number ->
// zero: Only digit with z
// two: Only digit with w
// four: Only digit with u
// six: Only digit with x
// eight: Only digit with g

// For the rest of the numbers, we can find a not so frequent character and subtract off past numbers which contain it.

// Time Complexity: O(n) 113ms
// Space Complexity: O(1) 42.2MB
var originalDigits = function(s) {
  let freq = Array(26).fill(0);
  // count frequency of each character in s
  for (var char of s) freq[char.charCodeAt() - 97]++;
  // array of numbers
  let nums = Array(10).fill(0);

  // even nums
  nums[0] = freq['z'.charCodeAt() - 97];
  nums[2] = freq['w'.charCodeAt() - 97];
  nums[4] = freq['u'.charCodeAt() - 97];
  nums[6] = freq['x'.charCodeAt() - 97];
  nums[8] = freq['g'.charCodeAt() - 97];

  // odd nums
  nums[3] = freq['h'.charCodeAt() - 97] - nums[8];
  nums[5] = freq['f'.charCodeAt() - 97] - nums[4];
  nums[7] = freq['v'.charCodeAt() - 97] - nums[5];

  // one & nine
  nums[9] = freq['i'.charCodeAt() - 97] - nums[5] - nums[6] - nums[8];
  nums[1] = freq['o'.charCodeAt() - 97] - nums[0] - nums[2] - nums[4];
  
  // build up final string
  let res = '';
  for (var i = 0; i < 10; i++) {
    if (nums[i]) res += i.toString().repeat(nums[i]);
  }
  return res;
};

// Two test cases to run function on
console.log(originalDigits("owoztneoer")) // "012"
console.log(originalDigits("fviefuro")) // "45"