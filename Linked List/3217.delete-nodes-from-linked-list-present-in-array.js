// 3217. Delete Nodes From Linked List Present in Array
// You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.


// Solution: Hashset & Remove In-Place

// Use a hashset to store the values in nums.
// Remove node references in place by setting prevNode.next = prevNode.next.next

// n = length of nums, m = number of nodes in the linked list
// Time Complexity: O(n + m) 335ms
// Space Complexity: O(n) 96.9MB
function modifiedList(nums, head) {
  let numsSet = new Set(nums);
  let dummyHead = new ListNode(null);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev.next) {
    if (numsSet.has(prev.next.val)) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next; 
    }
  }
  return dummyHead.next;
};