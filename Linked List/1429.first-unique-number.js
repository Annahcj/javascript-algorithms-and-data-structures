// 1429. First Unique Number
// You have a queue of integers, you need to retrieve the first unique integer in the queue.
// Implement the FirstUnique class:
  // FirstUnique(int[] nums) Initializes the object with the numbers in the queue.
  // int showFirstUnique() returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.
  // void add(int value) insert value to the queue.


// Solution: Doubly Linked List & Hashmap

// 1. Keep a doubly linked list to maintain order of items ('unique')
// 2. Use a hashmap to store unique nodes -> {value: node in dll} ('map')

// When adding a number,
  // if the map doesn't contain the number,
    // create a new node 
    // add the node to the dll
    // add number to the map with a value of the new node
  // if the map contains the number,
    // get the node associated to the number
    // remove the node from the dll

// Initial Set-up:
// Time Complexity: O(n) 
// Space Complexity: O(n)
var FirstUnique = function(nums) {
  this.unique = new DoublyLinkedList();
  this.map = new Map();
  for (var num of nums) {
    this.add(num);
  }
};

// showFirstUnique:
// Time Complexity: O(1)
// Space Complexity: O(1)
FirstUnique.prototype.showFirstUnique = function() {
  if (this.unique.isEmpty()) return -1;
  return this.unique.head.next.val;  
};

// add:
// Time Complexity: O(1)
// Space Complexity: O(1)
FirstUnique.prototype.add = function(value) {
  if (!this.map.has(value)) {
    let newNode = new Node(value);
    this.unique.insertTail(newNode);
    this.map.set(value, newNode);
  } else {
    let node = this.map.get(value);
    this.unique.removeNode(node);
  }
};

// Doubly Linked List
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  insertHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
  insertTail(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
  removeHead() {
    let head = this.head.next;
    this.removeNode(head);
    return head.val;
  }
  removeNode(node) {
    if (!node.prev && !node.next) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }
  removeTail() {
    let tail = this.tail.prev;
    this.removeNode(tail);
    return tail.val;
  }
  isEmpty() {
    return this.head.next.val === null;
  }
}

// A few test cases
let firstUnique = new FirstUnique([809]);
console.log(firstUnique.showFirstUnique()); // return 809
firstUnique.add(809);          // the queue is now [809,809]
console.log(firstUnique.showFirstUnique()); // return -1