// 3547. Maximum Sum of Edge Values in a Graph
// You are given an undirected connected graph of n nodes, numbered from 0 to n - 1. Each node is connected to at most 2 other nodes.
// The graph consists of m edges, represented by a 2D array edges, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi.
// You have to assign a unique value from 1 to n to each node. The value of an edge will be the product of the values assigned to the two nodes it connects.
// Your score is the sum of the values of all edges in the graph.
// Return the maximum score you can achieve.


// Solution: Greedy

// There are only two different types of graphs that match the condition that each node is connected to at most 2 other nodes:
  // 1. A straight line: edges.length is equal to n - 1
  // 2. A connected circle: edges.length is equal to n

// When assigning node values, it's optimal to group the largest numbers together to get the maximum product.
// If the graph is a straight line, we need to position the largest number in the middle of the line.
// This is because the second and third largest numbers will be right next to the largest number, which means we want to use those larger numbers as much as possible.
// Hence they shouldn't be close to the edge, otherwise we waste those large values.

// 1. On a straight line:
  // Assign the largest value to Math.floor(n / 2).
  // From there, assign the second largest to the left side (if n is even, there will be one more space on the left than the right).
  // From there, we alternate between assigning to the right and left in decreasing values until we assign all values.
// 2. On a connected circle:
  // It doesn't matter where we start.
  // Pick any position, then greedily assign the remaining values in decreasing order, next to the current largest value.

// In fact, we can assign values for both cases in the same way, the only difference is adding the last edge's weight if it's a circular graph.

// Time Complexity: O(n) 7ms
// Space Complexity: O(1) 83MB
function maxScore(n, edges) {
  let left = n, right = n, product = 0;
  for (let i = n - 1; i >= 1; i -= 2) {
    product += left * i;
    left = i;
    if (i - 1 >= 1) {
      product += right * (i - 1);
      right = i - 1;
    }
  }
  // if circularly connected, add the edge that connects it circularly
  return product + (edges.length === n ? left * right : 0);
};

// Two test cases
console.log(maxScore(4, [[0,1],[1,2],[2,3]])) // 23
console.log(maxScore(6, [[0,3],[4,5],[2,0],[1,3],[2,4],[1,5]])) // 82