// 1233. Remove Sub-Folders from the Filesystem
// Given a list of folders folder, return the folders after removing all sub-folders in those folders.
// You may return the answer in any order.
// If a folder[i] is located within another folder[j], it is called a sub-folder of it.
// A sub-folder of folder[j] must start with folder[j], followed by a "/".
// For example, "/a/b" is a sub-folder of "/a", but "/b" is not a sub-folder of "/a/b/c".
// The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.
  // For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.


// Solution: Trie

// First, sort the folders by length from shortest to longest to ensure folders always appear before their sub-folders.
// Use a trie to store each folder path.
// If there is a matching path prefix in the trie, this is a sub-folder.
// Otherwise, add the new path to the trie.

// n = length of folder, m = max(folder[i].length)
// Time Complexity: O(nm) 97ms
// Space Complexity: O(nm) 71.7MB
function removeSubfolders(folder) {
  folder.sort((a, b) => a.length - b.length);
  let trie = new Trie(), folders = [];
  for (let i = 0; i < folder.length; i++) {
    let node = trie.root, isMainFolder = false;
    let path = folder[i].split('/');
    for (let j = 1; j < path.length; j++) {
      node = node.children;
      if (!node[path[j]]) {
        isMainFolder = true;
        break;
      }
      node = node[path[j]];
      if (node.isPathEnd) break;
    }
    if (isMainFolder) {
      trie.add(path);
      folders.push(folder[i]);
    }
  }
  return folders;
};
  
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  add(path) {
    let node = this.root;
    for (let i = 1; i < path.length; i++) {
      node = node.children;
      if (!node[path[i]]) node[path[i]] = new TrieNode();
      node = node[path[i]];
    }
    node.isPathEnd = true;
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isPathEnd = false;
  }
}

// Three test cases
console.log(removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"])) // ["/a","/c/d","/c/f"]
console.log(removeSubfolders(["/a","/a/b/c","/a/b/d"])) // ["/a"]
console.log(removeSubfolders(["/a/b/c","/a/b/ca","/a/b/d"])) // ["/a/b/c","/a/b/ca","/a/b/d"]