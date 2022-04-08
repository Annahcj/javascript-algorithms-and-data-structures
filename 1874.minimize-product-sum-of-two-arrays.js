// 1874. Minimize Product Sum of Two Arrays
// The product sum of two equal-length arrays a and b is equal to the sum of a[i] * b[i] for all 0 <= i < a.length (0-indexed).
  // For example, if a = [1,2,3,4] and b = [5,2,3,1], the product sum would be 1*5 + 2*2 + 3*3 + 4*1 = 22.
// Given two arrays nums1 and nums2 of length n, return the minimum product sum if you are allowed to rearrange the order of the elements in nums1. 


// Solution 1: Sorting

// It is always optimal to pair numbers that have the biggest difference -> first and last, second and second last, etc.
// This is because the product becomes much larger than bigger numbers are paired together.

// Time Complexity: O(n log(n)) 327ms
// Space Complexity: O(log(n)) (space for sorting) 62.3MB
var minProductSum = function(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < nums1.length; i++) {
    ans += nums1[i] * nums2[i];
  }
  return ans;
};

// Solution 2: Counting Sort & Two Pointers

// Use counting sort since 1 <= nums1[i], nums2[i] <= 100
// Use two pointers to get the result - one pointer goes forwards while the other pointer goes backwards.

// Time Complexity: O(n + 100) = O(n) 153ms
// Space Complexity: O(100) = O(1) 54.8MB
var minProductSum = function(nums1, nums2) {
  let max = Math.max(Math.max(...nums1), Math.max(...nums2)); // get maximum number from both arrays
  let count1 = Array(max + 1).fill(0), count2 = Array(max + 1).fill(0);
  for (let i = 0; i < nums1.length; i++) {
    count1[nums1[i]]++;
    count2[nums2[i]]++;
  }
  
  let ans = 0;
  let i = 0, j = max;
  while (i <= max && j > 0) {
    while (count1[i] === 0) i++;
    while (count2[j] === 0) j--;
    if (i > max || j <= 0) continue; // out of range because of inner while loops
    ans += i * j;
    count1[i]--, count2[j]--;
  }
  return ans;
};

// Two test cases to run function on
console.log(minProductSum([5,3,4,2], [4,2,2,5])) // 40
console.log(minProductSum([2,1,4,5,7], [3,2,4,8,6])) // 65