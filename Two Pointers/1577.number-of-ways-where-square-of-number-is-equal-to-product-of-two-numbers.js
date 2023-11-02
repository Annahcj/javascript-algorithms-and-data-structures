// 1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers
// Given two arrays of integers nums1 and nums2, return the number of triplets formed (type 1 and type 2) under the following rules:
  // Type 1: Triplet (i, j, k) if nums1[i]2 == nums2[j] * nums2[k] where 0 <= i < nums1.length and 0 <= j < k < nums2.length.
  // Type 2: Triplet (i, j, k) if nums2[i]2 == nums1[j] * nums1[k] where 0 <= i < nums2.length and 0 <= j < k < nums1.length.


// Solution 1: Hashmap

// This approach is similar to the two sum problem.
// We use a hashmap to keep track of the frequencies of past numbers.
// Count the number of target / nums2[j] in the hashmap.

// n = length of nums1, m = length of nums2
// Time Complexity: O(nm) 498ms
// Space Complexity: O(n + m) 48.3MB
var numTriplets = function(nums1, nums2) {
  return getTriplets(nums1, nums2) + getTriplets(nums2, nums1);
  
  function getTriplets(nums1, nums2) {
    let ans = 0;
    for (let i = 0; i < nums1.length; i++) {
      let target = nums1[i] * nums1[i], map = new Map();
      for (let j = 0; j < nums2.length; j++) {
        ans += map.get(target / nums2[j]) || 0;
        map.set(nums2[j], (map.get(nums2[j]) || 0) + 1);
      }
    }
    return ans;
  }
};


// Solution 2: Three Pointers

// 1. Sort both arrays. This is so that we can use two pointers to calculate the pairs.
// 2. For each nums1[i] 
  // Use two pointers (start = 0, end = n - 1) in nums2
  // Count the number of pairs where nums2[j] * nums2[k] === nums1[i] * nums1[i]
  // There are two special cases to consider:

    // Case 1. nums2[j] !== nums2[k].
      // An array like [1,1,3,3]. 
      // Count the number of repeated nums2[j] and repeated nums2[k].
      // Multiply the two counts together to get the number of combinations.

    // Case 2. [nums2[j], ..., nums2[k]] are all equal
      // e.g: [1,1,1,1,1]
      // For each nums2[j], we can pair it with any number on the right.
      // For the above example this would be: 4 + 3 + 2 + 1
      // Use the formula n(n-1)/2 to calculate the sum of 1 + 2 + 3 + ... + n-1

// Time Complexity: O(nm + n log(n) + m log(m)) 153ms
// Space Complexity: O(log(n) + log(m)) (space for sorting) 43.1MB
var numTriplets = function(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  return calc(nums1, nums2) + calc(nums2, nums1);
  
  function calc(nums1, nums2) {
    let ans = 0;
    for (let i = 0; i < nums1.length; i++) {
      let target = nums1[i] * nums1[i];
      let j = 0, k = nums2.length - 1;
      while (j < k) {
        if (nums2[j] * nums2[k] === target) {
          if (nums2[j] === nums2[k]) { // case 2: [nums2[j], ..., nums2[k]] are all equal
            ans += (k - j) * (k - j + 1) / 2;
            j = k;
          } else { // case 1: nums2[j] !== nums2[k]
            let left = j, right = k;
            while (j < k && nums2[j] === nums2[left]) j++;
            while (k >= 0 && nums2[k] === nums2[right]) k--;
            ans += (j - left) * (right - k);
          }
        }
        else if (nums2[j] * nums2[k] < target) j++;
        else k--;
      }
    }
    return ans;
  }
};

// Three test cases
console.log(numTriplets([7,4], [5,2,8,9])) // 1
console.log(numTriplets([1,1], [1,1,1])) // 9
console.log(numTriplets([7,7,8,3], [1,2,9,7])) // 2