// 2040. Kth Smallest Product of Two Sorted Arrays
// Given two sorted 0-indexed integer arrays nums1 and nums2 as well as an integer k, return the kth (1-based) smallest product of nums1[i] * nums2[j] where 0 <= i < nums1.length and 0 <= j < nums2.length.


// Binary Search

// Binary search for the smallest product p which has at least k other products smaller than or equal to it.
// The search space is max(nums1[i]) * max(nums2[j]) = 10^10

// To count how many products are smaller than or equal to p,
  // Use two pointers, anchor i incrementing through nums1 and start j at the end of nums2.
  // If nums1[i] * nums2[j] > p, move j down. 
  // (Since i increments up, if this product is too big already, then moving i up will only make the product larger, hence we can safely move j down).
  // Time complexity is O(n + m) here since j only iterates through nums2 once.

// To deal with negative numbers, we split the negative and positive numbers into two separates arrays for nums1 and nums2.
// Count the products that come from each combination:
  // Positive Positive: Sorted asc for both
  // Positive Negative: Sorted desc for nums1, sorted asc for nums2
  // Negative Positive: Sorted asc for nums1, sorted desc for nums
  // Negative Negative: Sorted desc for both

// n = length of nums1, m = length of nums2
// Time Complexity: O((n + m) * log(10^10)) 120ms
// Space Complexity: O(1) 74MB
function kthSmallestProduct(nums1, nums2, k) {
  const [neg1, pos1] = [nums1.filter((num) => num < 0), nums1.filter((num) => num >= 0)];
  const [neg2, pos2] = [nums2.filter((num) => num < 0), nums2.filter((num) => num >= 0)];
  const neg1Rev = [...neg1].reverse(), neg2Rev = [...neg2].reverse();
  const pos1Rev = [...pos1].reverse(), pos2Rev = [...pos2].reverse();
  const UPPER_BOUND = 10000000000;
  
  let low = -UPPER_BOUND, high = UPPER_BOUND;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const count = countSmallerOrEqual(pos1, pos2, mid) + countSmallerOrEqual(pos1Rev, neg2, mid) + countSmallerOrEqual(neg1, pos2Rev, mid) + countSmallerOrEqual(neg1Rev, neg2Rev, mid);
    if (count >= k) high = mid;
    else low = mid + 1;
  }
  return low;
};

function countSmallerOrEqual(nums1, nums2, max) {
  if (!nums1.length || !nums2.length) return 0;
  let j = nums2.length - 1, count = 0;
  for (let i = 0; i < nums1.length; i++) {
    while (j >= 0 && nums1[i] * nums2[j] > max) j--;
    count += (j + 1);
  }
  return count;
}

// Two test cases
console.log(kthSmallestProduct([2,5], [3,4], 2)) // 8
console.log(kthSmallestProduct([-2,-1,0,1,2], [-3,-1,2,4,5], 3)) // -6