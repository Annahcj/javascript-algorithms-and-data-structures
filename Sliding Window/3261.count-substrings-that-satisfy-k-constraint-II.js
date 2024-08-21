// 3261. Count Substrings That Satisfy K-Constraint II
// You are given a binary string s and an integer k.
// You are also given a 2D integer array queries, where queries[i] = [li, ri].
// A binary string satisfies the k-constraint if either of the following conditions holds:
  // The number of 0's in the string is at most k.
  // The number of 1's in the string is at most k.
// Return an integer array answer, where answer[i] is the number of substrings of s[li..ri] that satisfy the k-constraint.


// Solution: Sliding Window & Prefix Sum

// Use a sliding window to find the leftmost index of a valid substring ending at each index j.
// Use another sliding window to find the rightmost index for a valid substring for each left index i.
// Prefix sum the substring counts ending at each index.

// For each query [l, r], 
  // Find the leftmost index j within the range (l, r) where the left index of the substring ending at index j is greater than or equal to l.
  // Take all substrings ending at indices in the range (j, r). This is because the left substring indices for this range of indices is guaranteed to be greater than or equal to l.
  // For all indices left of index j, take all substrings that start no lefter than l.

//           012 345678 9
// e.g. s = "000_101100_1", k = 2, queries = [[3,8]]
// rightmost     789999
// leftmost      000234

// 1. The leftmost end index j within the range (l, r) where the left index of the substring ending at index j is greater than or equal to l = 7
// 2. Take all substrings ending at an index in the range (7, 8) = 10
  // Ending at index 7: 5 substrings
  // Ending at index 8: 5 substrings
// 3. For all end indices to the left of j, take all substrings that start no lefter than l: 10
  // Ending at index 3: 1
  // Ending at index 4: 2
  // Ending at index 5: 3
  // Ending at index 6: 4
// The answer to the query [3, 8] = 20

// Time Complexity: O(n log(n)) 387ms
// Space Complexity: O(n) 90.8MB
function countKConstraintSubstrings(s, k, queries) {
  let n = s.length, leftmost = Array(n);
  let ones = 0, zeros = 0;
  let leftmostSubstringSum = Array(n + 1).fill(0);
  for (let j = 0, i = 0; j < n; j++) {
    ones += s[j] === '1' ? 1 : 0;
    zeros += s[j] === '0' ? 1 : 0;
    while (ones > k && zeros > k) {
      ones -= s[i] === '1' ? 1 : 0;
      zeros -= s[i] === '0' ? 1 : 0;
      i++;
    }
    leftmost[j] = i;
    leftmostSubstringSum[j + 1] = leftmostSubstringSum[j] + (j - leftmost[j] + 1);
  }
  let rightmost = Array(n);
  ones = 0, zeros = 0;
  for (let i = n - 1, j = n - 1; i >= 0; i--) {
    ones += s[i] === '1' ? 1 : 0;
    zeros += s[i] === '0' ? 1 : 0;
    while (ones > k && zeros > k) {
      ones -= s[j] === '1' ? 1 : 0;
      zeros -= s[j] === '0' ? 1 : 0;
      j--;
    }
    rightmost[i] = j;
  }
  
  let ans = [];
  for (let [l, r] of queries) {
    // leftmost end index within the range (l, r) where the left index of the substring ending at this index is greater than or equal to l
    let leftmostIndexWithinRange = binarySearch(l, r);
    // amount of end indices where the leftmost substring index lies outside of the range
    let endIndicesOutsideRange = leftmostIndexWithinRange - l;
    let substringsWithinRange = leftmostSubstringSum[r + 1] - leftmostSubstringSum[leftmostIndexWithinRange];
    let totalSubstrings = (endIndicesOutsideRange * (endIndicesOutsideRange + 1) / 2) + substringsWithinRange;
    ans.push(totalSubstrings);
  }
  return ans;
  
  // find the leftmost index in range [l, r] where leftmost[j] >= l
  function binarySearch(l, r) {
    let low = l, high = r;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (leftmost[mid] >= l) high = mid;
      else low = mid + 1;
    }
    return leftmost[low] >= l ? low : r + 1;
  }
};

// Two test cases
console.log(countKConstraintSubstrings("0001111", 2, [[0,6]])) // [26]
console.log(countKConstraintSubstrings("010101", 1, [[0,5],[1,4],[2,3]])) // [15,9,3]