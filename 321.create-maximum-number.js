// 321. Create Maximum Number
// You are given two integer arrays nums1 and nums2 of lengths m and n respectively. nums1 and nums2 represent the digits of two numbers. You are also given an integer k.
// Create the maximum number of length k <= m + n from digits of the two numbers. The relative order of the digits from the same array must be preserved.
// Return an array of the k digits representing the answer.


// Solution: Monotonic Decreasing Stack & Two Pointers

// 1. Try all combinations of i: Take the i maximum digits from nums1 and n - i maximum digits from nums2, while maintaining the relative order.
  // Use a monotonic decreasing stack to find the i maximum digits from an array.
  // Pop from the stack while the current digit is bigger, while we have enough digits in the stack and in the array.

// 2. Merge maxDigits1 with maxDigits2 using a greedy strategy
  // Use two pointers, pick the maximum digit out of the two arrays since larger digits earlier on always creates the maximum number.
    // Edge case: When a[i] === b[j], we need to pick the one with the first larger digit.
  // Keep track of the maximum merged array so far and compare each merged array with the maximum, and replace if necessary.

// Time Complexity: O(k^2) 164ms
  // worst case: O(k^3)
// Space Complexity: O(k) 49.2MB
var maxNumber = function(nums1, nums2, k) {
  let res = Array(k).fill(0);
  for (let i = 0; i <= k; i++) {
    if (i > nums1.length || k - i > nums2.length) continue;
    let maxDigits1 = findMaxDigits(nums1, i);
    let maxDigits2 = findMaxDigits(nums2, k - i);
    let mergedDigits = merge(maxDigits1, maxDigits2);
    res = getMax(res, mergedDigits);
  } 
  return res;
};

function findMaxDigits(nums, k) { // find the n maximum digits in nums while keeping relative order
  let stack = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    while (stack.length && stack[stack.length - 1] < nums[i] && stack.length + n - i > k) {
      stack.pop(); // remove smaller numbers from top of stack
    }
    stack.push(nums[i]);
  }
  while (stack.length > k) stack.pop();
  return stack; 
}

function merge(nums1, nums2) {
  let res = [];
  let i = 0, j = 0;
  while (i < nums1.length || j < nums2.length) {
    if (j === nums2.length || nums1[i] > nums2[j]) {
      res.push(nums1[i++]);
    } else if (i === nums1.length || nums2[j] > nums1[i]) {
      res.push(nums2[j++]);
    } else if (nums1[i] === nums2[j]) {
      let nums1IsLarger = nums1Larger(nums1, nums2, i, j);
      if (nums1IsLarger) {
        res.push(nums1[i++]);
      } else {
        res.push(nums2[j++]);
      }
    }
  }
  return res;
}

function getMax(arr1, arr2) {
  let k = arr1.length;
  for (let i = 0; i < k; i++) {
    if (arr1[i] > arr2[i]) return arr1;
    else if (arr2[i] > arr1[i]) return arr2;
  }
  return arr1;
}

function nums1Larger(arr1, arr2, i, j) {
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) return true;
    else if (arr2[j] > arr1[i]) return false;
    i++, j++;
  }
  return i < arr1.length;
}

// Three test cases
console.log(maxNumber([3,4,6,5], [9,1,2,5,8,3], 5)) // [9,8,6,5,3]
console.log(maxNumber( [6,7], [6,0,4], 5)) // [6,7,6,0,4]
console.log(maxNumber([3,9], [8,9], 3)) // [9,8,9]