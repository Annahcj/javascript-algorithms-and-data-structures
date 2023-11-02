// 1948. Delete Duplicate Folders in System
// Due to a bug, there are many duplicate folders in a file system. You are given a 2D array paths, where paths[i] is an array representing an absolute path to the ith folder in the file system.
  // For example, ["one", "two", "three"] represents the path "/one/two/three".
// Two folders (not necessarily on the same level) are identical if they contain the same non-empty set of identical subfolders and underlying subfolder structure. The folders do not need to be at the root level to be identical. If two or more folders are identical, then mark the folders as well as all their subfolders.
  // For example, folders "/a" and "/b" in the file structure below are identical. They (as well as their subfolders) should all be marked:
    // /a
    // /a/x
    // /a/x/y
    // /a/z
    // /b
    // /b/x
    // /b/x/y
    // /b/z
  // However, if the file structure also included the path "/b/w", then the folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" would still be considered identical even with the added folder.
// Once all the identical folders and their subfolders have been marked, the file system will delete all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.
// Return the 2D array ans containing the paths of the remaining folders after deleting all the marked folders. The paths may be returned in any order.


// Solution: Build Tree & Postorder DFS

// Build up a tree.
// 1. Add each path to the tree. If the tree already contains part of the path, use the same nodes and don't create new nodes.
// 2. Postorder DFS from the root of the tree. 
  // Return the serialized subtree and store it in a hashmap. 
    // Serialize each node as such: node(child1)(child2)(child3)...
    // Note: Sort the children nodes by folder in lexicographical order so that the ordering is consistent for the serialization.
  // If the hashmap already contains the serialized subtree, mark the current node and previous node to be deleted.
  // Otherwise, add the current node to the hashmap with the serialized subtree as the key.
// 3. Go through the tree and get the prefixes of all paths that are not marked to be deleted.

// m = sum(paths[i][j].length), n = number of nodes in the tree, k = max(paths[i][j].length)
// Time Complexity: O(m + n^2 * k) 550ms
// Space Complexity: O(n^2 * k) 72.4MB
var deleteDuplicateFolder = function(paths) {
  let tree = new TreeNode("");
  for (let path of paths) {
    let node = tree;
    for (let i = 0; i < path.length; i++) {
      node = node.children;
      if (!node[path[i]]) node[path[i]] = new TreeNode(path[i]);
      node = node[path[i]];
    }
  }
  let map = new Map();
  for (let key in tree.children) {
    markDuplicatesAsDeleted(tree.children[key]);
  }
  let res = [];
  for (let folder in tree.children) {
    buildPaths(tree.children[folder], [folder]);
  }
  return res;

  function markDuplicatesAsDeleted(node) {
    let folder = node.folder;
    let serialized = "";
    let children = Object.values(node.children).sort((a, b) => a.folder.localeCompare(b.folder));
    for (let child of children) {
      let subtree = markDuplicatesAsDeleted(child);
      serialized += `(${subtree})`;
    }
    if (serialized === "") return folder;
    if (map.has(serialized)) {
      node.isDeleted = true;
      let prevNode = map.get(serialized);
      prevNode.isDeleted = true;
    } else {
      map.set(serialized, node);
    }
    return folder + serialized;
  }

  function buildPaths(node, path) {
    if (node.isDeleted) return;
    if (path.length > 0) {
      res.push([...path]);
    }
    for (let folder in node.children) {
      let child = node.children[folder];
      path.push(folder);
      buildPaths(child, path);
      path.pop();
    }
  }
};

class TreeNode {
  constructor(folder) {
    this.folder = folder;
    this.children = {};
    this.isDeleted = false;
  }
}

// Three test cases
console.log(deleteDuplicateFolder([["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]])) // [["d"],["d","a"]]
console.log(deleteDuplicateFolder([["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]])) // [["c"],["c","b"],["a"],["a","b"]]
console.log(deleteDuplicateFolder([["a","b"],["c","d"],["c"],["a"]])) // [["c"],["c","d"],["a"],["a","b"]]