// 3307. Find the K-th Character in String Game II
// Alice and Bob are playing a game. Initially, Alice has a string word = "a".
// You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.
// Now Bob will ask Alice to perform all operations in sequence:
  // If operations[i] == 0, append a copy of word to itself.
  // If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
// Return the value of the kth character in word after performing all the operations.
// Note that the character 'z' can be changed to 'a' in the second type of operation.


// Solution: Math

// Trace backwards.
// Starting from the kth index, trace backwards through the operations and undo them one-by-one.
// Eventually, we will find ourselves at the starting position.

// When operations[i] === 1, we want to add to a count that keeps track of the offset we need to add to the initial "a".
// If operations[i] === 0, just jump to the equivalent index in the first half of the current string.

// e.g. operations = [1,1,0,1]
  // word = "a|b|bc|abbc|bccdbccd"
  //         0 1 23 4567 89012345
// Depending on the current position (starting from k-1), 
// we need to find the current operation index.
// Observe the example above, 
  // operation index -> current index in word
  // _ -> 0
  // 0 -> 1
  // 1 -> 2,3
  // 2 -> 4,5,6,7
  // 3 -> 8,9,10,11,12,13,14,15
// Formula to find the operation index: floor(log2(i)).
// To find the equivalent index after (or rather before) the operation, formula is: i - 2^operation index.

// n = length of operations
// Time Complexity: O(n) 1ms
// Space Complexity: O(1) 56MB
function kthCharacter(k, operations) {
  let offset = 0, i = k - 1;
  while (i > 0) {
    let j = Math.floor(Math.log2(i));
    if (operations[j] === 1) {
      offset++;
    }
    i -= (2 ** j);
  }
  offset = offset % 26;
  return String.fromCharCode(97 + offset);
};

// Two test cases
console.log(kthCharacter(5, [0,0,0])) // "a"
console.log(kthCharacter(10, [0,1,0,1])) // "b"