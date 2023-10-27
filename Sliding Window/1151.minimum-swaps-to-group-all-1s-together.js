// 1151. Minimum Swaps to Group All 1's Together
// Given a binary array data, return the minimum number of swaps required to group all 1’s present in the array together in any place in the array.


// Solution: Sliding Window

// 1. Count total number of ones 
// 2. Using a sliding window of length (total number of ones), find the most number of ones in a window.
  // If there needs to be 3 ones, and a window has 2 ones, that means we just need to swap 1 to group them together: total ones - running count

// Time Complexity: O(n) 91ms
// Space Complexity: O(1) 49.8MB
var minSwaps = function(data) {
  let i = 0, ans = Infinity;
  let ones = 0;
  for (let bin of data) ones += bin; // count number of ones

  let cnt = 0;
  for (let j = 0; j < data.length; j++) {
    cnt += data[j];
    if (j >= ones) cnt -= data[i++]; // slide window up
    ans = Math.min(ans, ones - cnt);
  }
  return ans;
};

// Three test cases 
console.log(minSwaps([1,0,1,0,1])) // 1
console.log(minSwaps([0,0,0,1,0])) // 0
console.log(minSwaps([1,0,1,0,1,0,0,1,1,0,1])) // 3