// 588. Design In-Memory File System
// Design a data structure that simulates an in-memory file system.


// Runtime on LeetCode: 92ms
// Memory Usage on LeetCode: 42.5MB

// Space Complexity: O(n) (number of files and directories)

// Solution: Trie Concept

// Thoughts:
// When a directory name is passed for make directory, for e.g: '/a/b/c', we would use a trie-like concept to store each directory. 
// We would look for 'a' in the root directory, create it as a new Directory node if is doesn't exist, then look for 'b' in a's directory, then for 'c' in b's directory.

// Algorithm:

// First, we will make a directory (Dir) node, which contains two empty objects -> directories and files.

// FileSystem: 
// Time Complexity of getFile: O(m + n) (m is length of path (since we need to split it), n is the number of dirs/files in path)
// Create a root, set it to a new Dir()
// Create a method getFile which accepts a path. (We will use this method in addContent and readContent)
  // Save the root in a variable 'dir'
  // Split the path by '/', save in 'paths'
  // Loop through each sub-directory (pointer = i)
    // Update dir to be dir.dirs[paths[i]]
  // Return an object with the directory and the fileName

// ls: (accepts a path)
// Time Complexity: O(m + n + k log(k)) (split the path (m), depth of directory (n), sorting the keys of directory and files (k log(k)))
// If path is not equal to '/'
  // Split the path by '/', save in 'paths'
  // Loop through paths (pointer = i) (up to second last item. because we don't know whether it's a file or a directory)
    // Update dir to be dir.dirs[paths[i]]
  // Check if dir.files contains last item in paths, if it does, that means it's a file, so we only return the file.
  // Otherwise update dir to be dir.dirs[paths[i]] (for the last item)
  // Take the keys from dir.dirs and dir.files
  // Join and sort them before returning. 

// mkdir: (accepts a path)
// Split the path by '/', save in 'paths'
// Save the root in a variable 'dir'
// Loop through paths
  // If there is not such path in dir.dirs, make a new directory node for it.
  // Update dir to dir.dirs[paths[i]

// addContentToFile: (accepts a path and content for the file)
// Time Complexity: O(m + n) (calling getFile)
// Call the getFile function for the path
// If the dir (returned from getFile) already contains file (fileName returned from getFile), append the content, otherwise create a new file in files of dir, then add the content in.

// readContentFromFile: (accepts a path)
// Time Complexity: O(m + n) (calling getFile)
// Call the getFile function for the path
// Return the content in dir.files[fileName] (dir and fileName returned from getFile)

  class Dir {
    constructor() {
      this.dirs = {};
      this.files = {};
    }
  }
  var FileSystem = function() {
    this.root = new Dir();
    this.getFile = path => {
      let dir = this.root;
      let paths = path.split("/");
      for (var i = 1; i < paths.length - 1; i++) {
        dir = dir.dirs[paths[i]];
      }
      return {dir, fileName: paths[i]};
    }
  };
  
  FileSystem.prototype.ls = function(path) {
    let dir = this.root;
    if (path !== '/') {
      let paths = path.split("/");
      for (var i = 1; i < paths.length - 1; i++) {
        dir = dir.dirs[paths[i]];
      }
      if (dir.files[paths[i]]) {
        return [paths[i]];
      }
      dir = dir.dirs[paths[i]];
    }
    let keys = Object.keys(dir.dirs);
    let fileKeys = Object.keys(dir.files);
    for (var key of fileKeys) keys.push(key);
    keys = keys.sort();
    return keys;
  };
  
  FileSystem.prototype.mkdir = function(path) {
    let paths = path.split("/");
    let dir = this.root;
    for (var i = 1; i < paths.length; i++) {
      if (!dir.dirs[paths[i]]) dir.dirs[paths[i]] = new Dir();
      dir = dir.dirs[paths[i]];
    }
  };
  
  FileSystem.prototype.addContentToFile = function(filePath, content) {
    let {dir, fileName} = this.getFile(filePath);
    dir.files[fileName] = (dir.files[fileName] || '') + content;
  };
  
  FileSystem.prototype.readContentFromFile = function(filePath) {
    let {dir, fileName} = this.getFile(filePath);
    return dir.files[fileName];
  };
  
  let fs = new FileSystem();
  fs.mkdir("/a/b");
  console.log(fs.ls("/a")) // ['b']
  fs.addContentToFile("/a/b/c", "hello")
  console.log(fs.readContentFromFile('/a/b/c')) // hello
  console.log(fs.ls('/a/b/c')) // ['c']
  console.log(fs)