// 2657. Find the Prefix Common Array of Two Arrays
// You are given two 0-indexed integer permutations A and B of length n.
// A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.
// Return the prefix common array of A and B.
// A sequence of n integers is called a permutation if it contains all integers from 1 to n exactly once.


// Solution: Hashmap

// Use a hashmap to keep track of the running count of elements in A and B.
// When the count of an element becomes 2, we add to the running count of common elements.
// The number of common elements is the size of the hashmap.

// Time Complexity: O(n) 109ms
// Space Complexity: O(n) 48.3MB
var findThePrefixCommonArray = function(A, B) {
  let n = A.length, count = new Map(), ans = Array(n), common = 0;
  for (let i = 0; i < n; i++) {
    count.set(A[i], (count.get(A[i]) || 0) + 1);
    if (count.get(A[i]) === 2) common++;
    count.set(B[i], (count.get(B[i]) || 0) + 1);
    if (count.get(B[i]) === 2) common++;
    ans[i] = common;
  }
  return ans;
};

// Two test cases
console.log(findThePrefixCommonArray([1,3,2,4], [3,1,2,4])) // [0,2,3,4]
console.log(findThePrefixCommonArray([2,3,1], [3,1,2])) // [0,1,3]