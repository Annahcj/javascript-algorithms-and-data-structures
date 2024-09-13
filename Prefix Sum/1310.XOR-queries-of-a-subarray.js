// 1310. XOR Queries of a Subarray
// You are given an array arr of positive integers. You are also given the array queries where queries[i] = [left[i], right[i]].
// For each query i compute the XOR of elements from left[i] to right[i] (that is, arr[left[i]] XOR arr[left[i + 1]] XOR ... XOR arr[right[i]]).
// Return an array answer where answer[i] is the answer to the ith query.


// Solution: Prefix XOR

// XORing a number with itself cancels itself out.
// i.e: a = a ^ b ^ b

// Store the prefix XOR and use pXor[j + 1] ^ pXor[i] to get the range XOR of numbers between indices i and j. 

// n = length of arr, m = number of queries
// Time Complexity: O(n + m) 104ms
// Space Complexity: O(n) (excluding output) 64MB
function xorQueries(arr, queries) {
  let n = arr.length, pXor = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    pXor[i] = pXor[i - 1] ^ arr[i - 1];
  }
  let answer = [];
  for (let [left, right] of queries) {
    answer.push(pXor[right + 1] ^ pXor[left]);
  }
  return answer;
};

// Two test cases
console.log(xorQueries([1,3,4,8], [[0,1],[1,2],[0,3],[3,3]])) // [2,7,14,8]
console.log(xorQueries([4,8,2,10], [[2,3],[1,3],[0,0],[0,3]])) // [8,0,4,4]