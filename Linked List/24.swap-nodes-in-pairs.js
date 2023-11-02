// 24. Swap Nodes in Pairs
// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// function which turns turns an array into a linked list -> ONLY FOR TESTING PURPOSES !
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}

// Solution: Iterative

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 39MB
var swapPairs = function(head) {
  // set a dummy head
  let dummy = new ListNode();
  dummy.next = head;
  let prev = dummy;
  // loop while there are at least two nodes ahead
  while (head && head.next) {
    // get the second node 'next'
    let next = head.next;
    // set prev.next to next
    prev.next = next;
    // set first node's pointer to second node's next
    head.next = next.next;
    // set second node's pointer to first node
    next.next = head;

    // reset prev to head (now head is the last node)
    prev = head;
    // set head to head.next (new pair)
    head = head.next;
  }
  return dummy.next;
};

// Three test cases to run function on
console.log(swapPairs(makeLL([1,2,3,4]))) // [2,1,4,3]
console.log(swapPairs(makeLL([]))) // []
console.log(swapPairs(makeLL([1]))) // [1]