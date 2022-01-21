// 1207. Unique Number of Occurrences
// Given an array of integers arr, return true if the number of occurrences of each value in the array is unique, or false otherwise.


// Solution: Hashmap

// 1. Count the frequency of each number, store in a hashmap 'freq'
// 2. Store the frequencies of each frequency: If a frequency already exists, return false.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 40.3MB
var uniqueOccurrences = function(arr) {
  let freq = {};
  for (var num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }
  let freqFreq = Array(arr.length + 1).fill(0);
  for (var num in freq) {
    if (freqFreq[freq[num]] > 0) return false;
    freqFreq[freq[num]]++;
  }
  return true;
};

// Three test cases to run function on
console.log(uniqueOccurrences([1,2,2,1,1,3])) // true
console.log(uniqueOccurrences([1,2])) // false
console.log(uniqueOccurrences([-3,0,1,-3,1,1,1,-3,10,0])) // true