// 769. Max Chunks To Make Sorted
// You are given an integer array arr of length n that represents a permutation of the integers in the range [0, n - 1].
// We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.
// Return the largest number of chunks we can make to sort the array.


// Solution: Max Left & Min Right

// Keep the minimum number from the right, and the max number from the left.

// e.g: [1,0,3,2]
// i = 0: max = 1, min[i + 1] = 0. we still have a smaller number on the right.
// i = 1: max = 1, min[i + 1] = 2. no more smaller numbers on the right, we can create a chunk.
// i = 2: max = 3, min[i + 1] = 2. we still have a smaller number on the right.
// i = 3: max = 3, min[i + 1] = Infinity. no more smaller numbers on the right, we can create a chunk.
// number of chunks = 2.

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 42MB
var maxChunksToSorted = function(arr) {
  let n = arr.length, res = 0;
  let min = Array(n + 1), max = 0;
  min[n] = Infinity;
  
  for (var i = n - 1; i >= 0; i--) { // populate min from right
    let next = i === n - 1 ? arr[i] : min[i + 1];
    min[i] = Math.min(arr[i], next);
  }
  
  for (var i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]); 
    if (max <= min[i + 1]) res++;
  }
  return res;
};

// Two test cases to run function on
console.log(maxChunksToSorted([4,3,2,1,0])) // 1
console.log(maxChunksToSorted([1,0,2,3,4])) // 4