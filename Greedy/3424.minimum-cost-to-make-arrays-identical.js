// 3424. Minimum Cost to Make Arrays Identical
// You are given two integer arrays arr and brr of length n, and an integer k. You can perform the following operations on arr any number of times:
  // Split arr into any number of contiguous subarrays and rearrange these subarrays in any order. This operation has a fixed cost of k.
  // Choose any element in arr and add or subtract a positive integer x to it. The cost of this operation is x.
// Return the minimum total cost to make arr equal to brr.

 
// Solution: Greedy

// The first operation means that we can sort arr in whatever order we like with a cost of k.
// This is because we can split arr into subarrays of size 1 and arrange them in any order.

// Hence, there are two ways to arrange arr:
  // 1. Leave it as it is. Calculate the total absolute difference between arr[i] and brr[i].
  // 2. Sort arr and brr, then calculate the total absolute difference between arr[i] and brr[i].
    // Because we can arrange arr in any order, that effectively means we can sort brr in any order too.
    // It's optimal to sort both arr and brr to get the minimum total cost.

// Take the minimum cost out of the two approaches.

// Time Complexity: O(n log(n)) 270ms
// Space Complexity: O(log(n)) 76.87MB
function minCost(arr, brr, k) {
  const n = arr.length;
  let notSorted = 0;
  for (let i = 0; i < n; i++) {
    notSorted += Math.abs(arr[i] - brr[i]);
  }
  arr.sort((a, b) => a - b);
  brr.sort((a, b) => a - b);
  let sorted = k;
  for (let i = 0; i < n; i++) {
    sorted += Math.abs(arr[i] - brr[i]);
  }
  return Math.min(notSorted, sorted);
};

// Two test cases
console.log(minCost([-7,9,5], [7,-2,-5], 2)) // 13
console.log(minCost([2,1], [2,1], 0)) // 0