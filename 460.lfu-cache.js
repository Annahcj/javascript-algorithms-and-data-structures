// 460. LFU Cache
// Design and implement a data structure for a Least Frequently Used (LFU) cache.
// Implement the LFUCache class:
// LFUCache(int capacity) Initializes the object with the capacity of the data structure.
// int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
// void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
// To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.
// When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.
// The functions get and put must each run in O(1) average time complexity.


// Solution: Hashmap & Doubly Linked List

// Thoughts:
// We use a hashmap to store the frequencies. The frequencies as keys and doubly linked lists for nodes of the same frequency.
// We use another hashmap to store the nodes. The key given as keys and Nodes as values.
// For the doubly linked list, we have everything as usual, just with an extra this.freq, which indicates a node's frequency.
// We have methods insertHead, removeNode, removeTail, and isEmpty.

// LFUCache:
// hashmap for the frequencies - freqMap
// hashmap for the nodes/vals - nodeMap
// minFreq - the frequency of the least frequently used item
// capacity, which will be passed in upon creation
// size, which will be incremented and decremented as items are added and removed.

// get: (accepts a key)
  // If node doesn't exist, return -1.
  // 1. Get the node from the nodeMap
  // 2. Get the frequency of the node: oldFreq
  // 3. Get the linked list for oldFreq: list
  // 4. Remove the node from the list
  // 5. Increment the node's frequency by 1: newFreq
  // 6. If the list is now empty AND minFreq is equal to oldFreq, increment minFreq by 1.
  // 7. If there is no for the newFreq yet, create a new linked list.
  // 8. Add the node to the head of the new list.
  // 9. Return the value of the node.

// put: (accepts a key and value) 
  // If the nodeMap contains the key
    // 1. Get the node from the nodeMap
    // 2. Update the value of the node
    // 3. Get the current frequency: oldFreq
    // 4. Get the current linked list: list
    // 5. Remove the node from list
    // 6. If the list is now empty AND the minFreq is equal to oldFreq, increment minFreq by 1.
    // 7. Increment the node's frequency by 1: newFreq
    // 8. If there is no list for newFreq yet, create a new linked list.
    // 9. Add the node to the head of the new list.
  // Otherwise,
    // If the capacity is 0, return.
    // 1. Create a new node: newNode
    // 2. If there is no list for the frequency 1 yet, create a new list: list
    // 3. If the size is equal to the capacity, remove the tail from the list with the minFreq. Decrement size by 1.
    // 4. Set minFreq to 1 
    // 5. Increment the size by 1.
    // 6. Add newNode to the head of list.
    // 7. Save the node in the nodeMap

  
// Runtime on LeetCode: 692ms
// Memory Usage on LeetCode: 91.9MB
// Time Complexity for all methods: O(1)

var LFUCache = function(capacity) {
  this.nodeMap = {};
  this.freqMap = {};
  this.capacity = capacity;
  this.minFreq = 1;
  this.size = 0;
};

LFUCache.prototype.get = function(key) {
  if (!this.nodeMap[key]) return -1;
  let node = this.nodeMap[key];
  let oldFreq = node.freq;
  let list = this.freqMap[oldFreq];
  list.removeNode(node);
  node.freq++;
  let newFreq = node.freq;
  if (list.isEmpty() && this.minFreq === oldFreq) this.minFreq++;
  if (!this.freqMap[newFreq]) this.freqMap[newFreq] = new DoublyLinkedList();
  this.freqMap[newFreq].insertHead(node);
  return node.val;
};

LFUCache.prototype.put = function(key, value) {
  if (this.nodeMap[key]) {
    let node = this.nodeMap[key];
    node.val = value;
    let oldFreq = node.freq;
    let list = this.freqMap[oldFreq];
    list.removeNode(node);
    if (list.isEmpty() && this.minFreq === oldFreq) this.minFreq++;
    node.freq++;
    let newFreq = node.freq;
    if (!this.freqMap[newFreq]) this.freqMap[newFreq] = new DoublyLinkedList();
    this.freqMap[newFreq].insertHead(node);
  } else {
    if (this.capacity === 0) return;
    let newNode = new Node(key, value);
    if (!this.freqMap[1]) this.freqMap[1] = new DoublyLinkedList();
    let list = this.freqMap[1];
    if (this.size === this.capacity) {
      let removedKey = this.freqMap[this.minFreq].removeTail();
      delete this.nodeMap[removedKey];
      this.size--;
    }
    this.minFreq = 1;
    this.size++;
    list.insertHead(newNode);
    this.nodeMap[key] = newNode;
  }
};

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
    this.freq = 1;
  }
}
// dummy head and tail
class DoublyLinkedList {
  constructor() {
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
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
    return tail.key;
  }
  isEmpty() {
    return this.head.next.val === null;
  }
}
  
// A few test cases 
let cache = new LFUCache(2)
console.log(cache.put(1,1)) // null
console.log(cache.put(2,2)) // null
console.log(cache.get(1)) // 1
console.log(cache.put(3,3)) // null
console.log(cache.get(2)) // -1
console.log(cache.get(3)) // 3
console.log(cache.put(4,4)) // null
console.log(cache.get(1)) // -1
console.log(cache.get(3)) // 3
console.log(cache.get(4)) // 4
console.log(cache)