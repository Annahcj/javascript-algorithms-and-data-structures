// 454. 4Sum II
// Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:
  // 0 <= i, j, k, l < n
  // nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0


// Solution: Hashmap

// Split the sum into two sides: nums1[i] + nums2[j], nums3[k] + nums4[l] where they sum up to 0.

// 1. Get all -(nums1[i] + nums2[j]) and store them in a hashmap. (since 0 - sum2 = -sum1)
// 2. Get all nums3[k] + nums4[l] and find occurances from the hashmap. Get the total sum of occurances.

// Time Complexity: O(n^2) 184ms
// Space Complexity: O(n^2) 46.1MB 
var fourSumCount = function(nums1, nums2, nums3, nums4) {
  let n = nums1.length, res = 0;
  let map = new Map();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let target = -(nums1[i] + nums2[j]);
      map.set(target, (map.get(target) || 0) + 1);
    }
  }
  for (let k = 0; k < n; k++) {
    for (let l = 0; l < n; l++) {
      let target = nums3[k] + nums4[l];
      let count = map.get(target) || 0;
      res += count;
    }
  }
  return res;
};

// KSum Solution: Hashmap w/ Recursion

// Works for any k (except 1).

// 1. Recursively get the sums for the first Math.ceil(k / 2) nums and add them to a hashmap.
// 2. Recursively get the sums for the remaining nums and count the matches from the hashmap.

// Time Complexity: O(n^k+1/2) 313ms
// Space Complexity: O(n^k+1/2) 46.5MB
var fourSumCount = function(nums1, nums2, nums3, nums4) {
  let k = arguments.length, lists = arguments;
  // add Math.ceil(k / 2) arr's sums to hashmap
  let map = new Map(), ans = 0;
  addToMap(0, Math.ceil(k / 2), []);
  count(Math.ceil(k / 2), Math.floor(k / 2), []);
  return ans;
  
  function addToMap(idx, n, sums) {
    let nums = lists[idx];
    if (n === 1) {
      // base case, add -sum to map
      for (let i = 0; i < sums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
          let target = -(sums[i] + nums[j]);
          map.set(target, (map.get(target) || 0) + 1);
        }
      }
      return;
    } else {
      let res = [];
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < sums.length; j++) {
          let sum = nums[i] + sums[j];
          res.push(sum);
        }
        if (!sums.length) res.push(nums[i]);
      }
      addToMap(idx + 1, n - 1, res);
    }
  }
  
  function count(idx, n, sums) {
    let nums = lists[idx];
    if (n === 1) {
      // base case, count matching sums in map
      for (let i = 0; i < sums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
          let sum = sums[i] + nums[j];
          ans += map.get(sum) || 0;
        }
      }
      return;
    } else {
      let res = [];
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < sums.length; j++) {
          let sum = nums[i] + sums[j];
          res.push(sum);
        }
        if (!sums.length) res.push(nums[i]);
      }
      count(idx + 1, n - 1, res);
    }
  }
};

// Two test cases to run function on
console.log(fourSumCount([1,2], [-2,-1], [-1,2], [0,2], [0,0])) // 2
console.log(fourSumCount([0], [0], [0], [0])) // 1