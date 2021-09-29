// 725. Split Linked List in Parts
// Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.
// The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.
// The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.
// Return an array of the k parts.

// LeetCode provided ListNode
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// Function which turns an array into a linked list - FOR TESTING PURPOSES ONLY!
function makeLL(arr) {
  let head = new ListNode(), node = head;
  for (var num of arr) {
    node.next = new ListNode(num);
    node = node.next;
  }
  return head.next;
}


// Solution: 

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.2MB (the output we return, can be considered O(1) since output is compulsory)
var splitListToParts = function(head, k) {
  let length = 0;
  let node = head;
  // get length of the linked list
  while (node) {
    length++;
    node = node.next;
  }
  // extra: parts that need to be 1 node longer, size: smaller size of each part (for the nodes with extra length, add one)
  let extra = (length % k) - 1, size = Math.floor(length / k);
  let res = [];
  for (var i = 0; i < k; i++) {
    // listSize: size of current list
    let listSize = size, list = new ListNode(), ref = list;
    if (i <= extra) listSize++;
    let j = 0;
    // loop through the ll and add it to the new list
    while (j < listSize && head) {
      list.next = new ListNode(head.val);
      list = list.next;
      head = head.next;
      j++;
    }
    // push the new part into res
    res.push(ref.next);
  }
  return res;
};

// Two test cases to run function on
console.log(splitListToParts(makeLL([1,2,3]), 5)) // [[1],[2],[3],[],[]]
console.log(splitListToParts(makeLL([1,2,3,4,5,6,7,8,9,10]), 3)) // [[1,2,3,4],[5,6,7],[8,9,10]]