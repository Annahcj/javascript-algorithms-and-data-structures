// 429. N-ary Tree Level Order Traversal
// Given an n-ary tree, return the level order traversal of its nodes' values.


// LeetCode provided Node
 function Node(val, children) {
    this.val = val;
    this.children = children;
 };
 
 // Solution 1: BFS Iteratively
 
 // Initiate a queue, start it off with [root, 0] (node, level in tree)
 // Loop while queue is not empty
   // Shift the first item off queue, save the node and level in variables 'curr' and 'level'
   // If result doesn't contain any items with current level yet, push a new array to result.
   // Push current node's value to res[level]
   // If current node has children, loop through children (pointer = i)
     // Push [children[i], level + 1] into queue.
 // Return result.
 
 // Time Complexity: O(n^2) (takes n^2 because shifting off the queue takes O(n)) 96ms
 // Space Complexity: O(n) (queue) 43.8MB
 var levelOrder = function(root) {
   if (!root) return [];
   let res = [];
   let queue = [[root, 0]];
   while (queue.length) {
     let [curr, level] = queue.shift();
     if (!res[level]) res.push([]);
     res[level].push(curr.val);
     let children = curr.children;
     if (children) {
       for (var i = 0; i < children.length; i++) {
         queue.push([children[i], level + 1]);
       }
     }
   }
   return res;
 };
 
 // Solution 2: DFS Iteratively
 
 // The same as bfs, except instead of using a queue, we will use a stack. This will be much more time efficient because we are popping (O(1)) instead of shifting (O(n))
 
 // Time Complexity: O(n) 92ms
 // Space Complexity: O(n) (stack) 43.9MB
 var levelOrder = function(root) {
   if (!root) return [];
   let res = [];
   let stack = [[root, 0]];
   while (stack.length) {
     let [curr, level] = stack.pop();
     if (!res[level]) res.push([]);
     res[level].push(curr.val);
     let children = curr.children;
     if (children) {
       for (var i = children.length - 1; i >= 0; i--) {
         stack.push([children[i], level + 1]);
       }
     }
   }
   return res;
 };
 
 // Solution 3: DFS Recursively
 
 // dfs:
 // If res[level] doesn't exist yet, push a new array to res.
 // push node's value to res[level]
 // If node has children
   // Loop through children and recursively call dfs for each child, level + 1.
 // Return res.
 
 // Time Complexity: O(n) 92ms
 // Space Complexity: O(n) (call stack) 42.3MB
 var levelOrder = function(root) {
   if (!root) return [];
   let res = [];
   dfs(root, 0);
   function dfs(node, level) {
     if (!res[level]) res[level] = [];
     res[level].push(node.val);
     let children = node.children;
     if (children) {
       for (var i = 0; i < children.length; i++) {
         dfs(children[i], level + 1);
       }
     }
   }
   return res;
 };
 
 // A test case to run functions on
 console.log(levelOrder(new Node(1, [new Node(3, [new Node(5), new Node(6)]), new Node(2), new Node(4)]))) // [[1],[3,2,4],[5,6]]