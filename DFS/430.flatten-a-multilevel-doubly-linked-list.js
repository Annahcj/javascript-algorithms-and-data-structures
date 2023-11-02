// 430. Flatten a Multilevel Doubly Linked List
// You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.
// Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.


// Solution: Iterative DFS

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 40.3MB
var flatten = function(head) {
  if (!head) return null;
  let stack = [head];
  let prev = null;
  while (stack.length) {
    let curr = stack.pop();
    // update prev for curr, and next for prev.
    if (prev) {
      curr.prev = prev;
      prev.next = curr;
    }
    // push next first, then push child (so that child will be processed first)
    if (curr.next) stack.push(curr.next);
    if (curr.child) {
      stack.push(curr.child);
      curr.child = null;
    }
    // update prev pointer
    prev = node;
  }
  return head;
};