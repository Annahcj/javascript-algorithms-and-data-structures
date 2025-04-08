// 3396. Minimum Number of Operations to Make Elements in Array Distinct
// You are given an integer array nums. You need to ensure that the elements in the array are distinct. To achieve this, you can perform the following operation any number of times:
  // Remove 3 elements from the beginning of the array. If the array has fewer than 3 elements, remove all remaining elements.
// Note that an empty array is considered to have distinct elements. Return the minimum number of operations needed to make the elements in the array distinct.


// Solution: Hashset

// Iterate through nums from right-to-left.
// Find the first duplicate number, and return the number of elements remaining / 3.

// n = length of nums
// Time Complexity: O(n) 2ms
// Space Complexity: O(n) 55.1MB
function minimumOperations(nums) {
  const n = nums.length, set = new Set();
  for (let i = n - 1; i >= 0; i--) {
    if (set.has(nums[i])) {
      return Math.ceil((i + 1) / 3);
    }
    set.add(nums[i]);
  }
  return 0;
};

// Three test cases
console.log(minimumOperations([1,2,3,4,2,3,3,5,7])) // 2
console.log(minimumOperations([4,5,6,4,4])) // 2
console.log(minimumOperations([6,7,8,9])) // 0