// 2967. Minimum Cost to Make Array Equalindromic
// You are given a 0-indexed integer array nums having length n.
// You are allowed to perform a special move any number of times (including zero) on nums. In one special move you perform the following steps in order:
  // Choose an index i in the range [0, n - 1], and a positive integer x.
  // Add |nums[i] - x| to the total cost.
  // Change the value of nums[i] to x.
// A palindromic number is a positive integer that remains the same when its digits are reversed. For example, 121, 2552 and 65756 are palindromic numbers whereas 24, 46, 235 are not palindromic numbers.
// An array is considered equalindromic if all the elements in the array are equal to an integer y, where y is a palindromic number less than 109.
// Return an integer denoting the minimum possible total cost to make nums equalindromic by performing any number of special moves.


// Solution: Closest Palindrome to Median

// To make an array nums all equal, choosing the median will result in the least number of moves.
// If the median is not a palindrome, then the next best option will be the next closest palindrome to the median.

// 1. Sort nums in asc order.
// 2. Find the median of nums. If the length of nums is even, use any of the two medians.
// 3. Find the next smallest palindrome: Iterate through each number starting from the median until we find a palindrome.
// 4. Find the next largest palindrome: Iterate through each number starting from the median until we find a palindrome.
// 5. Calculate the differences to turn each number into the closest palindromes and return the minimum cost out of the two palindromes.

// Q: At most how many iterations before finding a palindrome?
// A: e.g: 123456789. To make a smaller or larger palindrome, it would take at most 10k iterations to make the second half reflect the first half.
  // Smaller palindrome: 123454321
  // Larger palindrome:  123464321

// Time Complexity: O(n log(n)) 119ms
// Space Complexity: O(log(n)) 54.7MB
var minimumCost = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let median = Math.floor(n / 2);
  let leftPalindrome = getNearestSmallerPalindrome(nums[median]);
  let rightPalindrome = getNearestLargerPalindrome(nums[median]);
  return Math.min(costToTurnAll(nums, leftPalindrome), costToTurnAll(nums, rightPalindrome));
};

function getNearestSmallerPalindrome(median) {
  let palin = median;
  while (!isPalindrome(palin) && palin >= 0) {
    palin--;
  }
  return isPalindrome(palin) ? palin : 0;
}

function getNearestLargerPalindrome(median) {
  let palin = median;
  while (!isPalindrome(palin) && palin < 1000000000) {
    palin++;
  }
  return isPalindrome(palin) ? palin : 0;
}

function isPalindrome(number) {
  let str = number.toString();
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++, right--;
  }
  return true;
}

function costToTurnAll(nums, x) {
  let cost = 0;
  for (let num of nums) {
    cost += Math.abs(num - x);
  }
  return cost;
}

// Three test cases
console.log(minimumCost([1,2,3,4,5])) // 6
console.log(minimumCost([10,12,13,14,15])) // 11
console.log(minimumCost([22,33,22,33,22])) // 22