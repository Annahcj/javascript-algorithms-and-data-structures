// 1598. Crawler Log Folder
// The Leetcode file system keeps a log each time some user performs a change folder operation.
// The operations are described below:
  // "../" : Move to the parent folder of the current folder. (If you are already in the main folder, remain in the same folder).
  // "./" : Remain in the same folder.
  // "x/" : Move to the child folder named x (This folder is guaranteed to always exist).
// You are given a list of strings logs where logs[i] is the operation performed by the user at the ith step.
// The file system starts in the main folder, then the operations in logs are performed.
// Return the minimum number of operations needed to go back to the main folder after the change folder operations.


// Solution: Count Depth

// Keep track of the depth of the current folder.
// When going up to the parent folder, decrement depth by 1.
// When moving to a child folder, increment depth by 1.

// Time Complexity: O(n) 50ms
// Space Complexity: O(1) 49.4MB
function minOperations(logs) {
  let depth = 0;  
  for (let log of logs) {
    if (log === '../') {
      depth = Math.max(0, depth - 1);
    } else if (log !== './') {
      depth++;
    }
  }
  return depth;
};

// Three test cases
console.log(minOperations(["d1/","d2/","../","d21/","./"])) // 2
console.log(minOperations(["d1/","d2/","./","d3/","../","d31/"])) // 3
console.log(minOperations(["d1/","../","../","../"])) // 0