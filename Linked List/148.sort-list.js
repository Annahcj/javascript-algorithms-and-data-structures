// 148. Sort List
// Given the head of a linked list, return the list after sorting it in ascending order.


// Solution: Merge Sort

// 1. If there is only one node, return the node.
// 2. Otherwise, find the middle node and break off the middle connection.
// 3. Recursively call mergeSort for the two halves.
// 4. Merge the two halves together by reordering the pointers.

// Time Complexity: O(n log(n)) 167ms
// Space Complexity: O(log(n)) recursive calls 58.3MB
var sortList = function(head) {
  if (!head) return null;
  return mergeSort(head);
  
  function mergeSort(head) {
    if (!head.next) return head;
    let rightHead = getMid(head);
    
    let left = mergeSort(head);
    let right = mergeSort(rightHead);
    return merge(left, right);
  }
  
  function merge(left, right) {
    let dummy = new ListNode(null), newList = dummy;
    while (left && right) {
      if (right.val < left.val) {
        newList.next = right;
        right = right.next;
      } else {
        newList.next = left;
        left = left.next;
      }
      newList = newList.next;
      newList.next = null; // cut off extra connections
    }
    if (left) newList.next = left;
    if (right) newList.next = right;
    return dummy.next;
  }
  
  // find the node before the middle node using Floyd's Slow and Fast Pointers Algorithm.
  function getMid(head) {
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    let rightHead = slow.next;
    slow.next = null; // break off the middle link
    return rightHead;
  }
};