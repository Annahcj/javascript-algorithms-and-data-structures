// 1769. Minimum Number of Operations to Move All Balls to Each Box
// You have n boxes. You are given a binary string boxes of length n, where boxes[i] is '0' if the ith box is empty, and '1' if it contains one ball.
// In one operation, you can move one ball from a box to an adjacent box. Box i is adjacent to box j if abs(i - j) == 1. Note that after doing so, there may be more than one ball in some boxes.
// Return an array answer of size n, where answer[i] is the minimum number of operations needed to move all the balls to the ith box.
// Each answer[i] is calculated considering the initial state of the boxes.


// Solution 1: Brute Force

// For each position, loop through boxes and get the distances from each ball.

// Time Complexity: O(n^2) 272ms
// Space Complexity: O(1) (not including output) 44.1MB
var minOperations = function(boxes) {
  let n = boxes.length, res = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (boxes[j] === '1') res[i] += Math.abs(j - i);
    }
  }
  return res;
};

// Solution 2: DP

// Instead of loop through boxes each time, we can keep track of the number of balls on the left.
// e.g: "1101"
// at index 0: 0 balls on the left
// at index 1: 1 ball on the left, it takes 1 operation to move it from position 0 to position 1.
// at index 2: 2 balls on the left, it takes another 2 operations to move them from position 1 to position 2.
// at index 3: 2 balls on the left, it takes another 2 operations to move them from position 2 to position 3.

// Do the same for the balls on the right, by looping from right to left.

// Time Complexity: O(n) 126ms
// Space Complexity: O(1) (not including output) 44.9MB
var minOperations = function(boxes) {
  let n = boxes.length, res = Array(n).fill(0);
  let moves = 0, balls = 0;
  for (let i = 0; i < n; i++) {
    res[i] += moves;
    balls += boxes[i] === '1' ? 1 : 0;
    moves += balls;
  }
  
  moves = 0, balls = 0;
  for (let i = n - 1; i >= 0; i--) {
    res[i] += moves;
    balls += boxes[i] === '1' ? 1 : 0;
    moves += balls;
  }
  return res;
};

// Two test cases
console.log(minOperations("110")) // [1,1,3]
console.log(minOperations("001011")) // [11,8,5,4,3,4]