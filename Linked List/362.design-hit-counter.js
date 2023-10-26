// 362. Design Hit Counter
// Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
// Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.


// Solution: Linked List

// Note: The timestamps for hits and getHits will be in ascending order.
// Store the timestamps in a singly linked list, keep track of the size.
// hit: add the timestamp to the tail of the list.
// getHits: remove from the head all timestamps that are not within the range of the timestamp.
// return the size of the list after the removals.

// Runtime on LeetCode: 76ms
// Memory Usage on LeetCode: 39MB

var HitCounter = function() {
  this.list = new LinkedList();
};

// T.C: O(1)
HitCounter.prototype.hit = function(timestamp) {
  this.list.insertTail(new Node(timestamp));
};

// T.C: O(n) worst case
HitCounter.prototype.getHits = function(timestamp) {
  let leftRange = timestamp - 300;
  while (this.list.getHead() !== null && this.list.getHead() <= leftRange) {
    this.list.removeHead();
  }
  return this.list.size;
};

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head;
    this.size = 0;
  }
  insertTail(node) {
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  removeHead() {
    this.head.next = this.head.next.next;
    this.size--;
    if (!this.head.next) this.tail = this.head; // if there are no nodes after head, set the tail to be the heda.
  }
  getHead() {
    if (!this.head.next) return Infinity; // if there is no next node, we don't want to remove anything, so return Infinity.
    return this.head.next.val;
  }
}

// A few test cases 
let hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
console.log(hitCounter.getHits(4));   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
console.log(hitCounter.getHits(300)); // get hits at timestamp 300, return 4.
console.log(hitCounter.getHits(301)); // get hits at timestamp 301, return 3.
console.log(hitCounter.getHits(801)); // get hits at timestamp 301, return 3.