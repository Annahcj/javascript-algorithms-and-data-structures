// 428. Serialize and Deserialize N-ary Tree

// LeetCode provided Node
function Node(val, children) {
  this.val = val;
  this.children = children;
};

// Runtime on LeetCode: 108ms
// Memory Usage on LeetCode: 46.5MB

// Solution: Iterative BFS

// For a tree           1
//                     / \
//                    2   3
//                       / \
//                      4   5

// we would serialize into -> '1,2,3,#,#,4,5,#,#,#,'
// using iterative bfs with a queue to keep track of the next node to process.
// # determines the end of a group of children even if there are no children.


// to deserialize, we would use:
  // 1. a queue to keep track of the next node to add children to.
  // 2. the root, with the value of the first item in the data.

  // loop while the queue is not empty
    // take the leftmost node 'node' from the queue
    // if leftmost value from data is #, 
      // take it out of data and continue.
    // loop while leftmost value in data is not #,
      // create a new node with the value of data.unshift()
      // add the new node as a child of node
      // push new node into the queue
    // take out the leftmost value in the queue (since we are finished with this group of children).
    
// Now, root will be fully populated.

// Time Complexity: O(n)
// Space Complexity: O(n)

class Codec {
  	constructor() {
        
    }
    
    serialize = function(root) {
      let str = "";
      if (!root) return str;
      let queue = [root];
      while (queue.length) {
        let node = queue.shift();

        if (node === '#') {
          str += '#,';
          continue;
        }
        str += node.val + ",";
        for (var child of node.children) {
          queue.push(child);
        }
        queue.push("#");
      }
      return str;
    };
	
    deserialize = function(data) {
      if (!data.length) return null;
      data = data.split(",");
      data.pop();
      let root = new Node(+data.shift(), []);
      let queue = [root];
      while (queue.length) {
        let node = queue.shift();
        if (data[0] === '#') {
          data.shift();
          continue;
        }
        while (data.length && data[0] !== '#') {
          let newNode = new Node(+data.shift(), []);
          node.children.push(newNode);
          queue.push(newNode);
        }
        data.shift(); 
      }
      return root;
    };
}