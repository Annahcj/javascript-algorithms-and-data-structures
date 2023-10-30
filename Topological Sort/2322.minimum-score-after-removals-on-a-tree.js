// 2322. Minimum Score After Removals on a Tree
// There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
// You are given a 0-indexed integer array nums of length n where nums[i] represents the value of the ith node. You are also given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Remove two distinct edges of the tree to form three connected components. For a pair of removed edges, the following steps are defined:
  // Get the XOR of all the values of the nodes for each of the three components respectively.
  // The difference between the largest XOR value and the smallest XOR value is the score of the pair.
  // For example, say the three components have the node values: [4,5,7], [1,9], and [3,3,3]. The three XOR values are 4 ^ 5 ^ 7 = 6, 1 ^ 9 = 8, and 3 ^ 3 ^ 3 = 3. The largest XOR value is 8 and the smallest XOR value is 3. The score is then 8 - 3 = 5.
// Return the minimum score of any possible pair of edge removals on the given tree.


// Solution: Topological Sort & Prefix XOR 

// Since we are dealing with a tree, cutting an edge means we cut off all the nodes connected on both sides.

// 1. Using topological sort, start from each leaf and precompute the prefix XOR of each leaf to each parent node.
  // Store the following:
    // The prefix XOR associated to each edge in a map ({node: prefix XOR of subtree we are cutting off from main tree}).
    // The set of nodes in each subtree: {node: set of nodes in subtree rooted at node}

// 2. Then, loop through each pair of edges and calculate the score:
  // To get the XOR value of the remaining part of the tree after cutting off two edges, we can use totalXOR ^ leftXOR ^ rightXOR.
  // Explanation: Since n ^ n = 0, by XORing a number with itself, we remove it from the total XOR.

// Edge case: The two edges can be from the same subtree. To solve this we can keep track of the nodes in each subtree during the topological sort.
// Edge case 2: The nodes on the edge we remove will have a hierarchy, so we want to remove the XOR value of the subtree and not the parent, otherwise it will be incorrect if the parent has any more children.

// Time Complexity: O(n^2) 809ms
// Space Complexity: O(n) 106.4MB
var minimumScore = function(nums, edges) {
  let n = nums.length, graph = Array(n).fill(0).map(() => []), totalXOR = 0;
  for (let i = 0; i < n; i++) {
    totalXOR ^= nums[i];
  }
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  let [prefixXOR, nodesInSubtree] = getPrefixXOR(graph, edges, nums); // prefixXOR = {node: prefix XOR of subtree we are cutting off from main tree}. nodesInSubtree = {root of subtree: set of nodes in subtree}
  let minScore = Infinity;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      let [leftA, leftB] = edges[i], [rightA, rightB] = edges[j];
      // the nodes we want to remove must be the subtrees and not the parents, since we can get in the situation where the node we remove has more than 1 or 2 children
      if (nodesInSubtree[leftA].has(leftB)) [leftA, leftB] = [leftB, leftA];
      if (nodesInSubtree[rightA].has(rightB)) [rightA, rightB] = [rightB, rightA];

      let leftSubtreeXOR = prefixXOR[leftA];
      let rightSubtreeXOR = prefixXOR[rightA];
      if (nodesInSubtree[leftA].has(rightA)) { // j is in subtree with root i, remove the extra XOR in the shared subtree
        leftSubtreeXOR ^= rightSubtreeXOR; 
      } else if (nodesInSubtree[rightA].has(leftA)) { // i is in subtree with root j, remove the extra XOR in the shared subtree
        rightSubtreeXOR ^= leftSubtreeXOR;
      }
      let remainingXOR = totalXOR ^ leftSubtreeXOR ^ rightSubtreeXOR;
      let minXOR = Math.min(leftSubtreeXOR, remainingXOR, rightSubtreeXOR);
      let maxXOR = Math.max(leftSubtreeXOR, remainingXOR, rightSubtreeXOR);
      minScore = Math.min(minScore, maxXOR - minXOR);
    }
  }
  return minScore;
};

function getPrefixXOR(graph, edges, values) { // topological sort
  let n = graph.length, degrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    degrees[a]++;
    degrees[b]++;
  }
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (degrees[i] === 1) queue.push(i);
  }
  let prefixXOR = [...values], usedEdges = new Set(), nodesInSubtree = Array(n).fill(0).map((_, i) => new Set([i]));
  while (queue.length) {
    let node = queue.shift(), xor = prefixXOR[node];
    for (let nei of graph[node]) {
      if (--degrees[nei] === 1) queue.push(nei);
      let key = `${Math.min(node, nei)},${Math.max(node, nei)}`;
      if (!usedEdges.has(key)) {
        prefixXOR[nei] ^= xor; // total xor value of subtree we are cutting off from the main tree
        for (let child of nodesInSubtree[node]) {
          nodesInSubtree[nei].add(child);
        }
        usedEdges.add(key);
      }
    }
  }
  return [prefixXOR, nodesInSubtree];
}

// Three test cases
console.log(minimumScore([9,14,2,1], [[2,3],[3,0],[3,1]])) // 11
console.log(minimumScore([1,5,5,4,11], [[0,1],[1,2],[1,3],[3,4]])) // 9
console.log(minimumScore([5,5,2,4,4,2], [[0,1],[1,2],[5,2],[4,3],[1,3]])) // 0