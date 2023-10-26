// 624. Maximum Distance in Arrays
// You are given m arrays, where each array is sorted in ascending order.
// You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.
// Return the maximum distance.


// Solution: Keep Min & Max

// Keep track of the previous min and max numbers
// (Since the arrays are sorted, we only have to take the first (min) and last (max) elements)

// Try to find the largest distance:
  // 1. current last element - previous min
  // 2. previous max - current first element
// Then update the min and max is necessary

// Time Complexity: O(n) 164ms
// Space Complexity: O(1) 59MB
var maxDistance = function(arrays) {
  let min = arrays[0][0], max = arrays[0][arrays[0].length - 1];
  let ans = 0;
  for (var i = 1; i < arrays.length; i++) {
    ans = Math.max(ans, arrays[i][arrays[i].length - 1] - min, max - arrays[i][0]);
    min = Math.min(min, arrays[i][0]);
    max = Math.max(max, arrays[i][arrays[i].length - 1]);
  }  
  return ans;
};

// Four test cases to run function on
console.log(maxDistance([[1,2,3],[4,5],[1,2,3]])) // 4
console.log(maxDistance([[1],[1]])) // 0
console.log(maxDistance([[1],[2]])) // 1
console.log(maxDistance([[1,4],[0,5]])) // 4