// 1233. Remove Sub-Folders from the Filesystem
// Given a list of folders folder, return the folders after removing all sub-folders in those folders.
// You may return the answer in any order.
// If a folder[i] is located within another folder[j], it is called a sub-folder of it.
// A sub-folder of folder[j] must start with folder[j], followed by a "/".
// For example, "/a/b" is a sub-folder of "/a", but "/b" is not a sub-folder of "/a/b/c".
// The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.
  // For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.


// Solution: Hashset

// First, sort the folders by length from shortest to longest to ensure folders always appear before their sub-folders.
// Use a hashset to store folders that have no matching prefixes.
// For each path, split the path into folder segments and check each prefix for a match in the hashset.
// If there is a matching prefix, it's a sub-folder.
// Otherwise, add it to the hashset.

// n = length of folder, m = max(folder[i].length)
// Time Complexity: O(n * m^3) 94ms
// Space Complexity: O(nm) 67.8MB
function removeSubfolders(folder) {
  folder.sort((a, b) => a.length - b.length);
  let folders = new Set();
  for (let i = 0; i < folder.length; i++) {
    let hasExistingPrefix = false;
    let path = folder[i].split('/');
    for (let j = 1; j < path.length; j++) {
      let prefix = path.slice(0, j + 1).join('/');
      if (folders.has(prefix)) {
        hasExistingPrefix = true;
        break;
      }
    }
    if (!hasExistingPrefix) {
      folders.add(folder[i]);
    }
  }
  return [...folders];
};

// Three test cases
console.log(removeSubfolders(["/a","/a/b","/c/d","/c/d/e","/c/f"])) // ["/a","/c/d","/c/f"]
console.log(removeSubfolders(["/a","/a/b/c","/a/b/d"])) // ["/a"]
console.log(removeSubfolders(["/a/b/c","/a/b/ca","/a/b/d"])) // ["/a/b/c","/a/b/ca","/a/b/d"]