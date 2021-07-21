// 146. LRU Cache
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.


// Solution 1: Hashmap with Doubly Linked List

// LRUCache: Stores the order of each key-value pair in a doubly linked list 'list', also stores each key-value pair in an object 'cache'.
// get: check if 'cache' contains item of the key, 
  // if it doesn't return -1 (not found).
  // otherwise move the position of the item to the start of 'list' (becomes the most recently used item) and return the value stored in cache.
// put: check if 'cache' contains item of the key, 
  // if it does, update the value of the item in cache to be the new value, and call the get function to move the item to the head of 'list'.
  // if it doesn't, make a new Node and pass in the key and value. 
    // If the length of the list is equal to capacity, delete the last item from 'list' and 'cache'.
  // add the new node in the head of the 'list' and 'cache'

// Runtime on LeetCode: 628ms
// Memory Usage on LeetCode: 96.7MB

// Time Complexity for put and get are O(1)
// Space Complexity: O(capacity) (doubly linked list + hashmap)

// A node -> keeps key, value, and pointers to next and prev.
class Node {
    constructor(key, val) {
      this.key = key;
      this.val = val;
      this.next = null;
      this.prev = null;
    }
  }
  // Doubly Linked List with dummy head and tail nodes for edge cases.
  class DoublyLinkedList {
    constructor() {
      this.head = new Node();
      this.tail = new Node();
      this.head.next = this.tail;
      this.tail.prev = this.head;
      this.length = 0;
    }
    insertHead(node) {
      node.prev = this.head;
      node.next = this.head.next;
      this.head.next.prev = node;
      this.head.next = node;
    }
    removeTail() {
      if (this.length == 0) return -1;
      let node = this.tail.prev;
      this.tail.prev = node.prev;
      node.prev.next = this.tail;
      this.length--;
      return node.key;
    }
  }
  class LRUCache {
    constructor(capacity) {
      this.list = new DoublyLinkedList();
      this.capacity = capacity;
      this.cache = {};
    }
    get(key) {
      if (this.list.length == 0) return -1;
      if (this.cache[key]) {
        let node = this.cache[key];
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.list.insertHead(node);
        return node.val;
      } else return -1;
    }
    put(key, value) {
      let node = this.cache[key];
      if (!node) {
        let newNode = new Node(key, value);
        if (this.list.length == this.capacity) {
          let tail = this.list.removeTail();
          delete this.cache[tail];
        }
        this.list.insertHead(newNode);
        this.cache[key] = newNode;
        this.list.length++;
      } else {
        node.val = value;
        this.get(key);
      }
    }
  }
  
  // A few test cases
  let cache = new LRUCache(2);
  cache.put(1,1)
  cache.put(2, 2)
  console.log(cache.get(1)) // 1
  cache.put(3,3)
  console.log(cache.get(2)) // -1