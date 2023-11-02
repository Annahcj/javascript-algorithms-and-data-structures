// 582. Kill Process
// You have n processes forming a rooted tree structure. You are given two integer arrays pid and ppid, where pid[i] is the ID of the ith process and ppid[i] is the ID of the ith process's parent process.
// Each process has only one parent process but may have multiple children processes. Only one process has ppid[i] = 0, which means this process has no parent process (the root of the tree).
// When a process is killed, all of its children processes will also be killed.
// Given an integer kill representing the ID of a process you want to kill, return a list of the IDs of the processes that will be killed. You may return the answer in any order


// Solution: Recursive DFS

// Construct a graph-like structure in a hashmap: { ppid: [pid, pid], ppid: [pid], ... }.
// Since the order doesn't matter, we can just dfs through from the kill node to all children.

// Time Complexity: O(n) 152ms
// Space Complexity: O(n) 51.2MB
var killProcess = function(pid, ppid, kill) {
  let tree = {};
  for (var i = 0; i < ppid.length; i++) {
    let parent = ppid[i];
    if (!tree[parent]) tree[parent] = [];
    tree[parent].push(pid[i]);
  }  
  let res = [];
  dfs(kill);

  function dfs(node) {
    res.push(node); // push node to result
    for (var child of (tree[node] || [])) { // loop through all children and dfs them
      dfs(child);
    }
  }
  return res;
};

// Two test cases to run function on
console.log(killProcess([1,3,10,5], [3,0,5,3], 5)) // [5,10]
console.log(killProcess([1], [0], 1)) // [1]