// 2364. Count Number of Bad Pairs
// You are given a 0-indexed integer array nums. A pair of indices (i, j) is a bad pair if i < j and j - i != nums[j] - nums[i].
// Return the total number of bad pairs in nums.


// Solution: Count Good Pairs

// Count the number of good pairs and subtract it from the total number of pairs.
// Good pairs always share the same (i - nums[i]).
// Use a hashmap to keep track of each i - nums[i] and count the number of good pairs for each nums[i].

// Time Complexity: O(n) 194ms
// Space Complexity: O(n) 67.3MB
var countBadPairs = function(nums) {
  let n = nums.length, pairs = n * (n - 1) / 2;  
  let count = new Map();
  for (let i = 0; i < n; i++) {
    let diff = i - nums[i];
    pairs -= count.get(diff) || 0;
    count.set(diff, (count.get(diff) || 0) + 1);
  }
  return pairs;
};

// Two test cases to run function on
console.log(countBadPairs([4,1,3,3])) // 5
console.log(countBadPairs([1,2,3,4,5])) // 0