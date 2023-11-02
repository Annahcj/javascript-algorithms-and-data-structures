// 23. Merge k Sorted Lists
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.


// Solution: Min Heap

// 1. Add the heads of each list to the min heap.
// 2. Loop while the heap is not empty
  // remove smallest node
  // set it as the next node in the new list
  // set node to next node
  // if the smallest node has a next node, add it to the heap.

// Time Complexity: O(n log(k)) 108ms
// Space Complexity: O(n) 48.7MB
var mergeKLists = function(lists) {
  let head = new ListNode(0); // dummy head
  let node = head;
  let heap = new Heap((a, b) => a.val - b.val); // min heap by the values of the nodes
  for (let list of lists) {
    if (list) { // if the heads are not null, add them to the heap
      heap.add(list);
    }
  }
  while (!heap.isEmpty()) {
    let min = heap.remove(); // remove smallest node from the heap
    node.next = min; // set it as the next node in the list
    node = node.next; // set node to next node
    if (min.next) heap.add(min.next); // if the smallest node has a next node, add it to the heap.
  }
  return head.next;
};

// Priority Queue with a comparator 
class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
}