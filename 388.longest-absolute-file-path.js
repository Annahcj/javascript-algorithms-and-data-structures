// 388. Longest Absolute File Path


// Solution: Stack

// Each folder or file is separated by the \n characters.
// Split input by \n.

// Use a monotonic increasing stack to depth first search through the file system.
  // Find the depth by counting the number of \t in the filename.
  // Pop all files/folders at deeper or equal levels from the stack.
  // The file/folder at the top of the stack is the parent directory.
  // Keep track of the length of each path. pathLen[i] = length of the path from the root to file/folder i.
  // If we have reached a file, we can update the current maximum path length for a file.

// n = the number of files/folders in input
// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 41.5MB
var lengthLongestPath = function(input) {
  input = input.split("\n");
  let n = input.length, stack = [];
  let depths = Array(n).fill(0), pathLen = Array(n).fill(0), maxLen = 0;
  for (let i = 0; i < input.length; i++) {
    let depth = (input[i].match(/\t/g) || []).length, len = input[i].length - depth;
    depths[i] = depth;
    while (stack.length && depths[stack[stack.length - 1]] >= depth) { // remove file/folders with greater depth to find the parent directory
      stack.pop(); 
    }
    
    if (stack.length) {
      let parentLen = pathLen[stack[stack.length - 1]];
      pathLen[i] = parentLen + len;
    } else {
      pathLen[i] = len;
    }

    if (input[i].includes('.')) {
      maxLen = Math.max(maxLen, pathLen[i] + depth); // depth = number of / to add to the path
    }
    stack.push(i);
  }
  return maxLen;
};

// Three test cases
console.log(lengthLongestPath("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext")) // 20
console.log(lengthLongestPath("dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext")) // 32
console.log(lengthLongestPath("a")) // 0