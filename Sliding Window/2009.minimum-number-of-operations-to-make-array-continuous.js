// 2009. Minimum Number of Operations to Make Array Continuous
// You are given an integer array nums. In one operation, you can replace any element in nums with any integer.
// nums is considered continuous if both of the following conditions are fulfilled:
  // All elements in nums are unique.
  // The difference between the maximum element and the minimum element in nums equals nums.length - 1.
// For example, nums = [4, 2, 5, 3] is continuous, but nums = [1, 2, 3, 5, 6] is not continuous.
// Return the minimum number of operations to make nums continuous.


// Solution 1: Sliding Window 

// 1. Dedupe nums - remove all duplicates.
// 2. Sort nums in asc order.
// 3. Maintain a sliding window over the sorted nums where the diff between the left and right values <= n - 1.

// Time Complexity: O(n log(n)) 228ms
// Space Complexity: O(n) 75.2MB
var minOperations = function(nums) {
  let n = nums.length;
  nums = [...new Set(nums)].sort((a, b) => a - b);
  let minOperations = n;
  for (let j = 0, i = 0; j < nums.length; j++) {
    while (nums[j] - nums[i] >= n) i++;
    minOperations = Math.min(minOperations, n - (j - i + 1));
  }
  return minOperations;
};


// Solution 2: Binary Search

// 1. Sort and get the unique numbers from nums (make sure to get the length of nums before getting the unique numbers).
// 2. Try each nums[i] as the start of a window of n increasing numbers.
  // If nums.length = 5 and nums[i] = 1, find the count of numbers inside the range [1, ..., 5]
  // end = nums[i] + n - 1 (in this case 1 + 5 - 1 = 5)
  // Use binary search to find the index of the rightmost number <= end.
  // Then, the count of numbers within the range [start, end] will be: index - i + 1
  // The number of remaining numbers which we need to change are n - count

// e.g: [1,3,4,5,8]
// i = 0: start = 1, end = 1 + 5 - 1 = 5
  // (looking for [1,2,3,4,5])
  // idx of end = 3
  // count of unique nums = idx - i + 1 = 3 - 0 + 1 = 4
  // then operations = nums.length - count = 5 - 4 = 1
// i = 1: start = 3, end = 3 + 5 - 1 = 7
  // (looking for [3,4,5,6,7])
  // idx of end = 3 (because 7 doesn't exist, the next smallest number is 5)
  // count of unique nums = 3 - 1 + 1 = 3
  // operations = 5 - 3 = 2
// i = 2, start = 4, end = 4 + 5 - 1 = 8
  // (looking for [4,5,6,7,8])
  // idx of end = 4
  // count of unique nums = 4 - 2 + 1 = 3
  // operations = 5 - 3 = 2
// i = 3, start = 5, end = 5 + 5 - 1 = 9
  // (looking for [5,6,7,8,9])
  // idx of end = 4
  // count of unique nums = 4 - 3 + 1 = 2
  // operations = 5 - 2 = 3
// i = 4, start = 8, end = 8 + 5 - 1 = 12
  // (looking for [8,9,10,11,12])
  // idx of end = 4
  // count of unique nums = 4 - 4 + 1 = 1
  // operations = 5 - 1 = 4

// The minimum operations is 1, starting at index 0.

// Time Complexity: O(n log(n)) 387ms
// Space Complexity: O(n) 77.6MB
var minOperations = function(nums) {
  let n = nums.length;
  nums = [...new Set(nums)].sort((a, b) => a - b);
  
  let ans = n;
  for (let i = 0; i < n; i++) {
    let start = nums[i], end = start + n - 1;
    let idx = findIdx(end), count = idx - i + 1;
    ans = Math.min(ans, n - count);
  }
  return ans;
  
  function findIdx(num) {
    // find right bound
    let low = 0, high = nums.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (nums[mid] <= num) low = mid;
      else high = mid - 1;
    }
    return low;
  }
};

// Three test cases 
console.log(minOperations([4,2,5,3])) // 0
console.log(minOperations([1,2,3,5,6])) // 1
console.log(minOperations([1,10,100,1000])) // 3