// 801. Minimum Swaps To Make Sequences Increasing
// You are given two integer arrays of the same length nums1 and nums2. In one operation, you are allowed to swap nums1[i] with nums2[i].
  // For example, if nums1 = [1,2,3,8], and nums2 = [5,6,7,4], you can swap the element at i = 3 to obtain nums1 = [1,2,3,4] and nums2 = [5,6,7,8].
// Return the minimum number of needed operations to make nums1 and nums2 strictly increasing. The test cases are generated so that the given input always makes it possible.
// An array arr is strictly increasing if and only if arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1].


// Solution: Dynamic Programming

// Keep track of two dp arrays - swapped and notSwapped.
// swapped[i] = minimum number of swaps to have both sequences increasing where nums1[i] and nums2[i] are swapped.
// notSwapped[i] = minimum number of swaps to have both sequences increasing where nums1[i] and nums2[i] are not swapped.

// For each i in nums, try the two situations of (nums1[i - 1] and nums2[i - 1] with nums1[i] and nums2[i]):
  // 1. Both sequences can be increasing without pairing with the opposite pair (swap/swap or notswap/notswap)
  // 2. Both sequences can be increasing by pairing with the opposite pair (swap/notswap or notswap/swap)
// Pick the minimum number of swaps out of these situations.

// Time Complexity: O(n) 118ms
// Space Complexity: O(n) 62.2MB
var minSwap = function(nums1, nums2) {
  let n = nums1.length;
  let swapped = Array(n).fill(Infinity), notSwapped = Array(n).fill(Infinity);
  swapped[0] = 1, notSwapped[0] = 0; // base cases
  for (let i = 1; i < n; i++) {
    if (nums1[i] > nums1[i - 1] && nums2[i] > nums2[i - 1]) { 
      notSwapped[i] = notSwapped[i - 1]; // don't swap i - 1 and don't swap i
      swapped[i] = swapped[i - 1] + 1; // swap i - 1 and swap i
    }
    if (nums1[i] > nums2[i - 1] && nums2[i] > nums1[i - 1]) { 
      notSwapped[i] = Math.min(notSwapped[i], swapped[i - 1]) // swap i - 1 and don't swap i
      swapped[i] = Math.min(swapped[i], notSwapped[i - 1] + 1) // don't swap i - 1 and swap i
    }
  }
  return Math.min(swapped[n - 1], notSwapped[n - 1]);
};

// Two test cases to run function on
console.log(minSwap([1,3,5,4], [1,2,3,7])) // 1
console.log(minSwap([0,3,5,8,9], [2,1,4,6,9])) // 1