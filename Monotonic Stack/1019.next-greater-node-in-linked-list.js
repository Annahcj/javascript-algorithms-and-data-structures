// 1019. Next Greater Node In Linked List
// You are given the head of a linked list with n nodes.
// For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.
// Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.


// Solution: Monotonic Decreasing Stack

// 1. Convert linked list to array of values.
// 2. Go through the values backwards and maintain a monotonic decreasing stack.
  // There is no point keeping smaller or equal numbers that are at a later index.

// Time Complexity: O(n) 132ms
// Space Complexity: O(n) 52.7MB
var nextLargerNodes = function(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  
  let n = arr.length, res = Array(n).fill(0), stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) stack.pop();
    if (stack.length) {
      res[i] = stack[stack.length - 1];
    }
    stack.push(arr[i]);
  }
  return res;
};