// 2977. Minimum Cost to Convert String II
// You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English characters. You are also given two 0-indexed string arrays original and changed, and an integer array cost, where cost[i] represents the cost of converting the string original[i] to the string changed[i].
// You start with the string source. In one operation, you can pick a substring x from the string, and change it to y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y. You are allowed to do any number of operations, but any pair of operations must satisfy either of these two conditions:
  // The substrings picked in the operations are source[a..b] and source[c..d] with either b < c or d < a. In other words, the indices picked in both operations are disjoint.
  // The substrings picked in the operations are source[a..b] and source[c..d] with a == c and b == d. In other words, the indices picked in both operations are identical.
// Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.
// Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].


// Solution: Dijkstra's Algorithm, DP & Trie

// 1. Use dijkstra's algorithm to find the minimum cost to convert a substring in original into another substring.
// 2. Use DP to find the minimum cost to convert each suffix in source into the suffix in target.
  // Memoize each dp(i). For each dp[i], 
    // Traverse through each substring starting at index i. 
    // Use a trie to check whether the substring exists in original and changed.
    // Read the precomputed minCost[sourceSubstr][targetSubstr] to get the minimum cost to turn the source substring into the target substring.

// Trie:
  // Use a trie to store all the words in original and changed.
  // A substring in source can only be converted into target if it matches words in original and changed.
  // At each dp(i), as we traverse each index j for the substring, we break early if there is no such prefix in the trie. If there is a matching word in the trie, then we use the word stored in the trie, so that we don't have to create a separate substring for each index j.

// n = length of source, m = length of original and changed, k = max(original[i].length)
// Time Complexity: O(mk + m^2 log(m) + nk) 1315ms
  // Add words to trie: O(mk)
  // Dijkstra's algo from each source: O(m^2 log(m))
  // DP: O(nk)
// Space Complexity: O(m^2 + n) 100.8MB
var minimumCost = function(source, target, original, changed, cost) {
  let maxSubstrLen = 0, trie = new Trie();
  for (let i = 0; i < original.length; i++) {
    maxSubstrLen = Math.max(maxSubstrLen, original[i].length, changed[i].length);
    trie.add(original[i]);
    trie.add(changed[i]);
  }
  // construct graph for dijkstra's algorithm
  let graph = {};
  for (let i = 0; i < original.length; i++) {
    if (!graph[original[i]]) graph[original[i]] = [];
    graph[original[i]].push([changed[i], cost[i]]);
  }
  // dijkstra's algorithm from each source
  let minCost = {};
  for (let str of original) {
    minCost[str] = getDist(graph, str);
  }
  let n = source.length, memo = Array(n).fill(-1);
  let res = dp(0);
  return res === Infinity ? -1 : res;
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ans = source[i] === target[i] ? dp(i + 1) : Infinity;
    let trieNodeSource = trie.root, trieNodeTarget = trie.root;
    for (let j = i; j < Math.min(n, i + maxSubstrLen); j++) {
      trieNodeSource = trieNodeSource.children;
      trieNodeTarget = trieNodeTarget.children;
      if (!trieNodeSource[source[j]] || !trieNodeTarget[target[j]]) break; // prefix of source or target doesn't match any words in the trie
      trieNodeSource = trieNodeSource[source[j]];
      trieNodeTarget = trieNodeTarget[target[j]];
      if (!trieNodeSource.word || !trieNodeTarget.word) continue; // there are no matching words for these specific substrings
      let sourceSubstr = trieNodeSource.word;
      let targetSubstr = trieNodeTarget.word;
      
      if (!minCost[sourceSubstr] || minCost[sourceSubstr][targetSubstr] === undefined) continue; // targetSubstr not reachable from sourceSubstr
      ans = Math.min(ans, minCost[sourceSubstr][targetSubstr] + dp(j + 1));
    }
    return memo[i] = ans;
  }
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  add(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      let char = word[i];
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
      node.count++;
    }
    node.word = word;
  }
}

function getDist(graph, src) {
  let dist = {};
  let heap = new Heap((a, b) => a[1] - b[1]);
  heap.add([src, 0]);
  dist[src] = 0;

  while (!heap.isEmpty()) {
    let [node, cost] = heap.remove();
    if (dist[node] && dist[node] < cost) continue;
    for (let [nei, weight] of (graph[node] || [])) {
      if (!dist[nei] || dist[nei] > cost + weight) {
        dist[nei] = cost + weight;
        heap.add([nei, cost + weight]);
      }
    }
  }
  return dist;
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Three test cases
console.log(minimumCost("abcd", "acbe", ["a","b","c","c","e","d"], ["b","c","b","e","b","e"], [2,5,5,1,2,20])) // 28
console.log(minimumCost("abcdefgh", "acdeeghh", ["bcd","fgh","thh"], ["cde","thh","ghh"], [1,3,5])) // 9
console.log(minimumCost("abcdefgh", "addddddd", ["bcd","defgh"], ["ddd","ddddd"], [100,1578])) // -1