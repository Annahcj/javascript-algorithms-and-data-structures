// 912. Sort an Array
// Given an array of integers nums, sort the array in ascending order.


var sortArray = function(nums) {
  mergeSort(nums);
  return nums;
};

// Solution 1: Quick Sort 

// Time Complexity: O(n log(n)) 223ms
// Space Complexity: O(n) 49.6MB
function quickSort(nums, start = 0, end = nums.length - 1) {
  if (start > end) return;
  let idx = partition(nums, start, end);
  quickSort(nums, start, idx - 1);
  quickSort(nums, idx + 1, end);
  return nums;
};

function partition(nums, start, end) {
  let midIdx = Math.floor((start + end) / 2);
  let pivotVal = nums[midIdx];
  let pivotIdx = start;
  [nums[midIdx], nums[end]] = [nums[end], nums[midIdx]];
  for (var i = start; i < end; i++) {
    if (nums[i] < pivotVal) {
      [nums[i], nums[pivotIdx]] = [nums[pivotIdx], nums[i]];
      pivotIdx++;
    }
  }
  [nums[pivotIdx], nums[end]] = [nums[end], nums[pivotIdx]];
  return pivotIdx;
}

// Solution 2: Merge Sort

// Time Complexity: O(n log(n)) 152ms
// Space Complexity: O(n) 52.1MB
function mergeSort(nums, start = 0, end = nums.length - 1) {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  mergeSort(nums, start, mid);
  mergeSort(nums, mid + 1, end);
  merge(nums, start, mid, end);
}

function merge(nums, start, mid, end) {
  let nums1 = nums.slice(start, mid + 1);
  let nums2 = nums.slice(mid + 1, end + 1);
  let idx = start, i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      nums[idx++] = nums1[i++];
    } else {
      nums[idx++] = nums2[j++];
    }
  }
  while (i < nums1.length) nums[idx++] = nums1[i++];
  while (j < nums2.length) nums[idx++] = nums2[j++];
}

// Two test cases to run function on
console.log(sortArray([5,2,3,1])) // [1,2,3,5]
console.log(sortArray([5,1,1,2,0,0])) // [0,0,1,1,2,5]