// 2791. Count Paths That Can Form a Palindrome in a Tree
// You are given a tree (i.e. a connected, undirected graph that has no cycles) rooted at node 0 consisting of n nodes numbered from 0 to n - 1. The tree is represented by a 0-indexed array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.
// You are also given a string s of length n, where s[i] is the character assigned to the edge between i and parent[i]. s[0] can be ignored.
// Return the number of pairs of nodes (u, v) such that u < v and the characters assigned to edges on the path from u to v can be rearranged to form a palindrome.
// A string is a palindrome when it reads the same backwards as forwards.


// Solution: DFS & Prefix Bitmasks 

// Go through each path in the tree using DFS, using bitmasks to keep track of character counts (0 = even occurances, 1 = odd occurances. We just flip the bits)
// Count the occurances of each prefix bitmask as we traverse through each path.
// At each node, add the count of bitmasks that are the exact same as the current bitmask (meaning all character counts are even), or differ by 1 bit (1 character with odd occurance).

// Note: This count takes into account paths starting from the root, as well as paths starting from other nodes.

// Time Complexity: O(n * 26) 871ms
// Space Complexity: O(n) 127.2MB
var countPalindromePaths = function(parent, s) {
  let n = parent.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }
  let count = {}, ans = 0;
  dfs(0, 0);
  return ans;
  
  function dfs(node, mask) {
    ans += countPalindromes(mask);
    for (let nei of graph[node]) {
      let charcode = s.charCodeAt(nei) - 97;
      let newMask = mask ^ (1 << charcode);
      dfs(nei, newMask);
    }
  }
  
  function countPalindromes(mask) {
    let ans = count[mask] || 0;
    for (let i = 0; i < 26; i++) {
      let flippedBit = mask ^ (1 << i);
      ans += (count[flippedBit] || 0);
    }
    count[mask] = (count[mask] || 0) + 1;
    return ans;
  }
};

// Two test cases
console.log(countPalindromePaths([-1,0,0,1,1,2], "acaabc")) // 8
console.log(countPalindromePaths([-1,0,0,0,0], "aaaaa")) // 10