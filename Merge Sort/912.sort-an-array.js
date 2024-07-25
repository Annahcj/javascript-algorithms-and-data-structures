// 912. Sort an Array
// Given an array of integers nums, sort the array in ascending order.


// Solution 1: Quick Sort

// Recursively use the partition function on the split segments of the array (within the start and end indexes).
// Partition function - picks a pivot value and moves all smaller values to the left of the pivot, and all larger values to the right of the pivot:
  // 1. Choose the middle index as the pivot value.
  // 2. Move the pivot to the end.
  // 3. Compare all numbers against the pivot value and swap it with the pivot index and increment the index if smaller than the pivot value.
  // 4. Move the pivot value to its final position (the final state of the pivot index).

// In summary, we're using divide and conquer to recursively "pivot sort" each segment of the array until the whole array is sorted.
// The time complexity is O(n log(n)) because we split each segment of the array into 2 at each step (log(n) times), with the partition function taking O(n).

// Time Complexity: O(n log(n)) 2424ms
// Space Complexity: O(log(n)) 75.7MB
function sortArray(nums, start = 0, end = nums.length - 1) {
  if (start >= end) return nums;
  let pivotIndex = partition(nums, start, end);
  sortArray(nums, start, pivotIndex - 1);
  sortArray(nums, pivotIndex + 1, end);
  return nums;
}

function partition(nums, start, end) {
  let midIndex = Math.floor((start + end) / 2);
  let pivotValue = nums[Math.floor((start + end) / 2)];
  [nums[midIndex], nums[end]] = [nums[end], nums[midIndex]];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (nums[i] < pivotValue) {
      [nums[i], nums[pivotIndex]] = [nums[pivotIndex], nums[i]];
      pivotIndex++;
    }
  }
  [nums[end], nums[pivotIndex]] = [nums[pivotIndex], nums[end]];
  return pivotIndex;
}


// Solution 2: Merge Sort

// Time Complexity: O(n log(n)) 152ms
// Space Complexity: O(n) 52.1MB
var sortArray = function(nums) {
  mergeSort(nums);
  return nums;
};

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

// Two test cases
console.log(sortArray([5,2,3,1])) // [1,2,3,5]
console.log(sortArray([5,1,1,2,0,0])) // [0,0,1,1,2,5]