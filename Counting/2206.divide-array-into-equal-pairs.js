// 2206. Divide Array Into Equal Pairs
// You are given an integer array nums consisting of 2 * n integers.
// You need to divide nums into n pairs such that:
  // Each element belongs to exactly one pair.
  // The elements present in a pair are equal.
// Return true if nums can be divided into n pairs, otherwise return false.


// Solution: Counting

// Check that the occurances of every nums[i] is even.

// Time Complexity: O(n) 5ms
// Space Complexity: O(n) 56.5MB
function divideArray(nums) {
  const count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  for (let num in count) {
    if (count[num] % 2 === 1) {
      return false;
    }
  }
  return true;
};

// Two test cases
console.log(divideArray([3,2,3,2,2,2])) // true
console.log(divideArray([1,2,3,4])) // false