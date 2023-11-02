// 339. Nested List Weight Sum
// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth.
// Return the sum of each integer in nestedList multiplied by its depth.


// Solution: Recursive DFS

// Recursively DFS through the list, keeping track of the depth.
// For each item, check whether it is an integer or a nested list.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 39.5MB
var depthSum = function(nestedList, depth=1) {
  let sum = 0;
  for (var int of nestedList) {
    if (int.isInteger()) sum += int.getInteger() * depth;
    else sum += depthSum(int.getList(), depth + 1);
  }  
  return sum;
};

// Solution 2: Iterative DFS

// An iterative DFS using a stack.
// Both recursive and iterative take up the same space and time.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 39.4MB
var depthSum = function(nestedList) {
  let sum = 0, stack = [[nestedList, 1]];
  while (stack.length) {
    let [list, depth] = stack.pop();
    for (var int of list) {
      if (int.isInteger()) sum += int.getInteger() * depth;
      else stack.push([int.getList(), depth + 1]);
    }
  }
  return sum;
};

// Solution 3: BFS

// Alternatively, we could use a queue to bfs through and keep a global depth counter which we increment after going through each item in a level.
// Since .shift() takes O(n) for a JavaScript array, we can use .pop() (which takes O(1)) because the order does not affect the level.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 39.4MB
var depthSum = function(nestedList) {
  let sum = 0, queue = [nestedList];
  let depth = 1;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let list = queue.pop();
      for (var int of list) {
        if (int.isInteger()) sum += int.getInteger() * depth;
        else next.push(int.getList());
      }
    }
    queue = next;
    depth++;
  }
  return sum;
};