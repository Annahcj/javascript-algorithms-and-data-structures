// 3430. Maximum and Minimum Sums of at Most Size K Subarrays
// You are given an integer array nums and a positive integer k. Return the sum of the maximum and minimum elements of all subarrays with at most k elements.


// Solution: Monotonic Stack

// Count the number of subarrays where every nums[i] is the maximum.
// We also need the count of subarrays where every nums[i] is the minimum.

// Count of subarrays where nums[i] is the maximum:
  // Maintain a monotonic decreasing stack.
  // For every index i,
    // Pop off all smaller or equal elements from the top of the stack.
    // Count the number of subarrays ending at index i: minimum(k, i - top of stack).
    // Explanation: All numbers between i and top of the stack are smaller than or equal to nums[i], hence there are i - top of stack possible starting indices for subarrays.
  // This count doesn't account for subarrays ending at indices right of index i.
  // Hence we need to do the same thing, but from right-to-left, to count the subarrays ending at indices right of i, where nums[i] is the maximum.

// For the minimum, do the same but use a monotonic increasing stack.
// Pop off all larger or equal elements from the top of the stack.

// The total number of subarrays where nums[i] is the maximum = subarraysLeftMin[i] * subarraysRightMin[i].
// However, this includes subarrays longer than k.
// Iterate through every starting or ending index of the subarray and calculate the number of subarrays with length <= k for the given starting/ending index.

// Time Complexity: O(n) 132ms
// Space Complexity: O(n) 83.02MB
function minMaxSubarraySum(nums, k) {
  const n = nums.length;
  const subarraysLeftMin = Array(n).fill(1); // subarraysLeftMin[i] = count of subarrays ending at index i where nums[i] is the minimum element
  const subarraysLeftMax = Array(n).fill(1); // subarraysLeftMax[i] = count of subarrays ending at index i where nums[i] is the maximum element
  let dec = [-1], inc = [-1];
  for (let i = 0; i < n; i++) {
    while (dec.length > 1 && nums[dec[dec.length - 1]] <= nums[i]) {
      dec.pop();
    }
    while (inc.length > 1 && nums[inc[inc.length - 1]] >= nums[i]) {
      inc.pop();
    }
    subarraysLeftMax[i] = Math.min(k, i - dec[dec.length - 1]);
    subarraysLeftMin[i] = Math.min(k, i - inc[inc.length - 1]);
    dec.push(i), inc.push(i);
  }
  dec = [n], inc = [n];
  let sum = 0;
  for (let i = n - 1; i >= 0; i--) {
    // note: we don't pop off equal elements to avoid counting duplicate subarrays when all elements are equal.
    // the subarrays with equal elements are already covered on the first pass (left-to-right)
    while (dec.length > 1 && nums[dec[dec.length - 1]] < nums[i]) {
      dec.pop();
    }
    while (inc.length > 1 && nums[inc[inc.length - 1]] > nums[i]) {
      inc.pop();
    }
    // subarrays starting at index i where nums[i] is the maximum element
    const subarraysRightMax = Math.min(k, dec[dec.length - 1] - i);
    const maxSum = nums[i] * calculateSubarrays(subarraysLeftMax[i], subarraysRightMax, k);
    // subarrays starting at index i where nums[i] is the minimum element
    const subarraysRightMin = Math.min(k, inc[inc.length - 1] - i);
    const minSum = nums[i] * calculateSubarrays(subarraysLeftMin[i], subarraysRightMin, k);
    sum += maxSum + minSum;
    dec.push(i), inc.push(i);
  }
  return sum;
};

// Calculate subarrays with length <= k
function calculateSubarrays(left, right, k) {
  if (left <= right) {
    let subarrays = 0;
    for (let i = 1; i <= left; i++) {
      subarrays += Math.min(right, k - i + 1);
    }
    return subarrays;
  } else {
    let subarrays = 0;
    for (let i = 1; i <= right; i++) {
      subarrays += Math.min(left, k - i + 1);
    }
    return subarrays;
  }
}

// Two test cases
console.log(minMaxSubarraySum([1,2,3], 2)) // 20
console.log(minMaxSubarraySum([1,-3,1], 2)) // -6