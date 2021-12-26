// 2120. Execution of All Suffix Instructions Staying in a Grid
// Return an array answer of length m where answer[i] is the number of instructions the robot can execute if the robot begins executing from the ith instruction in s.


// Solution: Brute Force

// From each index in s, simulate the robot following the instructions until it can't.

// Time Complexity: O(n^2) 484ms
// Space Complexity: O(1) 42.4MB
var executeInstructions = function(n, startPos, s) {
  const directions = {'R': [0, 1], 'L': [0, -1], 'U': [-1, 0], 'D': [1, 0]};
  let res = [];
  for (var i = 0; i < s.length; i++) {
    res.push(steps(i));
  }
  return res;

  function steps(idx) {
    let numSteps = 0;
    let [row, col] = startPos;
    while (idx < s.length && row + directions[s[idx]][0] >= 0 && row + directions[s[idx]][0] < n && col + directions[s[idx]][1] >= 0 && col + directions[s[idx]][1] < n) {
      numSteps++;
      row += directions[s[idx]][0], col += directions[s[idx]][1];
      idx++;
    }
    return numSteps;
  }  
};

// Three test cases to run function on
console.log(executeInstructions(3, [0,1], "RRDDLU")) // [1,5,4,3,1,0]
console.log(executeInstructions(2, [1,1], "LURD")) // [4,1,0,0]
console.log(executeInstructions(1, [0,0], "LRUD")) // [0,0,0,0]