// 203. Remove Linked List Elements
// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

// generates a linked list from an array (TESTING PURPOSES ONLY)
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}

// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// Solution: 

// loop while node is not null
  // loop while the value of the next node is equal to val and next is not null
    // remove next node
  // set node to node.next

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 43.9MB
var removeElements = function(head, val) {
  // create dummy head 
  let dummyHead = new ListNode();
  let node = dummyHead;
  node.next = head;
  while (node) {
    while (node.next && node.next.val === val) {
      node.next = node.next.next;
    }
    node = node.next;
  }
  return dummyHead.next;
};

// Three test cases to run function on
console.log(removeElements(makeLL([1,2,6,3,4,5,6]), 6)) // [1,2,3,4,5]
console.log(removeElements(makeLL([]), 1)) // []
console.log(removeElements(makeLL([7,7,7,7]), 7)) // []