// 3005. Count Elements With Maximum Frequency
// You are given an array nums consisting of positive integers.
// Return the total frequencies of elements in nums such that those elements all have the maximum frequency.
// The frequency of an element is the number of occurrences of that element in the array.


// Solution: Hashmap

// Store the counts of elements in a hashmap.
// Keep track of the running max frequency.
// If a count exceeds the max frequency, reset the total count.
// If a count is equal to the max frequency, add to the total count.

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 44MB
var maxFrequencyElements = function(nums) {
  let maxFreq = 0, countMap = {}, ans = 0;
  for (let num of nums) {
    countMap[num] = (countMap[num] || 0) + 1;
    let count = countMap[num];
    if (count > maxFreq) {
      ans = count;
      maxFreq = count;
    } else if (count === maxFreq) {
      ans += count; 
    }
  }
  return ans;
};

// Two test cases
console.log(maxFrequencyElements([1,2,2,3,1,4])) // 4
console.log(maxFrequencyElements([1,2,3,4,5])) // 5