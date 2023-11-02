// 2807. Insert Greatest Common Divisors in Linked List
// Given the head of a linked list head, in which each node contains an integer value.
// Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.
// Return the linked list after insertion.
// The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.


// Solution: 

// Go through each adjacent pair of nodes and add a new node with the GCD value between them.

// Time Complexity: O(n) 85ms
// Space Complexity: O(n) 50.6MB
var insertGreatestCommonDivisors = function(head) {
  let node = head;
  while (node && node.next) {
    let gcd = getGCD(node.val, node.next.val);
    let nextNode = node.next;
    node.next = new ListNode(gcd);
    node.next.next = nextNode;
    node = nextNode;
  }
  return head;
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}