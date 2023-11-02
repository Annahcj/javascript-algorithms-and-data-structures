// 2074. Reverse Nodes in Even Length Groups
// You are given the head of a linked list.
// The nodes in the linked list are sequentially assigned to non-empty groups whose lengths form the sequence of the natural numbers (1, 2, 3, 4, ...). The length of a group is the number of nodes assigned to it. In other words,
  // The 1st node is assigned to the first group.
  // The 2nd and the 3rd nodes are assigned to the second group.
  // The 4th, 5th, and 6th nodes are assigned to the third group, and so on.
// Note that the length of the last group may be less than or equal to 1 + the length of the second to last group.
// Reverse the nodes in each group with an even length, and return the head of the modified linked list.


// Solution: Constant Space 

// Keep track of the tail of the previous group.
// When we reach the end of a group,
  // If the group size was even, reverse the group and connect prevGroupTail -> new head after reversal and set prevGroupTail to be the old head.
  // If the group size was odd, connect prevGroupTail -> group's head and set prevGroupTail to be the group's tail.

// Time Complexity: O(n) 836ms
// Space Complexity: O(1) 133.1MB
var reverseEvenLengthGroups = function(head) {
  let dummy = new ListNode();
  dummy.next = head;
  let groupSize = 1, prevGroupTail = dummy;
  while (head) {
    let oldGroupHead = head, i = 1;
    while (head.next && i < groupSize) {
      head = head.next;
      i++;
    }
    let next = head.next;
    head.next = null;
    let groupTail = head;
    if (i % 2 === 0) {
      let newHead = reverse(oldGroupHead);
      prevGroupTail.next = newHead;
      prevGroupTail = oldGroupHead;
    } else {
      prevGroupTail.next = oldGroupHead;
      prevGroupTail = groupTail;
    }
    head = next;
    groupSize++;
  }
  return dummy.next;
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