// 445. Add Two Numbers II
// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.


// Solution 1: Reverse, Add Nums, Build List.

// 1. Reverse l1 and l2
// 2. Add each digit of l1 and l2 together and add a new listnode to the front of our final list.

// Time Complexity: O(n + m) 138ms
// Space Complexity: O(1) (excluding output) 47.6MB
var addTwoNumbers = function(l1, l2) {
  l1 = reverse(l1), l2 = reverse(l2);
  let carry = 0, head = null;
  while (l1 || l2) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let sum = val1 + val2 + carry, take = sum % 10;
    carry = sum > 9 ? 1 : 0;
    
    let newNode = new ListNode(take);
    newNode.next = head;
    head = newNode;
    
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  
  if (carry) {
    let newNode = new ListNode(1);
    newNode.next = head;
    head = newNode;
  }
  return head;
  
  function reverse(node) {
    let prev = null;
    while (node) {
      let next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  }  
};

// Solution 2: Two Stacks

// 1. Add each value of l1 to a stack 'stack1'.
// 2. Add each value of l2 to a stack 'stack2'.
// 3. Add the digits of stack1 and stack2 from back to front and add a new listnode to the front of our final list.

// Time Complexity: O(n + m) 162ms
// Space Complexity: O(n + m) 47.6MB
var addTwoNumbers = function(l1, l2) {
  let stack1 = [], stack2 = [];
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }

  let digits = [], carry = 0;
  while (stack1.length || stack2.length) {
    let digit1 = stack1.length ? stack1.pop() : 0;
    let digit2 = stack2.length ? stack2.pop() : 0;
    let sum = digit1 + digit2 + carry, take = sum % 10;
    carry = sum > 9 ? 1 : 0;
    digits.push(take);
  }
  if (carry) digits.push(1);

  let node = new ListNode(0), head = node;
  for (var i = digits.length - 1; i >= 0; i--) {
    let newNode = new ListNode(digits[i]);
    node.next = newNode;
    node = node.next;
  }
  return head.next;
};