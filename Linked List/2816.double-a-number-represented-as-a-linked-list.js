// 2816. Double a Number Represented as a Linked List
// You are given the head of a non-empty linked list representing a non-negative integer without leading zeroes.
// Return the head of the linked list after doubling it.


// Solution 1: Reverse Twice 

// 1. Reverse the list. 
// 2. Go through the reversed list, doubling the value and keeping the carry from the previous node.
// 3. At the end, create a new node if the carry > 0.
// 4. Return the list again and return it.

// Time Complexity: O(n) 166ms
// Space Complexity: O(1) 57.4MB
var doubleIt = function(head) {
  head = reverse(head);
  let carry = 0, node = head;
  while (node) {
    let sum = node.val + node.val + carry;
    let newValue = sum % 10;
    carry = sum > 9 ? 1 : 0;
    node.val = newValue;
    prev = node;
    node = node.next;
  }
  let reversedHead = reverse(head);
  if (carry > 0) {
    const newHead = new ListNode(carry);
    newHead.next = reversedHead;
    reversedHead = newHead;
  }
  return reversedHead;
};

function reverse(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

// Solution 2: Without Reversing

// One thing to notice is that the carry never exceeds 1.
// This means that we can look at the next node's value to figure out the carry for the current node.
// If the next node's value >= 5, we have carry.

// Time Complexity: O(n) 171ms
// Space Complexity: O(1) 57.5MB
var doubleIt = function(head) {
  let node = head, headHasCarry = head.val >= 5;
  while (node) {
    let carry = node.next ? (node.next.val >= 5 ? 1 : 0) : 0;
    let sum = node.val + node.val + carry;
    let newValue = sum % 10;
    node.val = newValue;
    node = node.next;
  }
  if (headHasCarry) {
    let newHead = new ListNode(1);
    newHead.next = head;
    head = newHead;
  }
  return head;
};