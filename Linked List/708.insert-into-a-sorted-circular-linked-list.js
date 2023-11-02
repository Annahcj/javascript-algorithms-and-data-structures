// 708. Insert into a Sorted Circular Linked List
// Given a Circular Linked List node, which is sorted in ascending order, write a function to insert a value insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list and may not necessarily be the smallest value in the circular list.
// If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.
// If the list is empty (i.e., the given node is null), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the originally given node.


// Situations to insert the new node:
// 1. node 1 is bigger than node 2:
  // a. if insertVal is smaller than or equal to node 2
  // b. if insertVal is bigger than or equal to node 1
// 2. insertVal is bigger than or equal to node1 and smaller than or equal to node 2
// 3. we have completed a complete cycle: node2 is equal to head

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 40MB
var insert = function(head, insertVal) {
  let newNode = new Node(insertVal);
  if (!head) {
    newNode.next = newNode;
    return newNode;
  }
  if (head.next === head) {
    head.next = newNode;
    newNode.next = head;
    return head;
  }
  let node1 = head, node2 = head.next;
  while (true) {
    if (node1.val > node2.val) {
      if (insertVal <= node2.val || insertVal >= node1.val) {
        insertNode(node1, node2, newNode); 
        break;
      }
    } else if (node1.val <= insertVal && node2.val >= insertVal) {
      insertNode(node1, node2, newNode);
      break;
    } else if (node2 === head) {
      insertNode(node1, node2, newNode);
      break;
    }
    node1 = node1.next;
    node2 = node2.next;
  }
  return head;

  function insertNode(node1, node2, newNode) {
    node1.next = newNode;
    newNode.next = node2;
  }
};