// 1512. Number of Good Pairs
// Given an array of integers nums, return the number of good pairs.
// A pair (i, j) is called good if nums[i] == nums[j] and i < j.


// Solution 1: Hashmap

// Use a hashmap to keep the occurances of each number.
// Add to the frequency on the fly, so that we only count each pair once.

// Time Complexity: O(n) 64ms
// Space Complexity: O(n) 42.5MB
var numIdenticalPairs = function(nums) {
  let map = new Map(), ans = 0;
  for (let num of nums) {
    ans += map.get(num) || 0;
    map.set(num, (map.get(num) || 0) + 1);
  }
  return ans;
};

// Solution 2: Freq Array

// Since 1 <= nums[i] <= 100, we can use an array of length 101 to keep track of the count of each number.

// Time Complexity: O(n) 56ms
// Space Complexity: O(n) 42.5MB
var numIdenticalPairs = function(nums) {
  let count = Array(101).fill(0), ans = 0;
  for (let num of nums) {
    ans += count[num];
    count[num]++;
  }
  return ans;
};

// Three test cases to run function on
console.log(numIdenticalPairs([1,2,3,1,1,3])) // 4
console.log(numIdenticalPairs([1,1,1,1])) // 6
console.log(numIdenticalPairs([1,2,3])) // 0