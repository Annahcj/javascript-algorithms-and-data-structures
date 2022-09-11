// 2404. Most Frequent Even Element
// Given an integer array nums, return the most frequent even element.
// If there is a tie, return the smallest one. If there is no such element, return -1.


// Solution: Hashmap

// Count the frequency of each even number.
// Go through each number and frequency, find the number with maximum frequency.

// Time Complexity: O(n) 94ms
// Space Complexity: O(n) 50.1MB
var mostFrequentEven = function(nums) {
  let freqMap = new Map();
  for (let num of nums) {
    if (num % 2 === 0) freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  
  let ans = -1, maxFreq = 0;
  for (let [num, freq] of freqMap) {
    if (freq > maxFreq || (freq === maxFreq && num < ans)) {
      ans = num;
      maxFreq = freq;
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(mostFrequentEven([0,1,2,2,4,4,1])) // 2
console.log(mostFrequentEven([4,4,4,9,2,4])) // 4
console.log(mostFrequentEven([29,47,21,41,13,37,25,7])) // -1