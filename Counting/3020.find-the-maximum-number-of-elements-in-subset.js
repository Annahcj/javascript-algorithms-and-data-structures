// 3020. Find the Maximum Number of Elements in Subset
// You are given an array of positive integers nums.
// You need to select a subset of nums which satisfies the following condition:
  // You can place the selected elements in a 0-indexed array such that it follows the pattern: [x, x2, x4, ..., xk/2, xk, xk/2, ..., x4, x2, x] (Note that k can be be any non-negative power of 2). For example, [2, 4, 16, 4, 2] and [3, 9, 3] follow the pattern while [2, 4, 8, 4, 2] does not.
// Return the maximum number of elements in a subset that satisfies these conditions.


// Solution: Counting

// Count the occurances of each number and store them in a hashmap.
// Take each nums[i] as the start of the sequence, and iterate through the double powers of nums[i] until the hashmap no longer contains at least 2 occurances of each power.
// When there are no longer two occurances of a power, we stop iterating.
// If the last number has 1 occurance, take that as the middle number, otherwise we take the previous number as the middle number and remove one occurance.

// Observe that the sequence will be at most a length of 9, with 5 iterations:
  // x = 2, sequence: [2,4,16,256,65536,256,16,4,2]

// Edge case: When nums[i] is 1, the sequence will contain only ones and needs to be counted separately.

// Time Complexity: O(n) 262ms
// Space Complexity: O(n) 66MB
var maximumLength = function(nums) {
  let count = new Map();  
  for (let num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  let ones = count.get(1) || 0;
  let onesSequence = Math.max(0, ones % 2 === 0 ? ones - 1 : ones);
  let maxLen = onesSequence;
  for (let num of nums) {
    if (num === 1) continue;
    let pow = 1, len = 0;
    while (count.has(num ** pow) && count.get(num ** pow) >= 2) {
      pow *= 2;
      len += 2;
    }
    let lastNum = num ** pow;
    if (count.has(lastNum)) {
      len++;
    } else {
      len--;
    }
    maxLen = Math.max(maxLen, len);
  }
  return maxLen;
};

// Two test cases
console.log(maximumLength([5,4,1,2,2])) // 3
console.log(maximumLength([1,3,2,4])) // 1