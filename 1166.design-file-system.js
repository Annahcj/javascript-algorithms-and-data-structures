// 1166. Design File System
// You are asked to design a file system that allows you to create new paths and associate them with different values.
// The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string "" and "/" are not.
// Implement the FileSystem class:
  // bool createPath(string path, int value) Creates a new path and associates a value to it if possible and returns true. Returns false if the path already exists or its parent path doesn't exist.
  // int get(string path) Returns the value associated with path or returns -1 if the path doesn't exist.


// Solution: Trie

// The FileSystem and Trie are separated for clarity.
// Comments are in the code below.

// Runtime: 292ms
// Memory Usage: 59.1MB
var FileSystem = function() {
  this.trie = new Trie();  
};

FileSystem.prototype.createPath = function(path, value) {
  path = path.split("/");
  let filename = path.pop();
  return this.trie.addFile(path, filename, value);  
};

FileSystem.prototype.get = function(path) {
  path = path.split("/");
  return this.trie.getVal(path);  
};

class TrieNode {
  constructor(value) {
    this.children = {};
    this.value = value;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  addFile(path, filename, value) {
    let node = this.root;
    for (var i = 1; i < path.length; i++) { // since path was split by '/', the first item is an empty space.
      let dir = path[i];
      node = node.children;
      if (!node[dir]) return false; // directory doesn't exist
      node = node[dir]; // follow the path
    }
    let newNode = new TrieNode(value); // create a new node

    if (node.children[filename] !== undefined) return false; // node already exists
    node.children[filename] = newNode;
    return true;
  }
  getVal(path) {
    let node = this.root;
    for (var i = 1; i < path.length; i++) {
      let dir = path[i];
      node = node.children;
      if (!node[dir]) return -1; // directory doesn't exist
      node = node[dir];
    }
    return node.value; 
  }
}

// A few test cases
let fileSystem = new FileSystem();
console.log(fileSystem.createPath("/leet", 1)); // return true
console.log(fileSystem.createPath("/leet/code", 2)); // return true
console.log(fileSystem.get("/leet/code")); // return 2
console.log(fileSystem.createPath("/c/d", 1)); // return false because the parent path "/c" doesn't exist.
console.log(fileSystem.get("/c")); // return -1 because this path doesn't exist.