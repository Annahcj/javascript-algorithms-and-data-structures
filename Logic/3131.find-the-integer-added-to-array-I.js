// 3131. Find the Integer Added to Array I
// You are given two arrays of equal length, nums1 and nums2.
// Each element in nums1 has been increased (or decreased in the case of negative) by an integer, represented by the variable x.
// As a result, nums1 becomes equal to nums2. Two arrays are considered equal when they contain the same integers with the same frequencies.
// Return the integer x.


// Solution: Diff of Minimums

// Since it is guaranteed that nums1 is equal to nums2 after adding or subtracting some number from every element, we only need to compare one pair of elements.
// Get the minimum from nums1 and minimum from nums2 and return the difference.

// Time Complexity: O(n) 53ms
// Space Complexity: O(1) 50.7MB
const addedInteger = (nums1, nums2) => {
  return Math.min(...nums2) - Math.min(...nums1);
};

// Three test cases
console.log(addedInteger([2,6,4], [9,7,5])) // 3
console.log(addedInteger([10], [5])) // -5
console.log(addedInteger([1,1,1,1], [1,1,1,1])) // 0