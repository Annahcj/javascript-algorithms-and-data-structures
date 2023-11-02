// 2423. Remove Letter To Equalize Frequency
// You are given a 0-indexed string word, consisting of lowercase English letters. You need to select one index and remove the letter at that index from word so that the frequency of every letter present in word is equal.
// Return true if it is possible to remove one letter so that the frequency of all letters in word are equal, and false otherwise.
// Note:
  // The frequency of a letter x is the number of times it occurs in the string.
  // You must remove exactly one letter and cannot chose to do nothing.


// Solution: Counting & Sorting 

// 1. Collect the frequencies of each character in a hashmap.
// 2. Sort the frequencies in desc order.
// 3. Check for the following three cases:
  // a. There is only one unique character in the word.
  // b. All characters have the same occurance except one which has one occurance.
  // c. The largest frequency is one more than the second largest frequency, and all the rest of the frequencies are equal.

// n = length of word
// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 41.9MB
var equalFrequency = function(word) {
  let count = {};
  for (let char of word) {
    count[char] = (count[char] || 0) + 1;
  }
  let counts = [];
  for (let char in count) {
    counts.push(count[char]);
  }
  counts.sort((a, b) => b - a);
  if (counts.length === 1) return true;
  if (allSameOccuranceExceptLast(counts) && counts[counts.length - 1] === 1) return true;
  if (counts[0] === counts[1] + 1 && restAllEqual(counts)) {
    return true;
  }
  return false;
};

function allSameOccuranceExceptLast(counts) {
  for (let i = 0; i < counts.length - 1; i++) {
    if (counts[i] !== counts[0]) return false;
  }
  return true;
}

function restAllEqual(counts) {
  for (let i = 2; i < counts.length; i++) {
    if (counts[i] !== counts[1]) return false;
  }
  return true;
}

// Four test cases
console.log(equalFrequency("abcc")) // true
console.log(equalFrequency("aazz")) // false
console.log(equalFrequency("aaa")) // true
console.log(equalFrequency("abbcc")) // true