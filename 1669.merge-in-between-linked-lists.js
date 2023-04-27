// 1669. Merge In Between Linked Lists
// You are given two linked lists: list1 and list2 of sizes n and m respectively.
// Remove list1's nodes from the ath node to the bth node, and put list2 in their place.


// Solution: In-place

// Find the:
  // a-1th node (previous node)
  // b+1th node (next node)
  // tail of list2
  
// Point the a-1th node to the head of list2.
// Point the tail of list2 to the b+1th node.

// Time Complexity: O(b + m) 202ms
// Space Complexity: O(1) 62.7MB
var mergeInBetween = function(list1, a, b, list2) {
  let prev = null;
  let list1Node = list1, index = 0;
  while (index <= b) {
    if (index === a - 1) prev = list1Node;
    index++;
    list1Node = list1Node.next;
  }
  let next = list1Node;
  
  let list2Node = list2, list2Tail = null;
  while (list2Node) {
    list2Tail = list2Node;
    list2Node = list2Node.next;
  }
  prev.next = list2;
  list2Tail.next = next;
  return list1;
};