// 4. Median of Two Sorted Arrays
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).


// Solution: Divide & Conquer w/ Binary Search

// Thoughts:
// First note: The length of nums1 must be smaller than or equal to nums2, so if it isn't, simply return findMedianSortedArrays(nums2, nums1).


// We will use a divide and conquer method to partition the arrays into two segments of equal length. 
// (The median is basically the middle of the two arrays after they are merged, or the average of the two middle numbers if the length is even)
// So, we will use binary search to choose where to partition the nums1.

// Algorithm:
// If length of nums1 is bigger than the length of nums2, swap the order -> return findMedianSortedArrays(nums2, nums1).
// Set two pointers, low to 0, high to the length of nums1.
// Loop while low is smaller than or equal to high.
  // Let the partition of nums1 be partitionX, like the standard binary search, Math.floor((low + high) / 2)
  // Let the partition of nums2 be partitionY, but remember, the cut on nums2 must depend of the cut of nums1 since the length of the combined left arrays (anything left of the cut) should be the same as the length right arrays (anything right of the cut),
  // so the cut of nums2 should be ((length of nums1 + length of nums2 + 1) / 2) - partitionX.
  // (the reason we add 1 is for the case of an odd length array, we basically just add in a dummy space for calculation purposes)
  // Now, let maxX (number just left of the partitionX cut-line) be nums1[partitionX - 1] or -Infinity if partitionX is 0 (nothing to the left)
  // Let maxY (number just left of the partitionY cut-line) be nums2[partitionY - 1] or -Infinity if partitionY is 0.
  // Let minX (number just right of the partitionX cut-line) be nums1[partitionX], or Infinity if partitionX is equal to the length of nums1 (nothing to the right)
  // Let minY (number just right of the partitionY cut-line) be nums2[partitionY], or Infinity if partitionY is equal to the length of nums2.
  // Now, check if we have found the right position,  
  // If maxX is smaller than or equal to minY AND maxY is smaller than or equal to minX, 
    // If the combined length of nums1 and nums2 is odd, return Math.max(maxX, maxY)
    // Otherwise, return Math.max(maxX, maxY) + Math.min(minX, minY) divided by 2.
  // Else if maxY is bigger than minX (we are too far left in partitionX), set low to partitionX + 1.
  // Else, (we are too far right in partitionX) set high to partitionX - 1

// Time Complexity: O(log(min(nums1.length, nums2.length))) 116ms
// Space Complexity: O(1) 43MB
  var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    let x = nums1.length, y = nums2.length;
    let low = 0, high = x;
    while (low <= high) {
      let partitionX = Math.floor((low + high) / 2);
      let partitionY = Math.floor((x + y + 1) / 2) - partitionX;
  
      let maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
      let maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
  
      let minX = partitionX === nums1.length ? Infinity : nums1[partitionX];
      let minY = partitionY === nums2.length ? Infinity : nums2[partitionY];
  
      if (maxX <= minY && maxY <= minX) {
        let leftMax = Math.max(maxX, maxY);
        if ((x + y) % 2 === 1) return leftMax;
        return (leftMax + Math.min(minX, minY)) / 2;
      } else if (maxY > minX) {
        low = partitionX + 1;
      } else {
        high = partitionX - 1;
      }
    }
  };
  
  // Six test cases to run function on
  console.log(findMedianSortedArrays([8,9,10], [1])) // 8.5
  console.log(findMedianSortedArrays([1,3], [2])) // 2
  console.log(findMedianSortedArrays([1,2], [3,4])) // 2.5
  console.log(findMedianSortedArrays([0,0], [0,0])) // 0
  console.log(findMedianSortedArrays([], [1])) // 1
  console.log(findMedianSortedArrays([2], [])) // 2