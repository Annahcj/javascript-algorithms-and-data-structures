// 2677. Chunk Array
// Given an array arr and a chunk size size, return a chunked array. A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray may be less than size if arr.length is not evenly divisible by size.
// You may assume the array is the output of JSON.parse. In other words, it is valid JSON.
// Please solve it without using lodash's _.chunk function.


// Solution: 

// m = size of a chunk
// Time Complexity: O(n)
// Space Complexity: O(m) (not including output)
var chunk = function(arr, size) {
  let chunks = [], currSize = 0, currChunk = [];
  for (let i = 0; i < arr.length; i++) {
    currChunk.push(arr[i]);
    currSize++;
    if (currSize === size || i === arr.length - 1) {
      chunks.push(currChunk);
      currChunk = [];
      currSize = 0;
    }
  }
  return chunks;
};

// Three test cases
console.log(chunk([1,2,3,4,5], 1)) // [[1],[2],[3],[4],[5]]
console.log(chunk([1,9,6,3,2], 3)) // [[1,9,6],[3,2]]
console.log(chunk([8,5,3,2,6], 6)) // [[8,5,3,2,6]]