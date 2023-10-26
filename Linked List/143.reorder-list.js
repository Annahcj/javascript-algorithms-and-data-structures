// 143. Reorder List

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

// Solution: Two Pointers, Reverse Second Half, Merge Together

// This problem can be solved with a combination of three techniques.

// 1. Find the mid-point (if length is even, the second node)
  // Use slow & fast runner algorithm to find the mid-point
// 2. Reverse the second-half
// 3. Merge the two lists back together

// Time Complexity: O(n) 112ms
// Space Complexity: O(1) 46.9MB
var reorderList = function(head) {
  // find mid-point (start of second half)
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse second-half 
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

  let list2 = reverse(slow), list1 = head;
  // merge back
  while (list1.next && list2.next) {
    let list1Next = list1.next;
    let list2Next = list2.next;
    list1.next = list2;
    list2.next = list1Next;
    list1 = list1Next;
    list2 = list2Next;
  }
  return head;  
};

// Two test cases to run function on
console.log(reorderList(makeLL([1,2,3,4]))) // [1,4,2,3]
console.log(reorderList(makeLL([1,2,3,4,5]))) // [1,5,2,4,3]