// 725. Split Linked List in Parts
// Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.
// The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.
// The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.
// Return an array of the k parts.

// Solution: Two Passes

// 1. Get the length of the list.
// 2. Split the list into k chunks.
  // The number of nodes in one chunk = Math.ceil(n / k)
  // Update n and k on the fly.

// Time Complexity: O(n + k) 68ms
// Space Complexity: O(k) 44.1MB
var splitListToParts = function(head, k) {
  let n = getSize(head), chunks = [];
  for (let i = k - 1; i >= 0; i--) {
    let chunkSize = Math.ceil(n / k), chunkHead = head;
    for (let j = 1; j < chunkSize; j++) {
      head = head.next;
    }
    if (head) {
      let next = head.next;
      head.next = null; // cut off connection to next chunk
      head = next; 
    }
    chunks.push(chunkHead);
    n -= chunkSize;
    k--;
  }
  return chunks;
};

function getSize(head) {
  let size = 0;
  while (head) {
    size++;
    head = head.next;
  }
  return size;
}