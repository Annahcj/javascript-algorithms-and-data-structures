// 2032. Two Out of Three
// Given three integer arrays nums1, nums2, and nums3, return a distinct array containing all the values that are present in at least two out of the three arrays. You may return the values in any order.
 

// Solution: Hashmaps

// Use three hashmaps to store the unique characters of nums1, nums2, and nums3
// Use another hashmap to store the unique characters across all three num arrays.

// Loop through the unique values and get the numbers that occur across two or more arrays.

// n = nums1.length + nums2.length + nums3.length
// k = unique letters in all three num arrays
// Time Complexity: O(n) 132ms
// Space Complexity: O(k) 44.3MB
var twoOutOfThree = function(nums1, nums2, nums3) {
  let uni1 = {}, uni2 = {}, uni3 = {};
  let uni = {};
  for (let num of nums1) {
    if (!uni1[num]) uni1[num] = true;
    if (!uni[num]) uni[num] = true;
  }
  for (let num of nums2) {
    if (!uni2[num]) uni2[num] = true;
    if (!uni[num]) uni[num] = true;
  }
  for (let num of nums3) {
    if (!uni3[num]) uni3[num] = true;
    if (!uni[num]) uni[num] = true;
  }
  let res = [];
  for (let key in uni) {
    let count = 0;
    if (uni1[key]) count++;
    if (uni2[key]) count++;
    if (uni3[key]) count++;
    if (count > 1) res.push(+key);
  }
  return res;
};

// Three test cases
console.log(twoOutOfThree([1,1,3,2], [2,3], [3])) // [3,2]
console.log(twoOutOfThree([3,1], [2,3], [1,2])) // [2,3,1]
console.log(twoOutOfThree([1,1,2], [4,3,3], [5])) // []