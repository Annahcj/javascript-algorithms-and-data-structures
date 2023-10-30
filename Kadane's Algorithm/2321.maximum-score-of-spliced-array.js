// 2321. Maximum Score Of Spliced Array
// You are given two 0-indexed integer arrays nums1 and nums2, both of length n.
// You can choose two integers left and right where 0 <= left <= right < n and swap the subarray nums1[left...right] with the subarray nums2[left...right].
  // For example, if nums1 = [1,2,3,4,5] and nums2 = [11,12,13,14,15] and you choose left = 1 and right = 2, nums1 becomes [1,12,13,4,5] and nums2 becomes [11,2,3,14,15].
// You may choose to apply the mentioned operation once or not do anything.
// The score of the arrays is the maximum of sum(nums1) and sum(nums2), where sum(arr) is the sum of all the elements in the array arr.
// Return the maximum possible score.
// A subarray is a contiguous sequence of elements within an array. arr[left...right] denotes the subarray that contains the elements of nums between indices left and right (inclusive).


// Solution: Kadane's Algorithm on Diffs

// Use kadane's algorithm on the differences between a subarray in nums1 and nums2.
// Since the differences can add score to either nums1 or nums2, process the two cases separately.

// Time Complexity: O(n) 99ms
// Space Complexity: O(1) 52.4MB
var maximumsSplicedArray = function(nums1, nums2) {
  let sum1 = 0, sum2 = 0;
  for (let num of nums1) sum1 += num;
  for (let num of nums2) sum2 += num;
  return Math.max(getMaxScore(nums1, nums2, sum1), getMaxScore(nums2, nums1, sum2));
  
  function getMaxScore(nums1, nums2, sum1) {
    let diff = 0, maxScore = 0;
    for (let i = 0; i < nums1.length; i++) {
      let currDiff = nums2[i] - nums1[i];
      diff = Math.max(diff + currDiff, currDiff);
      maxScore = Math.max(maxScore, sum1 + diff);
    }
    return maxScore;
  }
};

// Two test cases
console.log(maximumsSplicedArray([60,60,60], [10,90,10])) // 210
console.log(maximumsSplicedArray([20,40,20,70,30], [50,20,50,40,20])) // 220