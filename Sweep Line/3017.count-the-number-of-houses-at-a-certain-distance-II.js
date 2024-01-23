// 3017. Count the Number of Houses at a Certain Distance II
// You are given three positive integers n, x, and y.
// In a city, there exist houses numbered 1 to n connected by n streets. There is a street connecting the house numbered i with the house numbered i + 1 for all 1 <= i <= n - 1 . An additional street connects the house numbered x with the house numbered y.
// For each k, such that 1 <= k <= n, you need to find the number of pairs of houses (house1, house2) such that the minimum number of streets that need to be traveled to reach house2 from house1 is k.
// Return a 1-indexed array result of length n where result[k] represents the total number of pairs of houses such that the minimum streets required to reach one house from the other is k.
// Note that x and y can be equal.


// Solution: Line Sweep

// Use line sweep to get range updates in O(1) time, accumulating them with prefix sum at the end to get the actual values.

// Split the houses into three segments: 
  // 1. The left part (nodes outside of the loop, on the left)
  // 2. The loop (nodes in (x, y))
  // 3. The right part (nodes outside of the loop on the right)

// Three scenarios to cover:
  // 1. From the left:
    // Left nodes -> other left nodes
    // Left nodes -> right nodes
  // 2. From the loop:
    // Loop nodes -> left nodes
    // Loop nodes -> other loop nodes
    // Loop nodes -> right nodes
  // 3. From the right:
    // Right nodes -> other right nodes
    // (right -> left was covered from the left side already)

// Time Complexity: O(n) 238ms
// Space Complexity: O(n) 70.8MB
var countOfPairs = function(n, x, y) {
  if (x > y) {
    let temp = x;
    x = y, y = temp;
  }
  let loopSize = y - x + 1;
  let sum = Array(n + 1).fill(0);
  if (y - x <= 1) {
    for (let node = 1; node < n; node++) {
      sum[1] += 2;
      sum[n - node + 1] -= 2;
    }
  } else {
    let rightNodes = n - y;
    for (let left = 1; left < x; left++) {
      // left node -> other left nodes
      // distance from node `left` to every other left node where node > `left`
      let remainingNodesLeft = x - left - 1;
      sum[1] += 2;
      sum[remainingNodesLeft + 1] -= 2;
      
      // left node -> all right nodes
      // distance from:
        // left -> last left node (x - left - 1)
        // last left node -> loop start -> loop end -> first right node (3)
      let distToLastLeftNode = Math.max(0, x - left - 1);
      let startDistToRight = 3 + distToLastLeftNode;
      sum[startDistToRight] += 2;
      sum[startDistToRight + rightNodes] -= 2;
    }
    
    // right nodes -> other right nodes
    // same calculation, distance from current node to all other right nodes where node > right
    for (let right = y + 1; right < n; right++) {
      let remainingNodesRight = n - right;
      sum[1] += 2;
      sum[remainingNodesRight + 1] -= 2;
    }
    
    // loop nodes
    let leftNodes = x - 1;
    for (let node = x; node <= y; node++) {
      // loop nodes -> other loop nodes
      // visualize a circle, the distances from one node to other nodes are consistent no matter which node we start from in the circle
      // if the loop size is odd, count every pair of symmetrical nodes in the circle, starting from node
      // if the loop size is even, there will be one node left at the end instead of a pair
      if (loopSize % 2 === 1) {
        sum[1] += 2;
        sum[Math.floor(loopSize / 2) + 1] -= 2;
      } else {
        sum[1] += 2;
        sum[loopSize / 2]--;
        sum[(loopSize / 2) + 1]--;
      }
      
      // loop nodes -> left nodes
      // find the shortest distance to get to the loop start node, then get the distances to other left nodes from there
      let distToLeft = 1 + Math.min(node - x, y - node + 1);
      sum[distToLeft] += 2;
      sum[distToLeft + leftNodes] -= 2;
      
      // loop nodes -> right nodes
      // find the shortest distance to get to the loop end node, then get the distances to other right nodes from there
      let distToRight = 1 + Math.min(y - node, node - x + 1);
      sum[distToRight] += 2;
      sum[distToRight + rightNodes] -= 2;
    }
  }
    
  // accumulate end values using prefix sum
  for (let i = 1; i <= n; i++) {
    sum[i] += sum[i - 1];
  }
  sum.shift();
  if (sum.length > n) sum.pop();
  return sum;
};

// Three test cases
console.log(countOfPairs(3, 1, 3)) // [6,0,0]
console.log(countOfPairs(5, 2, 4)) // [10,8,2,0,0]
console.log(countOfPairs(4, 1, 1)) // [6,4,2,0]