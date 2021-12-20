// 2111. Minimum Operations to Make the Array K-Increasing
// You are given a 0-indexed array arr consisting of n positive integers, and a positive integer k.
// The array arr is called K-increasing if arr[i-k] <= arr[i] holds for every index i, where k <= i <= n-1.
  // For example, arr = [4, 1, 5, 2, 6, 2] is K-increasing for k = 2 because:
    // arr[0] <= arr[2] (4 <= 5)
    // arr[1] <= arr[3] (1 <= 2)
    // arr[2] <= arr[4] (5 <= 6)
    // arr[3] <= arr[5] (2 <= 2)
// However, the same arr is not K-increasing for k = 1 (because arr[0] > arr[1]) or k = 3 (because arr[0] > arr[3]).
// In one operation, you can choose an index i and change arr[i] into any positive integer.
// Return the minimum number of operations required to make the array K-increasing for the given k.


// Solution: Longest Increasing Subsequence 

// Each array consists of k number of arrays which need to be in non-decreasing order.
// e.g: 
// [5,4,3,2,1], k = 1 : [5,4,3,2,1]
// [5,4,3,2,1], k = 2 : [5,3,1], [4,2]
// [5,4,3,2,1], k = 3 : [5,2], [4,1], [3]

// we only need to worry about the minimum operations to make each array non-decreasing.
// we can use the binary search algorithm for finding the longest non-decreasing subsequence.
// each subarray takes subarray.length - length of longest non-decreasing subsequence operations to change it to be non-decreasing.

// Time Complexity: O(k * n/k * log(n/k)) 132ms
// Space Complexity: O(n/k) 59.9MB
var kIncreasing = function(arr, k) {
  let ans = 0;  
  for (var i = 0; i < k; i++) {
    let kArr = [];
    for (var j = i; j < arr.length; j += k) {
      kArr.push(arr[j]);
    }
    ans += kArr.length - longestNonDecreasingSubsequence(kArr);
  }
  return ans;

  function longestNonDecreasingSubsequence(arr) { // 
    let seq = [];
    for (var num of arr) {
      if (!seq.length || seq[seq.length - 1] <= num) seq.push(num);
      else {
        let idx = search(seq, num);
        seq[idx] = num;
      }
    }
    return seq.length;
  }

  function search(arr, target) { // find first position bigger than target
    let low = 0, high = arr.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] <= target) low = mid + 1;
      else high = mid;
    }
    return low;
  }
};

// Three test cases to run function on
console.log(kIncreasing([5,4,3,2,1], 1)) // 4
console.log(kIncreasing([4,1,5,2,6,2], 2)) // 0
console.log(kIncreasing([4,1,5,2,6,2], 3)) // 2
