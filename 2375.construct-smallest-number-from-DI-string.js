// 2375. Construct Smallest Number From DI String
// You are given a 0-indexed string pattern of length n consisting of the characters 'I' meaning increasing and 'D' meaning decreasing.
// A 0-indexed string num of length n + 1 is created using the following conditions:
  // num consists of the digits '1' to '9', where each digit is used at most once.
  // If pattern[i] == 'I', then num[i] < num[i + 1].
  // If pattern[i] == 'D', then num[i] > num[i + 1].
// Return the lexicographically smallest possible string num that meets the conditions.


// Solution 1: Backtracking

// Use backtracking to try each valid number.
// Out of the numbers we generate, record the smallest one.

// Time Complexity: O(n!) 150ms
// Space Complexity: O(n) 43.9MB
var smallestNumber = function(pattern) {
  let used = Array(10).fill(0), n = pattern.length, res = Infinity;
  for (let i = 1; i < 10; i++) {
    used[i] = 1;
    backtrack(0, i);
    used[i] = 0;
  }
  return res.toString();

  function backtrack(i, num) {
    if (i === n) {
      res = Math.min(res, num);
      return;
    }
    let lastDigit = num % 10;
    for (let j = 1; j < 10; j++) {
      if (used[j]) continue;
      if ((pattern[i] === 'I' && j > lastDigit) || (pattern[i] === 'D' && j < lastDigit)) {
        used[j] = 1;
        backtrack(i + 1, num * 10 + j);
        used[j] = 0;
      } 
    }
  }  
};


// Solution 2: Reverse Parts of String

// Start off with an array of [1, 2, 3, 4, 5, ..., n+1]
// Reverse the array for every part where the pattern has consecutive 'D's.

// This always yields the correct answer because when we reverse a part of the array, 
// no matter the order, any numbers to the left is always smaller than numbers on the right.
// e.g: [1,2,3,4,5], pattern = "DDID"

// Step 1: Reverse [1,2,3] to [3,2,1]. 
  // array is now [3,2,1,4,5]
  // Note that no matter the order of the previous numbers, any numbers to the left is still smaller than numbers on the right of the reversed part.
// Step 2: Reverse [4,5] to [5,4].
  // array is now [3,2,1,5,4]

// Time Complexity: O(n) 78ms
// Space Complexity: O(n) 42.1MB
var smallestNumber = function(pattern) {
  let n = pattern.length, nums = [];
  for (let i = 0; i <= n; i++) nums.push((i + 1).toString());
  let j = 0;
  for (let i = 0; i <= n; i++) {
    if (i === n || pattern[i] === 'I') {
      reverse(j, i);
      j = i + 1;
    }
  }
  return nums.join("");
  
  function reverse(start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++, end--;
    }
  }
};

// Two test cases to run function on
console.log(smallestNumber("IIIDIDDD")) // "123549876"
console.log(smallestNumber("DDD")) // "4321"