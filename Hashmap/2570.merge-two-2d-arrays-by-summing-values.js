// 2570. Merge Two 2D Arrays by Summing Values
// You are given two 2D integer arrays nums1 and nums2.
  // nums1[i] = [id[i], val[i]] indicate that the number with the id id[i] has a value equal to val[i].
  // nums2[i] = [id[i], val[i]] indicate that the number with the id id[i] has a value equal to val[i].
// Each array contains unique ids and is sorted in ascending order by id.
// Merge the two arrays into one array that is sorted in ascending order by id, respecting the following conditions:
  // Only ids that appear in at least one of the two arrays should be included in the resulting array.
  // Each id should be included only once and its value should be the sum of the values of this id in the two arrays. If the id does not exist in one of the two arrays then its value in that array is considered to be 0.
// Return the resulting array. The returned array must be sorted in ascending order by id.


// Solution: Hashmap 

// Store the sum of the values in a hashmap.
// Return the entries of the hashmap sorted by id.

// n = length of nums1, m = length of nums2
// Time Complexity: O((n + m) log(n + m)) 76ms
// Space Complexity: O(n + m) 46.5MB
var mergeArrays = function(nums1, nums2) {
  let map = new Map();
  for (let [id, val] of nums1) {
    map.set(id, val);
  }
  for (let [id, val] of nums2) {
    map.set(id, (map.get(id) || 0) + val);
  }
  return [...map].sort((a, b) => a[0] - b[0]);
};

// Two test cases
console.log(mergeArrays([[1,2],[2,3],[4,5]], [[1,4],[3,2],[4,1]])) // [[1,6],[2,3],[3,2],[4,6]]
console.log(mergeArrays([[2,4],[3,6],[5,5]], [[1,3],[4,3]])) // [[1,3],[2,4],[3,6],[4,3],[5,5]]