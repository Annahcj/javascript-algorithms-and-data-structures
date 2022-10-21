// 220. Contains Duplicate III
// You are given an integer array nums and two integers indexDiff and valueDiff.
// Find a pair of indices (i, j) such that:
  // i != j,
  // abs(i - j) <= indexDiff.
  // abs(nums[i] - nums[j]) <= valueDiff, and
// Return true if such pair exists or false otherwise.


// Solution: Buckets

// Put nums into buckets so that the maximum difference for numbers in each bucket is no more than valueDiff.
  // Place each nums[i] in bucket nums[i] / (valueDiff + 1).
  // Offset each nums[i] by the minimum negative number.
// Maintain a sliding window of size indexDiff, remove nums[i - indexDiff] from the bucket as we move through nums.

// We find a pair when:
  // 1. There are two numbers in the same bucket.
  // 2. There is a number in the previous neighbor bucket with a value difference within valueDiff.
  // 3. There is a number in the next neighbor bucket with a value difference within valueDiff.

// Each bucket will only ever have one number inside at a time because once we find a number in the same bucket, we have found a pair and will return.

// n = length of nums, k = indexDiff
// Time Complexity: O(n) 115ms
// Space Complexity: O(k) 54.3MB
var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
  let minNum = nums.reduce((min, num) => Math.min(min, num), 0);
  let offset = -minNum; // add offset to each number to deal with negatives
  let n = nums.length, buckets = new Map();
  for (let i = 0; i < n; i++) {
    let num = nums[i] + offset;
    let bucket = Math.floor(num / (valueDiff + 1));
    if (buckets.has(bucket)) return true;
    if (buckets.has(bucket - 1) && Math.abs(buckets.get(bucket - 1) - num) <= valueDiff) return true;
    if (buckets.has(bucket + 1) && Math.abs(buckets.get(bucket + 1) - num) <= valueDiff) return true;
    buckets.set(bucket, num);
    
    let numToRemove = nums[i - indexDiff] + offset;
    let bucketToRemove = Math.floor(numToRemove / (valueDiff + 1));
    buckets.delete(bucketToRemove);
  }
  return false;
};

// Two test cases
console.log(containsNearbyAlmostDuplicate([1,2,3,1], 3, 0)) // true
console.log(containsNearbyAlmostDuplicate([1,5,9,1,5,9], 2, 3)) // false