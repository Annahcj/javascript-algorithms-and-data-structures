// 3002. Maximum Size of a Set After Removals
// You are given two 0-indexed integer arrays nums1 and nums2 of even length n.
// You must remove n / 2 elements from nums1 and n / 2 elements from nums2. After the removals, you insert the remaining elements of nums1 and nums2 into a set s.
// Return the maximum possible size of the set s.


// Solution: Hashset

// Try to keep the n / 2 numbers which are only present in one array.
// Then, take the common numbers if there are still spaces remaining.

// 1. Remove all duplicate numbers from nums1 and nums2 by storing them in a set.
// 2. Find the common numbers between nums1 and nums2 and add them to a set.
// 3. Count how many unique numbers we can keep in nums1 and nums2, under the limit.
// 4. If an array doesn't have enough numbers, take common numbers until we reach the limit or run out of common numbers. 

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 83ms
// Space Complexity: O(n + m) 58.4MB
var maximumSetSize = function(nums1, nums2) {
  let n = nums1.length, limit = n / 2;
  let set1 = new Set(nums1), set2 = new Set(nums2);
  let common = new Set();
  for (let num of nums1) {
    if (set2.has(num)) {
      common.add(num);
    }
  }
  // take as many unique numbers as possible under the limit
  let uniqueNums1 = Math.min(limit, set1.size - common.size);
  let uniqueNums2 = Math.min(limit, set2.size - common.size);
  // if we don't have enough numbers, take common numbers
  let commonNumsToKeep = Math.min(common.size, (limit - uniqueNums1) + (limit - uniqueNums2));
  return uniqueNums1 + uniqueNums2 + commonNumsToKeep;
};

// Three test cases
console.log(maximumSetSize([1,2,1,2], [1,1,1,1])) // 2
console.log(maximumSetSize([1,2,3,4,5,6], [2,3,2,3,2,3])) // 5
console.log(maximumSetSize([1,1,2,2,3,3], [4,4,5,5,6,6])) // 6