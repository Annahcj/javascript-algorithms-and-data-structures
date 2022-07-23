// 1718. Construct the Lexicographically Largest Valid Sequence
// Given an integer n, find a sequence that satisfies all of the following:
  // The integer 1 occurs once in the sequence.
  // Each integer between 2 and n occurs twice in the sequence.
  // For every integer i between 2 and n, the distance between the two occurrences of i is exactly i.
// The distance between two numbers on the sequence, a[i] and a[j], is the absolute difference of their indices, |j - i|.
// Return the lexicographically largest sequence. It is guaranteed that under the given constraints, there is always a solution.
// A sequence a is lexicographically larger than a sequence b (of the same length) if in the first position where a and b differ, sequence a has a number greater than the corresponding number in b. For example, [0,1,9,0] is lexicographically larger than [0,1,5,6] because the first position they differ is at the third number, and 9 is greater than 5.


// Solution: Greedy & Backtracking

// Greedily try to create the lexicographically largest sequence.
// Try to put the biggest numbers at the earliest indexes possible.
// The first valid sequence will be the lexographically largest sequence.
// Once we find a valid sequence, return it.

// In backtracking, keep the following variables:
  // i: the index we are currently up to in the result array
  // arr: the current sequence
  // used: used[i] indicates whether i has been used in the array yet

// Time Complexity: O(n!) 114ms
// Space Complexity: O(n) 42.3MB
var constructDistancedSequence = function(n) {
  let size = n * 2 - 1, res = Array(size).fill(0);
  return backtrack(0, res, Array(n + 1).fill(0));
  
  function backtrack(i, arr, used) {
    while (i < size && arr[i] !== 0) i++;
    if (i === size) return arr;
    
    for (let j = n; j > 1; j--) {
      if (used[j]) continue;
      if (i + j < size && arr[i + j] === 0) {
        arr[i] = j, arr[i + j] = j, used[j] = 1;
        let res = backtrack(i + 1, arr, used);
        if (res) return res;
        arr[i] = 0, arr[i + j] = 0, used[j] = 0;
      }
    }
    if (!used[1]) {
      used[1] = 1, arr[i] = 1;
      let res = backtrack(i + 1, arr, used);
      if (res) return res;
      used[1] = 0, arr[i] = 0;
    }
    return false;
  }
};

// Two test cases to run function on
console.log(constructDistancedSequence(3)) // [3,1,2,3,2]
console.log(constructDistancedSequence(5)) // [5,3,1,4,3,5,2,4,2]