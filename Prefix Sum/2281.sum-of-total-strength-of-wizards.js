// 2281. Sum of Total Strength of Wizards
// As the ruler of a kingdom, you have an army of wizards at your command.
// You are given a 0-indexed integer array strength, where strength[i] denotes the strength of the ith wizard. For a contiguous group of wizards (i.e. the wizards' strengths form a subarray of strength), the total strength is defined as the product of the following two values:
  // The strength of the weakest wizard in the group.
  // The total of all the individual strengths of the wizards in the group.
// Return the sum of the total strengths of all contiguous groups of wizards. Since the answer may be very large, return it modulo 10^9 + 7.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Monotonic Stack & Prefix Sum

// Weakest strength in the group:
  // Use a monotonic increasing stack to keep track of the strengths.
  // Two passes - find the index of the first weaker strength on the left and right of each strength[i].
  // Remove any stronger strengths from the top of the stack, for the right side remove equal strengths too.

// The total of all individual strengths of strengths in the group:
  // Use prefix sum and prefix subarrays sum to find the to find the total sum of all subarrays in the range (left, right) for each strength[i].
  // e.g: strength = [1,5,4,2,3]
    // i = 3: left = 1, right = 4
      //    l    i   r
      // [1,5,4,_2_,3]
      // left subarrays ending at index i:
        //       [2]
        //     [4,2]
        //   [5,4,2]
        // [1,5,4,2]
        //  1 2 3 4 (occurances of each strength[i] in the subarrays sum).
        // subarraySumLeft = [1,11,23,31]
        // To get the subarrays sum in range (1,3): (subarraySumLeft[3] - subarraySumLeft[0]) - (pSum[3] - pSum[0]) * 1.
          // (subarraySumLeft[3] - subarraySumLeft[0]): Removes the subarray sums from index 0, leaving [[2],[4,2],[5,4,2],[5,4,2]]
          // (pSum[3] - pSum[0]): [5,4,2] is included in the subarray sum an extra `left` number of times. Subtract those duplicate subarrays.
    // Once we get the left subarrays sum, count the total number of subarrays that include the left subarrays (each subarray can end at index i to index right): leftSubarraysSum * (right - i + 1)
    // For the right side, the concept is the same but from right to left.

// n = length of strength
// Time Complexity: O(n) 706ms
// Space Complexity: O(n) 95.5MB
var totalStrength = function(strength) {
  let n = strength.length, stack = [];
  // monotonic stack to find the indices of the first smaller number on the left of each strength[i]
  let weakerLeft = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    while (stack.length && strength[stack[stack.length - 1]] > strength[i]) stack.pop();
    if (stack.length) {
      weakerLeft[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  // monotonic stack to find the indices of the first smaller number on the left of each strength[i]
  let weakerRight = Array(n).fill(n);
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && strength[stack[stack.length - 1]] >= strength[i]) stack.pop();
    if (stack.length) {
      weakerRight[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  
  // prefix sum for calculating range sum and range subarray sum
  // range subarray sum: sum of all subarray sums 
  let pSum = [0, ...strength].map(BigInt);
  for (let i = 1; i <= n; i++) pSum[i] += pSum[i - 1];
  let subarraySumLeft = Array(n + 1).fill(0n);
  for (let i = 1; i <= n; i++) {
    subarraySumLeft[i] = subarraySumLeft[i - 1] + BigInt(strength[i - 1]) * BigInt(i);
  }
  let subarraySumRight = Array(n + 1).fill(0n);
  for (let i = n - 1; i >= 0; i--) {
    subarraySumRight[i] = subarraySumRight[i + 1] + BigInt(strength[i]) * BigInt(n - i);
  }

  let ans = 0n, MOD = 1000000007n;
  for (let i = 0; i < n; i++) {
    let left = weakerLeft[i] + 1;
    let right = weakerRight[i] - 1;

    // sum of all subarrays in the range (left, i)
    // subarraySumLeft[i + 1] - subarraySumLeft[left] includes occurances of each number in the range (left, i) an extra `left` number of times. subtract those multiples of times to exclude duplicates
    let leftSubarraysSum = (subarraySumLeft[i + 1] - subarraySumLeft[left]) - (pSum[i + 1] - pSum[left]) * BigInt(left);
    // contributions of leftSubarraysSum in all subarrays ending at indices in range (i, right)
    let leftSum = leftSubarraysSum * BigInt(right - i + 1);

    // sum of all subarrays in the range (i + 1, right)
    // (subarraySumRight[i + 1] - subarraySumRight[right + 1]) includes occurances of each number in the range (i, right) an extra `n - right - 1` number of times. subtract those multiples of times to exclude duplicates
    let rightSubarraysSum = (subarraySumRight[i + 1] - subarraySumRight[right + 1]) - (pSum[right + 1] - pSum[i + 1]) * BigInt(n - right - 1);
    // contributions of rightSubarraysSum in all subarrays starting at indices in range (left, i)
    let rightSum = rightSubarraysSum * BigInt(i - left + 1);
    let totalSum = ((leftSum + rightSum) * BigInt(strength[i])) % MOD;
    ans = (ans + totalSum) % MOD;
  }
  return ans;
};

// Two test cases
console.log(totalStrength([1,3,1,2])) // 44
console.log(totalStrength([5,4,6])) // 213