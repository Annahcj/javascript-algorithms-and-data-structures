// 3267. Count Almost Equal Pairs II
// Attention: In this version, the number of operations that can be performed, has been increased to twice.
// You are given an array nums consisting of positive integers.
// We call two integers x and y almost equal if both integers can become equal after performing the following operation at most twice:
  // Choose either x or y and swap any two digits within the chosen number.
  // Return the number of indices i and j in nums where i < j such that nums[i] and nums[j] are almost equal.
// Note that it is allowed for an integer to have leading zeros after performing an operation.


// Solution: Brute Force w/ Enumeration

// There are at most 7 digits in a number, since nums[i] <= 10^7.

// For every nums[i], generate every number with up to two swaps and count the occurances of every number we generate.
// (Keep a set for every nums[i] before adding to the main map so that we don't count duplicate pairs)
// Count the pairs on the fly: pairs += count[nums[i]]

// Note: nums must be sorted in descending order by length (e.g. [1000, 100, 10, 1])
  // Longer strings can be swapped to become smaller numbers (100 -> 001 = 1).
  // If we process 1 before 100, then we'll miss out on the pairs generated from 100 when processing 1. Hence 100 must come before 1.

// n = length of nums, m = max(nums[i].length)
// Time Complexity: O(n * m^5) 3002ms
// Space Complexity: O(n * m^5) 71.5MB
function countPairs(nums) {
  nums = nums.map(String).sort((a, b) => b.length - a.length);
  let map = {}, pairs = 0;
  for (let num of nums) {
    pairs += map[num] || 0;
    let swaps = getSwaps(num);
    for (let swap of swaps) {
      map[swap] = (map[swap] || 0) + 1;
    }
  }
  return pairs;
};

function getSwaps(num) {
  num = num.split("");
  let set = new Set([Number(num.join(""))]), n = num.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [num[i], num[j]] = [num[j], num[i]];
      set.add(Number(num.join("")));
      for (let k = 0; k < n; k++) {
        for (let l = k + 1; l < n; l++) {
          [num[k], num[l]] = [num[l], num[k]];
          set.add(Number(num.join("")));
          [num[l], num[k]] = [num[k], num[l]];
        }
      }
      [num[j], num[i]] = [num[i], num[j]];
    }
  }
  return set;
}

// Two test cases
console.log(countPairs([1023,2310,2130,213])) // 4
console.log(countPairs([1,10,100])) // 3