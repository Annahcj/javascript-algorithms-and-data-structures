// 508. Most Frequent Subtree Sum
// Given the root of a binary tree, return the most frequent subtree sum. If there is a tie, return all the values with the highest frequency in any order.
// The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).


// Solution: Recursive DFS & Hashmap for Sum Frequency

// 1. Recursive DFS the tree, keep track of the frequency of each subtree sum in a hashmap.
// 2. Get the max frequency and get the result values.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 47.1MB
var findFrequentTreeSum = function(root) {
  let freq = {};
  dfs(root);
  
  let maxFreq = 0, res = [];
  for (let sum in freq) {
    let frequency = freq[sum];
    if (frequency > maxFreq) {
      res = [sum];
      maxFreq = frequency;
    } else if (frequency === maxFreq) {
      res.push(sum);
    }
  }
  return res;
  
  function dfs(node) {
    if (!node) return 0;
    let sum = node.val + dfs(node.left) + dfs(node.right);
    freq[sum] = (freq[sum] || 0) + 1;
    return sum;
  }
};