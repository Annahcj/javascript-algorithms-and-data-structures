// 1669. Merge In Between Linked Lists
// You are given two linked lists: list1 and list2 of sizes n and m respectively.
// Remove list1's nodes from the ath node to the bth node, and put list2 in their place.


// Solution: In-place Modification

// Find the:
  // a-1th node (previous node)
  // b+1th node (next node)
  // tail of list2
  
// Point the a-1th node to the head of list2.
// Point the tail of list2 to the b+1th node.

// m = number of nodes in list2
// Time Complexity: O((b - a) + m) 149ms
// Space Complexity: O(1) 61.7MB
var mergeInBetween = function(list1, a, b, list2) {
  let prev = null, node = list1;
  for (let i = 0; i <= b; i++) {
    if (i === a - 1) prev = node;
    node = node.next;
  }
  let list2End = list2;
  while (list2End.next) {
    list2End = list2End.next;
  }
  prev.next = list2;
  list2End.next = node;
  return list1;
};