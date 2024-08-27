// 3265. Count Almost Equal Pairs I
// You are given an array nums consisting of positive integers.
// We call two integers x and y in this problem almost equal if both integers can become equal after performing the following operation at most once:
  // Choose either x or y and swap any two digits within the chosen number.
// Return the number of indices i and j in nums where i < j such that nums[i] and nums[j] are almost equal.
// Note that it is allowed for an integer to have leading zeros after performing an operation.


// Solution: Brute Force w/ Enumeration

// For each number, generate the integers after swapping a pair of digits.
// Since there can be duplicate integers, store these in a set before adding them to a map of counts at the end.
// Count the pairs on the fly: pairs += countMap[num]

// Note: nums must be sorted in descending order by length (e.g. [1000, 100, 10, 1])
  // Longer strings can be swapped to become smaller numbers (100 -> 001 = 1).
  // If we process 1 before 100, then we'll miss out on the pairs generated from 100 when processing 1. Hence 100 must come before 1.

// n = length of nums, m = max(nums[i].length)
// Time Complexity: O(n * m^3) 135ms
// Space Complexity: O(n * m^3) 57.5MB
var countPairs = function(nums) {
  nums = nums.map(String).sort((a, b) => b.length - a.length);
  let countMap = {}, pairs = 0;
  for (let num of nums) {
    pairs += countMap[num] || 0;
    let swaps = getSwaps(num, countMap);
    for (let swap of swaps) {
      countMap[swap] = (countMap[swap] || 0) + 1;
    }
  }
  return pairs;
};

function getSwaps(num) {
  let set = new Set([num]);
  num = num.split("");
  let n = num.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (num[i] === num[j]) continue;
      [num[i], num[j]] = [num[j], num[i]];
      set.add(Number(num.join("")));
      [num[i], num[j]] = [num[j], num[i]];
    }
  }
  return set;
}

// Three test cases
console.log(countPairs([3,12,30,17,21])) // 2
console.log(countPairs([1,1,1,1,1])) // 10
console.log(countPairs([123,231])) // 0