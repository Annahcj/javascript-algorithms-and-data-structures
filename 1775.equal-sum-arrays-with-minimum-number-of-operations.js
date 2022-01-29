// 1775. Equal Sum Arrays With Minimum Number of Operations
// ou are given two arrays of integers nums1 and nums2, possibly of different lengths. The values in the arrays are between 1 and 6, inclusive.
// In one operation, you can change any integer's value in any of the arrays to any value between 1 and 6, inclusive.
// Return the minimum number of operations required to make the sum of values in nums1 equal to the sum of values in nums2. Return -1​​​​​ if it is not possible to make the sum of the two arrays equal.


// Solution: Greedy w/ Sorting

// 1. Get the sum of nums1 and nums2.
// 2. Collect all the 'changes' (the difference it would make towards the overall difference) from nums1 and nums2.
  // If sum1 > sum2: 
    // diff for num in nums1 = num - 1 
    // diff for num in nums2 = 6 - num
  // If sum1 < sum2:
    // diff for num in nums1 = 6 - num
    // diff for num in nums2 = num - 1
// 3. Sort the changes in descending order.
// 4. Reduce the overall diff by closing the gap with the changes. Stop when the overall diff is 0 or under.
// If the diff is still above 0 after the iteration is finished, return -1, otherwise return the number of iterations of the loop.

// Time Complexity: O((n + m) log(n + m)) 279ms
// Space Complexity: O(n + m) 70.7MB
var minOperations = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let sum1 = 0, sum2 = 0;
  for (var i = 0; i < n; i++) sum1 += nums1[i];
  for (var j = 0; j < m; j++) sum2 += nums2[j];
  
  let changes = [];
  for (i = 0; i < n; i++) {
    let num = nums1[i], diff = sum1 > sum2 ? num - 1 : 6 - num;
    changes.push(diff);
  }
  for (j = 0; j < m; j++) {
    let num = nums2[j], diff = sum1 > sum2 ? 6 - num : num - 1;
    changes.push(diff);
  }

  changes.sort((a, b) => b - a);
  
  let diff = Math.abs(sum1 - sum2), ans = 0;
  i = 0;
  while (i < changes.length && diff > 0) {
    diff -= changes[i++];
    ans++;
  }
  return diff > 0 ? -1 : ans;
};

// Three test cases to run function on
console.log(minOperations([1,2,3,4,5,6], [1,1,2,2,2,2])) // 3
console.log(minOperations([1,1,1,1,1,1,1], [6])) // -1
console.log(minOperations([6,6], [1])) // 3