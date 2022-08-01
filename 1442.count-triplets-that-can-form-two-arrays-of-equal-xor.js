// 1442. Count Triplets That Can Form Two Arrays of Equal XOR
// Given an array of integers arr.
// We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).
// Let's define a and b as follows:
  // a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
  // b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
// Note that ^ denotes the bitwise-xor operation.
// Return the number of triplets (i, j and k) Where a == b.


// Solution: Brute Force

// Go through each i, j, and k in a way that we can build on the xor sum from previous loop iterations.
// Go through each possible i,
  // Go through each possible j and get the running xor sum from i to j
  // Go through each possible k and get the running xor sum from j + 1 to k

// Time Complexity: O(n^3) 123ms
// Space Complexity: O(1) 41.9MB
var countTriplets = function(arr) {
  let triplets = 0, n = arr.length;
  for (let i = 0; i < n; i++) {
    let a = 0;
    for (let j = i; j < n; j++) {
      let b = 0;
      a ^= arr[j];
      for (let k = j + 1; k < n; k++) {
        b ^= arr[k];
        if (a === b) triplets++;
      }
    }
  }
  return triplets;
};

// Two test cases to run function on
console.log(countTriplets([2,3,1,6,7])) // 4
console.log(countTriplets([1,1,1,1,1])) // 10