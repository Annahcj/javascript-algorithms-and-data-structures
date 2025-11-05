// 3318. Find X-Sum of All K-Long Subarrays I
// You are given an array nums of n integers and two integers k and x.
// The x-sum of an array is calculated by the following procedure:
  // Count the occurrences of all elements in the array.
  // Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
  // Calculate the sum of the resulting array.
// Note that if an array has less than x distinct elements, its x-sum is the sum of the array.
// Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].


// Solution: Brute Force

// n = length of nums, m = max(nums[i])
// Time Complexity: O(nk) 15ms
// Space Complexity: O(m) 63MB
function findXSum(nums, k, x) {
  const n = nums.length, ans = Array(n - k + 1).fill(0);
  for (let i = 0; i <= n - k; i++) {
    const count = {};
    for (let j = i; j < i + k; j++) {
      count[nums[j]] = (count[nums[j]] || 0) + 1;
    }
    const sortedCounts = Object.entries(count).sort((a, b) => a[1] === b[1] ? b[0] - a[0] : b[1] - a[1]);
    for (let j = 0; j < Math.min(x, sortedCounts.length); j++) {
      ans[i] += sortedCounts[j][0] * sortedCounts[j][1];
    }
  }
  return ans;
};

// Two test cases
console.log(findXSum([1,1,2,2,3,4,2,3], 6, 2)) // [6,10,12]
console.log(findXSum([3,8,7,8,7,5], 2, 2)) // [11,15,15,15,12]