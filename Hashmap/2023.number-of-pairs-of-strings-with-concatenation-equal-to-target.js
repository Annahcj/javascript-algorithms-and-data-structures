// 2023. Number of Pairs of Strings With Concatenation Equal to Target
// Given an array of digit strings nums and a digit string target, return the number of pairs of indices (i, j) (where i != j) such that the concatenation of nums[i] + nums[j] equals target.


// Solution: Hashmap

// Keep the frequency of each number on the fly.
// For each number, check whether
  // 1. The target starts with the number.
    // Get the frequency of the complementary part of the target (the end) and add to our answer.
  // 2. The target ends with the number.
    // Get the frequency of the complementary part of the target (the start) and add to our answer.
  // Then, increase the frequency of the number.

// n = nums.length, m = maximum nums[i].length
// Time Complexity: O(nm) 71ms
// Space Complexity: O(n) 43.3MB
var numOfPairs = function(nums, target) {
  let ans = 0, map = new Map();
  for (let num of nums) {
    let length = num.length;
    if (target.startsWith(num)) {
      let matches = map.get(target.slice(length)) || 0;
      ans += matches;
    }
    if (target.endsWith(num)) {
      let matches = map.get(target.slice(0, target.length - length)) || 0;
      ans += matches;
    }
    map.set(num, (map.get(num) || 0) + 1);
  }
  return ans;
};

// Three test cases
console.log(numOfPairs(["777","7","77","77"], "7777")) // 4
console.log(numOfPairs(["123","4","12","34"], "1234")) // 2
console.log(numOfPairs(["1","1","1"], "11")) // 6