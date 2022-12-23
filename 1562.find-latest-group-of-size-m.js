// 1562. Find Latest Group of Size M
// Given an array arr that represents a permutation of numbers from 1 to n.
// You have a binary string of size n that initially has all its bits set to zero. At each step i (assuming both the binary string and arr are 1-indexed) from 1 to n, the bit at position arr[i] is set to 1.
// You are also given an integer m. Find the latest step at which there exists a group of ones of length m. A group of ones is a contiguous substring of 1's such that it cannot be extended in either direction.
// Return the latest step at which there exists a group of ones of length exactly m. If no such group exists, return -1.


// Solution: Prefix Sum & Hashset

// Record the number of 1's ending and starting at each index i.
  // left[i] = number of consecutive 1's ending at index i
  // right[i] = number of consecutive 1's starting at index i

// For each move, we will either:
  // 1. Create a new group of size m.
  // 2. Remove an existing group that was previously size m, but with the new move will become greater than size m and therefore no longer a size m group.
    // This can be a group starting at index (index - m) or (index + 1).

// Keep track of the starting indexes of each group with size m in a hashset.
// Record the latest index where we have at least one group of size m.

// Time Complexity: O(n) 236ms
// Space Complexity: O(n) 55.5MB
var findLatestStep = function(arr, m) {
  let n = arr.length, groupStartIndexes = new Set();
  let left = Array(n).fill(0), right = Array(n).fill(0);
  let latestStep = -1;
  for (let i = 0; i < n; i++) {
    let index = arr[i] - 1;
    let leftCount = index > 0 ? left[index - 1] : 0;
    let rightCount = index < n - 1 ? right[index + 1] : 0;
    let groupSize = leftCount + rightCount + 1;
    
    // update the counts
    left[index] = leftCount + 1;
    left[index + rightCount] = groupSize;
    right[index] = rightCount + 1;
    right[index - leftCount] = groupSize;

    // remove previously existing m-size groups that will no longer be size m
    groupStartIndexes.delete(index - m);
    groupStartIndexes.delete(index + 1);
    if (groupSize === m) {
      groupStartIndexes.add(index - leftCount);
    }
    if (groupStartIndexes.size >= 1) latestStep = i + 1;
  }
  return latestStep;
};

// Two test cases
console.log(findLatestStep([3,5,1,2,4], 1)) // 4
console.log(findLatestStep([3,1,5,4,2], 2)) // -1