// 532. K-diff Pairs in an Array
// Given an array of integers nums and an integer k, return the number of unique k-diff pairs in the array.


// Solution: Hashmap

// Add to the frequency of each number on the go.
// Edge case: when k is 0, the frequency of 2 should result in a pair.
// Normal case: If the map doesn't contain the number, check for num + k and num - k.

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 44MB
var findPairs = function(nums, k) {
  let freqMap = {}, pairs = 0;
  for (var num of nums) {
    if (k === 0) {
      if (freqMap[num] === 1) pairs++;
    } else {
      if (!freqMap[num]) {
        if (freqMap[num + k]) pairs++;
        if (freqMap[num - k]) pairs++;
      }
    }
    freqMap[num] = (freqMap[num] || 0) + 1;
  }
  return pairs;
};

// Four test cases to run function on
console.log(findPairs([3,1,4,1,5], 2)) // 2
console.log(findPairs([1,2,3,4,5], 1)) // 4
console.log(findPairs([1,3,1,5,4], 0)) // 1
console.log(findPairs([1,1,1,1,1], 0)) // 1