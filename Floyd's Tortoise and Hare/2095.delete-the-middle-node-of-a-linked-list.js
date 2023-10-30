// 2095. Delete the Middle Node of a Linked List
// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

// generates a linked list from an array (TESTING PURPOSES ONLY!)
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (let num of arr) {
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

// Solution 1: Brute Force

// 1. Loop through the list and get the length of it: length = n
// 2. Get the index of the node we want to delete: mid = Math.floor(n / 2)
// 3. Loop through the list until we get to the node before the mid point, and set node.next to node.next.next.

// Time Complexity: O(n) 882ms
// Space Complexity: O(1) 120.6MB 
var deleteMiddle = function(head) {
  let n = 0;
  let node = head;
  while (node) {
    n++;
    node = node.next;
  } 
  let mid = Math.floor(n / 2);
  if (n === 1) return null;
  node = head;
  let idx = 0;
  while (node) {
    if (idx === mid - 1) {
      node.next = node.next.next;
      return head;
    }
    idx++;
    node = node.next;
  }
};

// Solution 2: Slow & Fast Pointers

// Set two pointers: slow & fast
// Set slow to head, fast to head.next.
// Each time, the fast pointer moves forward two steps and the slow pointer moves forward one step.
// When the fast pointer reaches the end, set slow.next to slow.next.next and return head.

// Time Complexity: O(n) 836ms
// Space Complexity: O(1) 81.3MB
var deleteMiddle = function(head) {
  if (!head.next) return null;
  let slow = head, fast = head.next;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  slow.next = slow.next.next;
  return head;
};

// Three test cases
console.log(deleteMiddle(makeLL([1,3,4,7,1,2,6]))) // [1,3,4,1,2,6]
console.log(deleteMiddle(makeLL([1,2,3,4]))) // [1,2,4]
console.log(deleteMiddle(makeLL([2,1]))) // [2]