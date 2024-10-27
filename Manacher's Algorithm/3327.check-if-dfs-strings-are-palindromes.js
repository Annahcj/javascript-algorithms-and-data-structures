// 3327.check-if-dfs-strings-are-palindromes.js
// 3327. Check if DFS Strings Are Palindromes
// You are given a tree rooted at node 0, consisting of n nodes numbered from 0 to n - 1. The tree is represented by an array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.
// You are also given a string s of length n, where s[i] is the character assigned to node i.
// Consider an empty string dfsStr, and define a recursive function dfs(int x) that takes a node x as a parameter and performs the following steps in order:
  // Iterate over each child y of x in increasing order of their numbers, and call dfs(y).
  // Add the character s[x] to the end of the string dfsStr.
// Note that dfsStr is shared across all recursive calls of dfs.
// You need to find a boolean array answer of size n, where for each index i from 0 to n - 1, you do the following:
  // Empty the string dfsStr and call dfs(i).
  // If the resulting string dfsStr is a palindrome, then set answer[i] to true. Otherwise, set answer[i] to false.
// Return the array answer.


// Solution: Manacher's Algorithm & Post-order DFS

// Find the post-order of the nodes (left subtree + right subtree + root).
// This ordering can be used for all roots because a subtree's ordering will be a subarray in the final order.
// Use Manacher's algorithm to find the longest palindrome from each middle index (root of subtree). We need palindromes with both odd-length and even-length.

// Time Complexity: O(n) 1098ms
// Space Complexity: O(n) 139.2MB
function findAnswer(parent, s) {
  let n = parent.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }
  let postorder = [], size = Array(n).fill(0);
  let substrIndices = Array(n);
  dfs(0);
  
  let m = manacherEven(postorder), ans = Array(n);
  for (let i = 0; i < n; i++) {
    let subtreeSize = size[i];
    let [startIndex, endIndex] = substrIndices[i];
    let leftMid = Math.floor((startIndex + endIndex) / 2);
    let palindromeLength = subtreeSize % 2 === 0 ? m[(leftMid + 1) * 2] - 1 : m[leftMid * 2 + 1] - 1;
    ans[i] = palindromeLength >= subtreeSize;
  }
  return ans;
  
  function dfs(node) {
    let count = 1;
    for (let child of graph[node]) {
      count += dfs(child);
    }
    postorder.push(s[node]);
    size[node] = count;
    substrIndices[node] = [postorder.length - size[node], postorder.length - 1];
    return count;
  }
};

function manacherEven(s) {
  s = `$#${s.join('#')}#^`;
  let n = s.length, m = Array(n).fill(0);
  for (let i = 1, l = 1, r = 1; i < n; i++) {
    m[i] = Math.max(0, Math.min(r - i, m[l + (r - i)]));
    while (i - m[i] >= 0 && i + m[i] < n && s[i - m[i]] === s[i + m[i]]) m[i]++;
    if (i + m[i] > r) l = i - m[i], r = i + m[i];
  }
  return m.slice(1, -1);
}

// Two test cases
console.log(findAnswer([-1,0,0,1,1,2], "aababa")) // [true,true,false,true,true,true]
console.log(findAnswer([-1,0,0,0,0], "aabcb")) // [true,true,true,true,true]