// 624. Maximum Distance in Arrays
// You are given m arrays, where each array is sorted in ascending order.
// You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.
// Return the maximum distance.


// Solution: Min & Max

// Get the minimum and maximum numbers from each individual array (first and last elements).
// Keep track of the global minimum and maximum numbers from any one of the arrays we have already processed.
// Compare the global min and max against the min and max from the current array we are processing, and return the max difference between global min and current max, or global max and current min.

// m = number of arrays, n = max length of arrays[i]
// Time Complexity: O(mn) 126ms
// Space Complexity: O(1) 67.9MB
function maxDistance(arrays) {
  let min = arrays[0][0], max = arrays[0][arrays[0].length - 1];
  let maxDist = 0;
  for (let i = 1; i < arrays.length; i++) {
    let currMin = arrays[i][0], currMax = arrays[i][arrays[i].length - 1];
    maxDist = Math.max(maxDist, Math.abs(max - currMin), Math.abs(currMax - min));
    min = Math.min(min, currMin);
    max = Math.max(max, currMax);
  }
  return maxDist;
};

// Four test cases
console.log(maxDistance([[1,2,3],[4,5],[1,2,3]])) // 4
console.log(maxDistance([[1],[1]])) // 0
console.log(maxDistance([[1],[2]])) // 1
console.log(maxDistance([[1,4],[0,5]])) // 4