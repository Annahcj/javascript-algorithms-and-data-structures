// 1671. Minimum Number of Removals to Make Mountain Array
// You may recall that an array arr is a mountain array if and only if:
  // arr.length >= 3
  // There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
    // arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    // arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
// Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.


// Solution: Binary Search

// For every nums[i], try to make it the peak and find the LIS or actually longest decreasing sequence from nums[i] in both directions.
// Find the longest combined sequence length.

// To find the longest decreasing sequence starting with nums[i], we can use the binary search technique commonly used in LIS (longest increasing subsequence).
// LIS: For each number nums[j], use binary search to find the first number smaller than or equal to nums[j]. The only difference from the normal LIS is we can't replace the peak number (nums[i]). If a number is larger than the peak, we simply can't include it in the sequence.

// Time Complexity: O(n * n log(n)) 575ms
// Space Complexity: O(n) 56.1MB
function minimumMountainRemovals(nums) {
  let n = nums.length, minRemovals = Infinity;
  for (let i = 0; i < n; i++) {
    let leftSeq = [nums[i]];
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] >= nums[i]) continue;
      let firstSmaller = binarySearch(leftSeq, 1, leftSeq.length - 1, nums[j]);
      if (firstSmaller === -1) continue;
      leftSeq[firstSmaller] = nums[j];
    }
    let rightSeq = [nums[i]];
    for (let j = i + 1; j < n; j++) {
      if (nums[j] >= nums[i]) continue;
      let firstSmaller = binarySearch(rightSeq, 1, rightSeq.length - 1, nums[j]);
      if (firstSmaller === -1) continue;
      rightSeq[firstSmaller] = nums[j];
    }
    let finalLen = leftSeq.length + rightSeq.length - 1;
    if (leftSeq.length > 1 && rightSeq.length > 1) {
      minRemovals = Math.min(minRemovals, n - finalLen);
    }
  }
  return minRemovals;
};

// Find leftmost index in range (start, end) where arr[index] < num
function binarySearch(arr, start, end, num) {
  let low = start, high = end;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] < num) high = mid;
    else low = mid + 1;
  }
  if (arr[low] < num) {
    return low;
  }
  return arr[low] === num ? -1 : end + 1;
}

// Two test cases
console.log(minimumMountainRemovals([1,3,1])) // 0
console.log(minimumMountainRemovals([2,1,1,5,6,2,3,1])) // 3