// 3748. Count Stable Subarrays
// You are given an integer array nums.
// A subarray of nums is called stable if it contains no inversions, i.e., there is no pair of indices i < j such that nums[i] > nums[j].
// You are also given a 2D integer array queries of length q, where each queries[i] = [li, ri] represents a query. For each query [li, ri], compute the number of stable subarrays that lie entirely within the segment nums[li..ri].
// Return an integer array ans of length q, where ans[i] is the answer to the ith query.​​​​​​​​​​​​​​
// Note: A single element subarray is considered stable.


// Solution: Prefix Sum & Binary Search

// Iterate through nums and keep track of the running count of the current non-decreasing subarray.
// Store the start and end indices of each non-decreasing subarray.
// Store the prefix sum of each subarray length,
  // e.g. [1,2,3,4,5,1,2] -> [1,3,6,10,15,16,17]

// For each query (l, r),
  // Binary search for the leftmost subarray indices where the end index >= l.
  // Calculate the overlap of how many subarrays are within (l, r) from the binary searched subarray: (subarray end index - l + 1) + (subarray end index - l) + (subarray end index - l - 1)...
  // For the remaining part of the query, use the prefix sum to calculate the sum of the subarrays between the end index of the subarray from the binary search and r.

// n = length of nums, m = number of queries
// Time Complexity: O(n + m log(n)) 127ms
// Space Complexity: O(n) 103MB
function countStableSubarrays(nums, queries) {
  const n = nums.length, pSum = Array(n).fill(1);
  const subarrays = [];
  let consecCount = 1, startIndex = 0;
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) {
      subarrays.push([startIndex, i - 1]);
      consecCount = 1;
      startIndex = i;
    } else {
      consecCount++;
    }
    pSum[i] = pSum[i - 1] + consecCount;
  }
  subarrays.push([startIndex, n - 1]);

  const m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    const [l, r] = queries[i];
    const leftmostOverlappingSubarrayEnd = Math.min(r, findLeftmostOverlapping(l)[1]);
    const leftSubarrays = sumOf1ToN(leftmostOverlappingSubarrayEnd - l + 1);
    const remSubarrays = pSum[r] - pSum[leftmostOverlappingSubarrayEnd];
    ans[i] = leftSubarrays + remSubarrays;
  }
  return ans;

  function findLeftmostOverlapping(minIndex) {
    let low = 0, high = subarrays.length - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      // e.g. [[1,2],[3,4],[5,7],[8,10]]
      // minIndex (l) = 4, need to find [3,4]
      if (subarrays[mid][1] >= minIndex) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return subarrays[low];
  }
};

function sumOf1ToN(n) {
  return n * (n + 1) / 2;
}

// Two test cases
console.log(countStableSubarrays([3,1,2], [[0,1],[1,2],[0,2]])) // [2,3,4]
console.log(countStableSubarrays([2,2], [[0,1],[0,0]])) // [3,1]