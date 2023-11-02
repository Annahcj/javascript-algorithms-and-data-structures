// 2899. Last Visited Integers
// Given a 0-indexed array of strings words where words[i] is either a positive integer represented as a string or the string "prev".
// Start iterating from the beginning of the array; for every "prev" string seen in words, find the last visited integer in words which is defined as follows:
  // Let k be the number of consecutive "prev" strings seen so far (containing the current string). Let nums be the 0-indexed array of integers seen so far and nums_reverse be the reverse of nums, then the integer at (k - 1)th index of nums_reverse will be the last visited integer for this "prev".
  // If k is greater than the total visited integers, then the last visited integer will be -1.
// Return an integer array containing the last visited integers.


// Solution: Array of Integers

// Process words, keeping track of the integers in an array and a count of consecutive "prev" strings.
// For a "prev" count `k`, the last visited integer is integers[integers.length - k].

// n = length of words
// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 44.9MB
var lastVisitedIntegers = function(words) {
  let integers = [], prevCount = 0, res = [];
  for (let word of words) {
    if (word === 'prev') {
      prevCount++;
      res.push(prevCount > integers.length ? -1 : integers[integers.length - prevCount]);
    } else {
      prevCount = 0;
      integers.push(Number(word));
    }
  }
  return res;
};

// Two test cases
console.log(lastVisitedIntegers(["1","2","prev","prev","prev"])) // [2,1,-1]
console.log(lastVisitedIntegers(["1","prev","2","prev","prev"])) // [1,2,1]