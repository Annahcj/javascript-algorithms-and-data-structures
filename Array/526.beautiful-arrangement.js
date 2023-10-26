// 526. Beautiful Arrangement
// Suppose you have n integers labeled 1 through n. A permutation of those n integers perm (1-indexed) is considered a beautiful arrangement if for every i (1 <= i <= n), either of the following is true:
// perm[i] is divisible by i.
// i is divisible by perm[i].
// Given an integer n, return the number of the beautiful arrangements that you can construct.


// Solution: Modified Permutations

// Generate permutations by swapping pairs,
// but checking to make sure arr[idx] is divisible by idx + 1 OR idx + 1 is divisible by arr[idx].
// This works because i is always bigger than or equal to idx.

// Create an array with numbers 1 to n
// Let count be set to 0
// call permute(0)
// return count.
// permute: (idx)
  // if idx is equal to n, increment count by one.
  // loop through from idx to n (pointer = i)
    // swap numbers at i and idx
    // if arr[idx] is divisible by idx + 1 OR idx + 1 is divisible by arr[idx], call permute(idx + 1)
    // swap i and idx back to the previous state
  

// Time Complexity: O(k) (possible permutations) 156ms
// Space Complexity: O(n) 39MB
var countArrangement = function(n) {
  let arr = Array(n);
  for (var i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  let count = 0;
  permute(0);
  return count;

  function permute(idx) {
    if (idx === n) {
      count++;
    }
    for (var i = idx; i < n; i++) {
      swap(i, idx);
      // only check newly swapped item at idx because idx is always smaller than or equal to i
      if (arr[idx] % (idx + 1) === 0 || (idx + 1) % arr[idx] === 0) {
        permute(idx + 1);
      }
      swap(i, idx);
    }
  }  

  function swap(a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
};

// Two test cases to run function on
console.log(countArrangement(6)) // 3
console.log(countArrangement(3)) // 3
console.log(countArrangement(2)) // 2
console.log(countArrangement(1)) // 1