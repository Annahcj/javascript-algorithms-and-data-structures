// 206. Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.

// LeetCode provided ListNode
  function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }

  // Function which makes a singly linked list from an arr (solely for testing purposes)
  function makeList(arr) {
    if (!arr.length) return null;
    let head, node = head = new ListNode(arr[0]);
    for (var i = 1; i < arr.length; i++) {
      node.next = new ListNode(arr[i]);
      node = node.next;
    }
    return head;
  }
  
  
  // Solution 1: Iterative
  
  // Thoughts: 
  // Basically pointing each node's pointers to each node's previous nodes (flipping the pointers)
  // e.g: list: 1 -> 2 -> 3
  // from this to 
  // 1 <- 2 <- 3
  // then return the last node (3)
  
  // Algorithm:
  // Keep a prevNode, set to null at first since the next pointer of the first item of the list should be set to null.
  // Loop through the linked list while node is not null
    // Save the current node's next node in a variable (next) (since we will set current node's next to prevNode, the next node will be overwritten)
    // Set current ndoe's next to prevNode
    // Set prevNode to current node
    // Set current node to next
  // return prevNode
  
  // Time Complexity: O(n) 80ms
  // Space Complexity: O(1) 40.7MB
  var reverseList = function(head) {
    let prevNode = null, node = head;
    while (node) {
      let next = node.next;
      node.next = prevNode;
      prevNode = node;
      node = next;
    }
    return prevNode;  
  };

  
// Solution 2: Recursive

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 41.1MB
var reverseList = function(head) {
  if (!head || !head.next) return head;
  let p = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return p;
};
  
  // Three test cases to run function on
  console.log(reverseList(makeList([1,2,3,4,5]))) // [5,4,3,2,1]
  console.log(reverseList(makeList([1,2]))) // [2,1]
  console.log(reverseList(makeList([]))) // []