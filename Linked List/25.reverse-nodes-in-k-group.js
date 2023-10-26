// 25. Reverse Nodes in k-Group
// Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
// You may not alter the values in the list's nodes, only nodes themselves may be changed.

// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// generates a linked list from an array (TESTING PURPOSES ONLY!)
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}

// Solution: Iterative

// 1. Loop forward and check to make sure we have at least k nodes ahead of us
// 2. 
  // Enough nodes ahead: reverse the next k nodes
  // Not enough: break out of the loop 

// Time Complexity: O(n) 113ms
// Space Complexity: O(1) 42MB
var reverseKGroup = function(head, k) {
  let prev = new ListNode(), orig = prev;
  prev.next = head;
  while (head) {
    let count = 0;
    let node = head;
    // count the number of nodes ahead
    while (node && count < k) {
      count++;
      node = node.next;
    }
    // if we have at least k nodes ahead
    if (count === k) {
      // reverse the next k nodes, set prev to the new tail (old head of the group we just reversed)
      prev = reverse(prev, head, node);
      // (node is now the next group to consider, to set head to node)
      head = node;
    } else {
      // otherwise if we don't have enough nodes, simply connect the group to prev and break out of the loop
      prev.next = head;
      break;
    }
  }
  return orig.next;

 // reverses the pointers, and returns the old head
  function reverse(previous, node, endNode) {
    let prev = null;
    let curr = node;
    let newTail = node;
    // reverse nodes in the group
    while (curr !== endNode) {
      let nextNode = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextNode;
    }
    // connect the newly reversed group to the previous nodes
    previous.next = prev;
    // return the old head, now the new tail
    return newTail;
  }
};

// Four test cases to run function on
console.log(reverseKGroup(makeLL([1,2,3,4,5]), 2)) // [2,1,4,3,5]
console.log(reverseKGroup(makeLL([1,2,3,4,5]), 3)) // [3,2,1,4,5]
console.log(reverseKGroup(makeLL([1,2,3,4,5]), 1)) // [1,2,3,4,5]
console.log(reverseKGroup(makeLL([1]), 1)) // [1]