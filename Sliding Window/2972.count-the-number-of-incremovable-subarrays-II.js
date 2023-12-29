// 2972. Count the Number of Incremovable Subarrays II
// You are given a 0-indexed array of positive integers nums.
// A subarray of nums is called incremovable if nums becomes strictly increasing on removing the subarray. For example, the subarray [3, 4] is an incremovable subarray of [5, 3, 4, 6, 7] because removing this subarray changes the array [5, 3, 4, 6, 7] to [5, 6, 7] which is strictly increasing.
// Return the total number of incremovable subarrays of nums.
// Note that an empty array is considered strictly increasing.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution 1: Binary Search

// From left to right, find the rightmost index i where (nums[0], ..., nums[i]) is strictly increasing.

// Go through each index j from right to left, keep track of whether the suffix from (nums[i], ..., nums[n - 1]) is strictly increasing.
// Binary search through the indices of strictly increasing sequences on the left, and find the largest index where nums[i] > nums[j].
// We can take all incremovable subarrays starting from index 0 to the binary search index.

// Time Complexity: O(n log(n)) 179ms
// Space Complexity: O(1) 53.4MB
var incremovableSubarrayCount = function(nums) {
  let n = nums.length, lastStrictlyIncIndex = 0;
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] >= nums[i]) {
      break;
    }
    lastStrictlyIncIndex = i;
  }
  let count = Math.min(n, lastStrictlyIncIndex + 2); // subarrays removing the entire suffix, but can't select an empty subarray
  for (let j = n - 1; j >= 1; j--) {
    if (j < n - 1 && nums[j] >= nums[j + 1]) break;
    // when rightmostSmallerIndex === -1, we will remove the entire left prefix subarray up to j
    let rightmostSmallerIndex = getRightmostSmallerIndex(nums, lastStrictlyIncIndex, nums[j]);
    // we can't remove an empty subarray, hence when rightmostSmallerIndex + 1 === j, we need to exclude the empty subarray
    count += rightmostSmallerIndex + 1 < j ? rightmostSmallerIndex + 2 : rightmostSmallerIndex + 1;
  }
  return count;
};

// Binary search for the rightmost index <= rightBound, where nums[index] < num
function getRightmostSmallerIndex(nums, rightBound, num) {
  let low = 0, high = rightBound;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (nums[mid] < num) low = mid;
    else high = mid - 1;
  }
  return nums[low] < num ? low : -1;
}


// Solution 2: Sliding Window

// Three situations of subarrays to remove:
  // Prefix subarrays (starting at index 0)
  // Suffix subarrays (ending at index n - 1)
  // Normal subarrays (subarrays not at the start or end)

// Maintain a sliding window with two pointers, 
  // The right pointer will be the anchor, going from right to left incrementally while the suffix is strictly increasing.
  // The left pointer will be moved down while the prefix is strictly increasing, and nums[i] < nums[j]. The first position of the left pointer is the rightmost nums[i] of the strictly increasing prefix.

// For each state of the two pointers, the number of incremovable subarrays is:
  // If i + 1 < j: i + 2 (remove all subarrays with starting positions from index 0 to index i + 1, ending at index j - 1).
  // Otherwise if i + 1 === j: i + 1 (excluding the empty subarray).

// Time Complexity: O(n) 162ms
// Space Complexity: O(1) 53.5MB
var incremovableSubarrayCount = function(nums) {
  let n = nums.length, count = 0; 
  // get the rightmost index of a strictly increasing prefix
  // (this covers removing suffix subarrays)
  let i = 0;
  for (i = 0; i < n; i++) {
    if (i > 0 && nums[i - 1] >= nums[i]) break;
    count++; // remove suffix subarray
  }
  i--;
  if (i < n - 1) count++; // remove entire subarray
  // maintain right pointer while the suffix is strictly increasing
  // (this covers removing prefix subarrays and normal subarrays)
  for (let j = n - 1; j >= 0; j--) {
    if (j < n - 1 && nums[j] >= nums[j + 1]) break;
    while (i >= 0 && (i >= j || nums[i] >= nums[j])) i--;
    count += i + 1 < j ? i + 2 : i + 1;
  }
  return count;
};

// Three test cases
console.log(incremovableSubarrayCount([1,2,3,4])) // 10
console.log(incremovableSubarrayCount([6,5,7,8])) // 7
console.log(incremovableSubarrayCount([8,7,6,6])) // 3