// 71. Simplify Path
// Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.


// Solution: Stack

// Split path by '/'.
// Process the directories:
  // If the dir is . or is empty, skip it.
  // If the dir is .., pop the last directory off the stack.
  // Otherwise, push the dir into the stack.
// Join the directories in the stack together by '/'.

// Time Complexity: O(n)
// Space Complexity: O(n)
var simplifyPath = function(path) {
  path = path.split("/");
  let stack = [];

  for (var dir of path) {
    if (!dir || dir === '.') continue;
    else if (dir === '..') {
      if (stack.length) stack.pop();
    } else {
      stack.push(dir);
    }
  }

  return "/" + stack.join("/");
};

// Three test cases to run function on
console.log(simplifyPath("/home/")) // "/home"
console.log(simplifyPath("/../")) // "/"
console.log(simplifyPath("/home//foo/")) // "/home/foo"