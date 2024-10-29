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


// Solution: DFS & Rolling Hash

// Traverse the tree using post-order DFS.
// Maintain a rolling hash of the strings for each subtree.
// To check whether the string is a palindrome, we also need a reversed rolling hash.
// If the rolling hash is equal to the reversed hash, then the string is palindrome.

// Rolling hash formula for adding new characters:
  // Normal hash (add to the right side): hash * pow[count of new characters] + new characters hash.
    // Reasoning: (* pow[count of new characters]) to shift the existing hash to the left before appending the new hash to the end.
  // Reversed hash (add to the left side): reverseHash + new characters hash * pow[size of existing hash].
    // Reasoning: The existing hash stays the same, just add the new characters hash to the left side by shifting it by the size of the existing hash.

// To reduce the risk of hash collision, maintain two hashes with different bases.
// Compare both hashes to their reversed hashes.

// n = number of nodes
// Time Complexity: O(n) 1559ms
// Space Complexity: O(n) 149.5MB
function findAnswer(parent, s) {
  let n = parent.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[parent[i]].push(i);
  }
  let BASE = 31n, BASE_2 = 47n;
  let pow = Array(n + 1), pow2 = Array(n + 1);
  pow[0] = 1n, pow2[0] = 1n;
  let MOD = 1000000007n, currPow = BASE, currPow2 = BASE_2;
  for (let i = 1; i <= n; i++) {
    pow[i] = currPow;
    pow2[i] = currPow2;
    currPow = (currPow * BASE) % MOD;
    currPow2 = (currPow2 * BASE_2) % MOD;
  }
  let isPalindrome = Array(n);
  dfs(0);
  return isPalindrome;
  
  function dfs(node) {
    let size = 0, hash = 0n, reverseHash = 0n;
    let hash2 = 0n, reverseHash2 = 0n;
    for (let nei of graph[node]) {
      let [neiSize, neiHash, neiReverseHash, neiHash2, neiReverseHash2] = dfs(nei);
      hash = (hash * pow[neiSize] + neiHash) % MOD;
      reverseHash = (reverseHash + neiReverseHash * pow[size]) % MOD;
      hash2 = (hash2 * pow2[neiSize] + neiHash2) % MOD;
      reverseHash2 = (reverseHash2 + neiReverseHash2 * pow2[size]) % MOD;
      size += neiSize;
    }
    let charcode = BigInt(s.charCodeAt(node) - 96);
    hash = (hash * BASE + charcode) % MOD;
    reverseHash = (reverseHash + pow[size] * charcode) % MOD;
    hash2 = (hash2 * BASE_2 + charcode) % MOD;
    reverseHash2 = (reverseHash2 + pow2[size] * charcode) % MOD;
    size++;
    isPalindrome[node] = hash === reverseHash && hash2 === reverseHash2;
    return [size, hash, reverseHash, hash2, reverseHash2];
  }
};

// Two test cases
console.log(findAnswer([-1,0,0,1,1,2], "aababa")) // [true,true,false,true,true,true]
console.log(findAnswer([-1,0,0,0,0], "aabcb")) // [true,true,true,true,true]