// 1290. Convert Binary Number in a Linked List to Integer
// Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.
// Return the decimal value of the number in the linked list.

// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// Creates a linked list from an array (TESTING PURPOSES ONLY!)
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}

// Solution: Bit Manipulation

// Set ans to head.val.
// Set head to head.next
// Loop while head is not null
  // left shift all bits in ans by 1
  // If head.val is 1, set the last bit of ans to 1, otherwise set it to 0.
  // set head to head.next
// Return ans.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 38.8MB
var getDecimalValue = function(head) {
  let ans = head.val;
  head = head.next;
  while (head) {
    ans <<= 1;
    ans |= head.val;
    head = head.next;
  }
  return ans;
};

// Three test cases to run function on
console.log(getDecimalValue(makeLL([1,0,1]))) // 5
console.log(getDecimalValue(makeLL([0,0]))) // 0
console.log(getDecimalValue(makeLL([1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]))) // 18880