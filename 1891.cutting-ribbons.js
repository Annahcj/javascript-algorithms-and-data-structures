// 1891. Cutting Ribbons
// You are given an integer array ribbons, where ribbons[i] represents the length of the ith ribbon, and an integer k. You may cut any of the ribbons into any number of segments of positive integer lengths, or perform no cuts at all.
  // For example, if you have a ribbon of length 4, you can:
    // Keep the ribbon of length 4,
    // Cut it into one ribbon of length 3 and one ribbon of length 1,
    // Cut it into two ribbons of length 2,
    // Cut it into one ribbon of length 2 and two ribbons of length 1, or
    // Cut it into four ribbons of length 1.
// Your goal is to obtain k ribbons of all the same positive integer length. You are allowed to throw away any excess ribbon as a result of cutting.
// Return the maximum possible positive integer length that you can obtain k ribbons of, or 0 if you cannot obtain k ribbons of the same length.


// Solution: Binary Search

// Set the upper bound to the maximum length of the ribbons.
// Binary search for the maximum length where the total sum of Math.floor(ribbon length / length) is bigger than or equal to k.

// Time Complexity: O(n log(max(ribbons))) 192ms
// Space Complexity: O(1) 54.6MB
var maxLength = function(ribbons, k) {
  let max = Math.max(...ribbons);
  let low = 0, high = max;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function isEnough(length) {
    let total = 0;
    for (let ribbon of ribbons) {
      total += Math.floor(ribbon / length);
    }
    return total >= k;
  }
};
 
// Three test cases to run function on
console.log(maxLength([9,7,5], 3)) // 5
console.log(maxLength([7,5,9], 4)) // 4
console.log(maxLength([5,7,9], 22)) // 0