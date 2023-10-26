// 768. Max Chunks To Make Sorted II
// You are given an integer array arr.
// We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.
// Return the largest number of chunks we can make to sort the array.


// Solution: Left Max & Right Min

// Keep the minimum number from the right, and the max number from the left.

// e.g: [1,0,3,2]
// i = 0: max = 1, min[i + 1] = 0. we still have a smaller number on the right.
// i = 1: max = 1, min[i + 1] = 2. no more smaller numbers on the right, we can create a chunk.
// i = 2: max = 3, min[i + 1] = 2. we still have a smaller number on the right.
// i = 3: max = 3, min[i + 1] = Infinity. no more smaller numbers on the right, we can create a chunk.
// number of chunks = 2.

// The same solution can be applied in 769. Max Chunks To Make Sorted.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 44.6MB
var maxChunksToSorted = function(arr) {
  let n = arr.length, res = 0;
  let max = 0, min = Array(n + 1);
  min[n] = Infinity;
  
  for (var i = n - 1; i >= 0; i--) {
    let next = i === n - 1 ? arr[i] : min[i + 1];
    min[i] = Math.min(arr[i], next);
  }
  
  for (i = 0; i < n; i++) {
    max = Math.max(max, arr[i]);
    if (max <= min[i + 1]) res++;
  }
  return res;
};

// Two test cases to run function on
console.log(maxChunksToSorted([5,4,3,2,1])) // 1
console.log(maxChunksToSorted([2,1,3,4,4])) // 4