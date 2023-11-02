// 2042. Check if Numbers Are Ascending in a Sentence
// A sentence is a list of tokens separated by a single space with no leading or trailing spaces. Every token is either a positive number consisting of digits 0-9 with no leading zeros, or a word consisting of lowercase English letters.
// For example, "a puppy has 2 eyes 4 legs" is a sentence with seven tokens: "2" and "4" are numbers and the other tokens such as "puppy" are words.
// Given a string s representing a sentence, you need to check if all the numbers in s are strictly increasing from left to right (i.e., other than the last number, each number is strictly smaller than the number on its right in s).
// Return true if so, or false otherwise.


// Solution 1: Brute Force

// Split the input by spaces,
// loop through and take out all the numbers only
// loop through the numbers from back to front,
  // return false if nums[j] is bigger than or equal to nums[j + 1] (not ascending order)
// otherwise, return true if all numbers are in ascending order

// Time Complexity: O(n) (split may take longer ?) 145ms
// Space Complexity: O(n) 38.3MB
var areNumbersAscending = function(s) {
  let nums = [];
  s = s.split(" ");
  for (let i = 0; i < s.length; i++) {
    if (!isNaN(s[i])) nums.push(+s[i]);
  }  
  for (let j = nums.length - 2; j >= 0; j--) {
    if (nums[j] >= nums[j + 1]) return false;
  }
  return true;
};

// Solution 2: Optimizing Space

// Instead of filtering out the numbers to an array,
// keep track of the previous number and compare to it if we are at a number.
// Return false if the previous number is bigger than or equal to the current number
// If we successfully loop through the string, return true.

// Time Complexity: O(n) 124ms
// Space Complexity: O(1) 38.9MB
var areNumbersAscending = function(s) {
  let prev = 0;
  s = s.split(" ");
  for (let i = 0; i < s.length; i++) {
    if (!isNaN(s[i])) {
      if (prev >= +s[i]) return false;
      prev = +s[i];
    }
  }
  return true;
};

// Two test cases
console.log(areNumbersAscending("1 box has 3 blue 4 red 6 green and 12 yellow marbles")) // true
console.log(areNumbersAscending("hello world 5 x 5")) // false