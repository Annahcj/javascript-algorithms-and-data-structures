// 116. Populating Next Right Pointers in Each Node


// Solution: BFS w/ Two Queues

// Edge case: If root is null, return root
// Initiate a queue, start it off with the root
// Loop while queue is not empty *
  // (second queue) let next = []
  // Loop while (queue is not empty) **
    // Let node be queue.shift
    // set node.next to queue[0] (node on the right, or null if node is rightmost node on its level)
    // If node has left child, push node.left into next
    // If node has right child, push node.right into next
  // **
  // Set queue to next
// *
// Return root

// w = max width of tree 
// Time Complexity: O(n) 163ms
// Space Complexity: O(w) 45.4MB 
var connect = function(root) {
  if (!root) return root;
  let queue = [root];
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let node = queue.shift();
      node.next = queue[0];
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
  }  
  return root;
};