// 3480. Maximize Subarrays After Removing One Conflicting Pair
// You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.
// Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].
// Return the maximum number of subarrays possible after removing exactly one conflicting pair.


// Solution: Greedy

// Count the number of subarrays that don't contain any conflicting pairs:
  // For every end index, record an array of start indices of conflicting pairs: start[i] = start indices of conflicting pairs ending at index i.
  // Go through every end index from left to right, and keep track of the running maximum start index of a conflicting pair.
  // For each end index i, the number of valid subarrays = i - max start index of conflicting pair.
  // e.g. [1,2,3,4,5], conflicting pairs = [[2,3],[1,4]]
    //          0  1  2   3   4  5
    // start = [[],[],[],[2],[1],[]]
    // i = 1: max start index = 0, subarrays = 1 - 0 = 1 ([1])
    // i = 2: max start index = 0, subarrays = 2 - 0 = 2 ([2],[1,2])
    // i = 3: max start index = 2, subarrays = 3 - 2 = 1 ([3])
      // [2,3] is a conflicting pair, hence the maximum subarray start index is 3 from now on.
    // i = 4: max start index = 2, subarrays = 4 - 2 = 2 ([4],[3,4])
    // i = 5: max start index = 2, subarrays = 5 - 2 = 3 ([5],[4,5],[3,4,5])

// Count the number of subarrays each conflicting pair would contribute if removed:
  // At every end index i, count the number of subarrays each conflicting pair contributes to: max start index - second max start index.
  // max start index - second max start index gives us the count of subarrays ending at index i, that would include both elements of the conflicting pair in the same subarray.
  // e.g. [1,2,3,4,5], conflicting pairs = [[2,3],[1,4],[3,4]]
    //          0  1  2   3   4  5
    // start = [[],[],[],[2],[1,3],[]]
    // i = 3: 
      // max start index = 2, second max start index = 0
      // subarrays if [2,3] pair was removed = max start index - second max start index = 2 - 0 = 2
        // subarrays if [2,3] conflict is removed: [[3,2],[3,2,1]]
    // i = 4: 
      // max start index = 3, second max index = 2
      // subarrays if [3,4] was removed = 3 - 2 = 1
        // subarrays if [3,4] conflict is removed: [[4,3]]
  // Once we get a larger maximum start index, the old maximum start index will no longer contribute any more subarrays, 
  // because any new subarrays ending at future indices would be blocked by the new conflicting pair with a larger start index.

// n = length of nums, m = number of conflicting pairs
// Time Complexity: O(n + m) 417ms
// Space Complexity: O(n) 133.5MB
function maxSubarrays(n, conflictingPairs) {
  const startIndices = Array(n + 1).fill(0).map(() => []);
  for (let [start, end] of conflictingPairs) {
    startIndices[Math.max(start, end)].push(Math.min(start, end));
  }
  let maxStartIndex = 0, secondMaxStartIndex = 0;
  let nonConflictingSubarrays = 0, conflictingSubarrays = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let start of startIndices[i]) {
      if (start > maxStartIndex) {
        secondMaxStartIndex = maxStartIndex;
        maxStartIndex = start;
      } else if (start >= secondMaxStartIndex) {
        secondMaxStartIndex = start;
      }
    }
    nonConflictingSubarrays += i - maxStartIndex; // non-conflicting subarrays ending at index i
    conflictingSubarrays[maxStartIndex] += maxStartIndex - secondMaxStartIndex;
  }
  return nonConflictingSubarrays + Math.max(...conflictingSubarrays);
};

// Two test cases
console.log(maxSubarrays(4, [[2,3],[1,4]])) // 9
console.log(maxSubarrays(5, [[1,2],[2,5],[3,5]])) // 12