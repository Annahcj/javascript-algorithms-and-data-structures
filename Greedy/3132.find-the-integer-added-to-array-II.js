// 3132. Find the Integer Added to Array II
// You are given two integer arrays nums1 and nums2.
// From nums1 two elements have been removed, and all other elements have been increased (or decreased in the case of negative) by an integer, represented by the variable x.
// As a result, nums1 becomes equal to nums2. Two arrays are considered equal when they contain the same integers with the same frequencies.
// Return the minimum possible integer x that achieves this equivalence.


// Solution: Sorting & Greedy

// There are only three possible differences:
  // If we don't remove the first element: nums2[0] - nums1[0]
  // If we remove the first element and not the second: nums2[0] - nums1[1]
  // If we remove both the first and second elements: nums2[0] - nums1[2]

// Sort nums1 and nums2, and greedily check whether each diff is achieveable using two pointers.
// Return the smallest possible diff out of the three options.

// Time Complexity: O(n log(n)) 71ms
// Space Complexity: O(log(n)) (space for sorting) 50.6MB
function minimumAddedInteger(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  
  let diffs = [nums2[0] - nums1[0], nums2[0] - nums1[1], nums2[0] - nums1[2]];
  diffs.sort((a, b) => a - b);
  for (let i = 0; i <= 1; i++) {
    if (canBeEqual(nums1, nums2, diffs[i])) {
      return diffs[i];
    }
  }
  return diffs[2];
};

function canBeEqual(nums1, nums2, x) {
  let j = 0;
  for (let i = 0; i < nums1.length; i++) {
    if (nums2[j] - nums1[i] === x) {
      j++;
    }
    if (j === nums2.length) return true;
  }
  return j === nums2.length;
}

// Two test cases
console.log(minimumAddedInteger([4,20,16,12,8], [14,18,10])) // -2
console.log(minimumAddedInteger([3,5,5,3], [7,7])) // 2