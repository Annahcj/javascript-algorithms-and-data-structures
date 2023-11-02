// 364. Nested List Weight Sum II
// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
// The weight of an integer is maxDepth - (the depth of the integer) + 1.
// Return the sum of each integer in nestedList multiplied by its weight.


// Solution: Two Pass Recursive DFS

// 1. Recursively DFS to get the max depth of the list.
// 2. Recursively DFS to find each integer in the list, and add integer * (maxDepth - depth + 1) to the total sum.

// d = maximum depth of the list
// Time Complexity: O(n) 72ms
// Space Complexity: O(d) 40.2MB
var depthSumInverse = function(nestedList) {
  let maxDepth = 1, sum = 0;
  getMaxDepth(nestedList, 1);
  getSum(nestedList, 1);
  return sum;

  function getMaxDepth(list, depth) {
    maxDepth = Math.max(maxDepth, depth);
    for (var item of list) {
      if (!item.isInteger()) {
        getMaxDepth(item.getList(), depth + 1);
      }
    }
  }  
  function getSum(list, depth) {
    for (var item of list) {
      if (!item.isInteger()) {
        getSum(item.getList(), depth + 1);
      } else {
        sum += item.getInteger() * (maxDepth - depth + 1);
      }
    }
  }
};