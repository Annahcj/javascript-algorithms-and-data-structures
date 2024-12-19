// 3371. Identify the Largest Outlier in an Array
// You are given an integer array nums. This array contains n elements, where exactly n - 2 elements are special numbers. One of the remaining two elements is the sum of these special numbers, and the other is an outlier.
// An outlier is defined as a number that is neither one of the original special numbers nor the element representing the sum of those numbers.
// Note that special numbers, the sum element, and the outlier must have distinct indices, but may share the same value.
// Return the largest potential outlier in nums.


// Solution: Hashmap

// If we think about what the total sum of nums contains, it's:
  // The n-2 special numbers
  // The sum of the n-2 special numbers
  // The outlier
// Try to take every nums[i] as the sum of the n-2 special numbers.
// Once we know the special sum, we can derive the outlier by subtracting the special sum from the total sum twice. 
// What's remaining is the outlier.

// Use a hashmap to determine whether the outlier exists in nums.
// We need a hashmap for the case where the outlier is the same as the special sum. In this case we just need more than one occurance of the number.

// Time Complexity: O(n) 290ms
// Space Complexity: O(n) 69.5MB
function getLargestOutlier(nums) {
  const totalSum = nums.reduce((acc, num) => acc + num);
  const count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let maxOutlier = -Infinity;
  for (let num of nums) {
    const outlier = totalSum - num - num;
    if (num === outlier) {
      if (count[num] >= 2) maxOutlier = Math.max(maxOutlier, num);
    } else if (count[outlier]) {
      maxOutlier = Math.max(maxOutlier, outlier);
    }
  }
  return maxOutlier;
};

// Three test cases
console.log(getLargestOutlier([2,3,5,10])) // 10
console.log(getLargestOutlier([-2,-1,-3,-6,4])) // 4
console.log(getLargestOutlier([1,1,1,1,1,5,5])) // 5