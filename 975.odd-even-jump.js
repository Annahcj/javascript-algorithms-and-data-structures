// 975. Odd Even Jump
// You are given an integer array arr. From some starting index, you can make a series of jumps. The (1st, 3rd, 5th, ...) jumps in the series are called odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps in the series are called even-numbered jumps. Note that the jumps are numbered, not the indices.
// You may jump forward from index i to index j (with i < j) in the following way:
  // During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the index j such that arr[i] <= arr[j] and arr[j] is the smallest possible value. If there are multiple such indices j, you can only jump to the smallest such index j.
  // During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the index j such that arr[i] >= arr[j] and arr[j] is the largest possible value. If there are multiple such indices j, you can only jump to the smallest such index j.
  // It may be the case that for some index i, there are no legal jumps.
// A starting index is good if, starting from that index, you can reach the end of the array (index arr.length - 1) by jumping some number of times (possibly 0 or more than once).
// Return the number of good starting indices.


// Solution: Monotonic Stacks & DP

// In order to find the smallest greater element on the right of each arr[i], we need to sort arr in asc order so that we only deal with numbers that are possible candidates.
// Then, it's a next greatest element problem - for each index i, find the first index on the right that is larger than i.

// Odd jumps (smallest greater element): 
  // Sort arr in asc order by value.
  // Use a monotonic decreasing stack to keep track of elements that haven't found their first greater element yet.
  // Pop elements off the top of the stack while they are smaller than or equal to the current element.
  // arr[i] is the first largest element for each stack[stack.length - 1] that we pop off.

// Even jumps (bigger smaller element):
  // Sort arr in desc order by value.
  // Use a monotonic increasing stack to keep track of elements that haven't found their first smaller element yet.
  // Pop elements off the top of the stack while they are larger than or equal to the current element.
  // arr[i] is the first smaller element for each stack[stack.length - 1] that we pop off.

// Use DP to calculate the number of ways to reach index n - 1 from each starting index.
// dp[i][isOdd] = number of ways to reach index n - 1 starting from index i, and isOdd indicates if we're at an odd or even jump.

// Time Complexity: O(n log(n)) 220ms
// Space Complexity: O(n) 72.2MB
var oddEvenJumps = function(arr) {
  let n = arr.length, nextGreater = Array(n).fill(-1), nextSmaller = Array(n).fill(-1);
  let decStack = [], incStack = [];
  let arrSortedAsc = arr.map((val, i) => [val, i]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  for (let [_val, i] of arrSortedAsc) {
    while (decStack.length && decStack[decStack.length - 1] < i) {
      nextGreater[decStack.pop()] = i;
    }
    decStack.push(i);
  }
  let arrSortedDesc = arr.map((val, i) => [val, i]).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
  for (let [_val, i] of arrSortedDesc) {
    while (incStack.length && incStack[incStack.length - 1] < i) {
      nextSmaller[incStack.pop()] = i;
    }
    incStack.push(i);
  }
 
  let dp = Array(n).fill(0).map(() => Array(2).fill(0)); // dp[i][isOdd] = number of ways to reach index n - 1 from index i
  let goodStartIndices = 1;
  dp[n - 1][0] = 1, dp[n - 1][1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    if (nextGreater[i] !== -1) {
      dp[i][1] = dp[nextGreater[i]][0];
    }
    if (nextSmaller[i] !== -1) {
      dp[i][0] = dp[nextSmaller[i]][1];
    }
    if (dp[i][1] > 0) goodStartIndices++;
  }
  return goodStartIndices;
};

// Two test cases
console.log(oddEvenJumps([10,13,12,14,15])) // 2
console.log(oddEvenJumps([2,3,1,1,4])) // 3