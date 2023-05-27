// 1238. Circular Permutation in Binary Representation
// Given 2 integers n and start. Your task is return any permutation p of (0,1,2.....,2^n -1) such that :
  // p[0] = start
  // p[i] and p[i+1] differ by only one bit in their binary representation.
  // p[0] and p[2^n -1] must also differ by only one bit in their binary representation.


// Solution: Gray Code & Rotate

// Generate the sequence starting from 0 (same as the gray code problem), then rotate it so that start is the first integer in the sequence.

// Time Complexity: O(2^n) 163ms
// Space Complexity: O(2^n) 56.9MB
var circularPermutation = function(n, start) {
  let sequences = [0, 1], startIndex = start;
  for (let i = 2; i <= n; i++) {
    for (let j = (2 ** i) / 2 - 1; j >= 0; j--) {
      let num = sequences[j] | (1 << (i - 1));
      if (num === start) startIndex = sequences.length;
      sequences.push(num);
    }
  }
  return rotate(sequences, startIndex);
};

function rotate(arr, startIndex) {
  let n = arr.length, rotated = Array(n);
  for (let i = 0; i < n; i++) {
    let newIndex = (n + (i - startIndex)) % n;
    rotated[newIndex] = arr[i];
  }
  return rotated;
};

// Two test cases
console.log(circularPermutation(2, 3)) // [3,2,0,1]
console.log(circularPermutation(3, 2)) // [2,6,7,5,4,0,1,3]