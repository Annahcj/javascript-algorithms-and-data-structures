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
// leastFreq - the frequency of the least frequently used item
// capacity, which will be passed in upon creation
// size, which will be incremented and decremented as items are added and removed.

// get: (accepts a key)
// If there is no such node in nodeMap, return -1;
// Otherwise, remove the node from the freqMap
// If leastFreq is equal to node.freq AND the linked list in freqMap[node.freq] is empty, increment leastFreq
// Increment node.freq too.
// If freqMap[node.freq] (the new frequency of the node) doesn't exist yet, set it to a new doubly linked list.
// Insert the node at the head of the doubly linked list (freqMap[node.freq])
// Return node.val.

// put: (accepts a key and value) 
// If capacity is zero, return. (no items allowed at all)
// If node doesn't exist in nodeMap, 
  // Make a new Node.
  // Increment size of cache by one.
  // If the size is bigger than the capacity
    // remove the last node in dll of freqMap[leastFreq]
    // removeTail returns the key of removed tail node, delete node in nodeMap with key of old tail node
    // delete the node from the nodeMap
    // decrement size by one
  // add newNode to nodeMap
  // add newNode to freqMap, update leastFreq if necessary (since its a new node, frequency will always be one, and one is the least possible frequency so we check if freqMap has frequency of 1)
// Else if node exists in nodeMap,
  // Update the value of the node
  // Now we have to update the frequency
  // Remove the node from the linked list in freqMap[node.freq]
  // If node's freq is equal to least freq AND node was the only one with that frequency, increment least frequency.
  // Increment node's frequency
  // If freqMap[node.freq] doesn't exist, assign it a new doubly linked list.
  // Insert the node at the head of the list of the new frequency in freqMap.
  
// Runtime on LeetCode: 716ms
// Memory Usage on LeetCode: 93.1MB
// Time Complexity for all methods: O(1)

  class Node {
    constructor(key, val) {
      this.key = key;
      this.val = val;
      this.next = null;
      this.prev = null;
      this.freq = 1;
    }
  }
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
    removeNode(node) {
      let prev = node.prev;
      let next = node.next;
      prev.next = next;
      next.prev = prev;
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
  var LFUCache = function(capacity) {
    this.nodeMap = {};
    this.freqMap = {};
    this.leastFreq = 0;
    this.capacity = capacity;
    this.size = 0;
  };
  
  LFUCache.prototype.get = function(key) {
    let node = this.nodeMap[key];
    if (!node) return -1;
    this.freqMap[node.freq].removeNode(node);
    if (node.freq === this.leastFreq && this.freqMap[node.freq].isEmpty()) this.leastFreq++;
    node.freq++;
    if (!this.freqMap[node.freq]) this.freqMap[node.freq] = new DoublyLinkedList();
    this.freqMap[node.freq].insertHead(node);
    return node.val;
  };
  
  LFUCache.prototype.put = function(key, value) {
    if (!this.capacity) return;
    let node = this.nodeMap[key];
    if (!node) {
      let newNode = new Node(key, value);
      this.size++;
      if (this.size > this.capacity) {
        let tailKey = this.freqMap[this.leastFreq].removeTail();
        delete this.nodeMap[tailKey];
        this.size--;
      }
      this.nodeMap[key] = newNode;
      if (!this.freqMap[1]) this.freqMap[1] = new DoublyLinkedList();
      this.freqMap[1].insertHead(newNode);
      this.leastFreq = 1;
    } else {
      node.val = value;
      this.freqMap[node.freq].removeNode(node);
      if (node.freq === this.leastFreq && this.freqMap[node.freq].isEmpty()) this.leastFreq++;
      node.freq++;
      if (!this.freqMap[node.freq]) this.freqMap[node.freq] = new DoublyLinkedList();
      this.freqMap[node.freq].insertHead(node);
    }
  };
  
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