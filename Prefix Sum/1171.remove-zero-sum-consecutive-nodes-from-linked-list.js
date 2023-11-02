// 1171. Remove Zero Sum Consecutive Nodes from Linked List
// Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.
// After doing so, return the head of the final linked list.  You may return any such answer.


// Solution: Store Prefix Sum in Hashmap

// Store the prefix sums of the values in a hashmap: {sum: node, sum: node, ...}
// When two prefix sums are equal, we have a segment with a total sum of 0.

// e.g: 1 -> 2 -> 3 -> -2 -> -1 -> 4
// pSum 1    3    6     4     3
// At reaching -1, we find that there are two prefix sums of 3.
// This indicates that the segment of nodes from the node after 2 up to -1 has a total sum of 0.

// We backtrack to node 2
  // 1. Save the next node after this segment
  // 2. Disconnect the end of this segment
  // 3. Remove invalid references from the hashmap (node references from inside the segment)
  // 4. Connect the node before the segment with the node after the segment
  // 5. Jump to the next node.

// Time Complexity: O(n) 121ms
// Space Complexity: O(n) 45.3MB
var removeZeroSumSublists = function(head) {
  let map = new Map();
  let dummy = new ListNode(0);
  map.set(0, dummy);
  dummy.next = head;
  
  let sum = 0;
  while (head) {
    sum += head.val;
    if (map.has(sum)) {
      let prevNode = map.get(sum);
      let nextNode = head.next;
      head.next = null; // disconnect end
      removeRef(prevNode.next, sum); // remove invalid references
      prevNode.next = nextNode; // connect the previous with next
      head = nextNode;
    } else {
      map.set(sum, head); // only store the earliest occurance of a sum
      head = head.next;
    }
  }
  return dummy.next;
  
  // removes all references which point to removed nodes
  function removeRef(node, sum) {
    while (node) {
      let val = node.val;
      sum += val;
      if (map.get(sum) === node) map.delete(sum);
      node = node.next;
    }
  }
};