// 2090. K Radius Subarray Averages
// You are given a 0-indexed array nums of n integers, and an integer k.
// The k-radius average for a subarray of nums centered at some index i with the radius k is the average of all elements in nums between the indices i - k and i + k (inclusive). If there are less than k elements before or after the index i, then the k-radius average is -1.
// Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.


// Solution: Sliding Window

// The length of the window will be k * 2 + 1 (the pivot, and 2 sides of length k)
// Fill the result array with -1's.
// Loop through from 0 to k * 2 + 1 and get the sum of the numbers.
// Loop through from k to nums.length - k, move the window to the right on each iteration.

// Time Complexity: O(n) 561ms
// Space Complexity: O(1) (not including output) 87.6MB
var getAverages = function(nums, k) {
  // get first k numbers, then start at index k, move window
  let sum = 0, res = Array(nums.length).fill(-1);
  let len = k * 2 + 1;
  for (var i = 0; i < len; i++) {
    sum += nums[i];
  }  
  for (i = k; i < nums.length - k; i++) {
    let avg = Math.floor(sum / len);
    res[i] = avg; 
    let prev = i - k >= 0 ? nums[i - k] : 0;
    let after = i + k + 1 < nums.length ? nums[i + k + 1] : 0;
    sum -= prev; // subtract leftmost number in window from sum
    sum += after; // add the new number to the sum
  }
  return res;
};

// Three test cases to run function on
console.log(getAverages([7,4,3,9,1,8,5,2,6], 3)) // [-1,-1,-1,5,4,4,-1,-1,-1]
console.log(getAverages([100000], 0)) // [100000]
console.log(getAverages([8], 100000)) // [-1]