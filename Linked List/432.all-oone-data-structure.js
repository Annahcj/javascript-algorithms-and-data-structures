// 432. All O`one Data Structure
// Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.


// Solution: Doubly Linked List & Hashmap

// words: (key: count, value: doubly linked list)
// count: (key: word, value: count)
// nodes: (key: word, value: node)
// minKey: keeps track of the current minKey
// maxKey: keeps track of the current maxKey

// Detailed comments for inc and dec down below.

var AllOne = function() {
  this.words = new Map(); // words[i] = new DoublyLinkedList()
  this.count = new Map(); // key: word, value: count
  this.nodes = new Map(); // key: word, value: node in list
  this.minKey = 0;
  this.maxKey = 0;
};

// inc:
// if new key, 
  // create new node
  // insert in count with value 1
  // insert newNode to nodes map
  // if words[1] is undefined, create a new DoublyLinkedList there
  // insert the newNode at the end of words[1]
  // set minKey to 1 (smallest possible).
// otherwise, 
  // get node from nodes map
  // get count of node from count map
  // remove node from old list (count)
  // if old map is empty and minKey was equal to count, increase minKey
  // increase count
  // add count back to count map
  // if words[count] is undefined, set words[count] to a new dll
  // add node to words[count]
// set maxKey = Math.max(maxKey, count)

AllOne.prototype.inc = function(key) {
  if (!this.count.has(key)) {
    this.count.set(key, 1);
    let newNode = new Node(key);
    this.nodes.set(key, newNode);

    if (!this.words.has(1)) this.words.set(1, new DoublyLinkedList());
    this.words.get(1).insertTail(newNode);

    this.minKey = 1;
  } else {
    let node = this.nodes.get(key);
    let count = this.count.get(key);
    this.words.get(count).removeNode(node);
    if (this.words.get(count).size === 0 && this.minKey === count) this.minKey++;

    count++;
    this.count.set(key, count);
    if (!this.words.has(count)) this.words.set(count, new DoublyLinkedList());
    this.words.get(count).insertTail(node);
  }
  this.maxKey = Math.max(this.maxKey, this.count.get(key));
};

// dec:

// get the count from this.count
// get the node from this.nodes
// remove from old dll
// decrement count

// if count is bigger than 0, 
  // if words[count] is undefined, set it to a new DoublyLinkedList()
  // add node to tail of words[count]
  // update count[key] to count
// otherwise, delete the count and node.

// if count is equal to maxKey AND old dll is empty, decrement maxKey.
// if count is equal to minKey AND old dll is empty, decrement minKey, then find next minKey while smaller than maxKey (increment back up)

AllOne.prototype.dec = function(key) {
  let count = this.count.get(key), node = this.nodes.get(key);
  this.words.get(count).removeNode(node);
  let prevCount = count;
  count--;
  if (count > 0) {
    if (!this.words.has(count)) this.words.set(count, new DoublyLinkedList());
    this.words.get(count).insertTail(node);
    this.count.set(key, count);
  } else {
    this.count.delete(key);
    this.nodes.delete(key);
  }

  if (prevCount === this.maxKey && this.words.get(prevCount).size === 0) this.maxKey--;
  if (prevCount === this.minKey && this.words.get(prevCount).size === 0) {
    this.minKey--;
    while (this.minKey < this.maxKey && (!this.words.has(this.minKey) || this.words.get(this.minKey).size === 0)) this.minKey++;
  }
};

AllOne.prototype.getMaxKey = function() {
  if (this.maxKey === 0) return "";
  return this.words.get(this.maxKey).getHead();
};

AllOne.prototype.getMinKey = function() {
  if (this.minKey === 0) return "";
  return this.words.get(this.minKey).getHead();
};

// Node for Doubly Linked List
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
// dummy head and tail
class DoublyLinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  insertHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }
  insertTail(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  removeHead() {
    let head = this.head.next;
    this.removeNode(head);
    this.size--;
    return head.val;
  }
  removeNode(node) {
    if (!node.prev && !node.next) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
    this.size--;
  }
  removeTail() {
    let tail = this.tail.prev;
    this.removeNode(tail);
    this.size--;
    return tail.val;
  }
  getHead() {
    return this.head.next.val;
  }
  isEmpty() {
    return this.size === 0;
  }
}

// A few test cases
let allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
console.log(allOne.getMaxKey()); // return "hello"
console.log(allOne.getMinKey()); // return "hello"
allOne.inc("leet");
allOne.dec("leet");
console.log(allOne.getMaxKey()); // return "hello"
allOne.inc("leet");
console.log(allOne.getMinKey()); // return "leet"