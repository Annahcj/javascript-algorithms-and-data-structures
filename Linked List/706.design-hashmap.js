// 706. Design HashMap
// Design a HashMap without using any built-in hash table libraries.


// Runtime on LeetCode: 188ms
// Memory Usage on LeetCode: 48MB

// Solution: Array and Linked List

// Logic:
// Create an array with the size of 10001. This should decrease the chance of multiple values being hashed to the same slot.
// Create a hash function which turns the key into an index in the array. I picked a random prime number - 104729.
// At every hashed index, we put a linked list. If multiple keys are assigned the same slot, we simply add them onto the linked list.
// To search, we hash the key, and loop through the linked list until we find a node which matches the key.

// Algorithm:
// ListNode: (key, value, next) a simple linked list node
// set this.key to key, this.val to val, this.next to null.

// MyHashMap:
// set this.map to an array of size 10001.

// put: (key, value)
// get the hash index with the hash(key)
// If there is nothing at that slot in the map, put a new ListNode with the key and value.
// Otherwise, loop through the linked list until we find the end and add a new ListNode with the key and value.

// get: (key)
// Get the hash index of the key. (hash(key))
// If there is nothing in that slot, return -1.
// Loop through the linked list at that slot until a node with the given key is found. Return the value of the node.
// If the entire linked list doesn't contain the given key, return -1.

// hash: (key)
// Return key * 104729 % 10001 (our array size)

// remove: (key)
// get the hash index of the key
// (since we have to remove the node, if we find the node we can't actually unlink it since we went past the previous node, so we will look ahead by one step)
// check if first item of the linked list is the one we are looking for, if it is, set this.map[hash] to node.next (first item.next)
// otherwise, loop through the linked list while node.next is not null, 
  // if node.next.key is equal to key, 
    // set node.next to node.next.next (we have now unlinked the node)
    // return.
  // otherwise set node to node.next (keep looping)
  

// Time Complexity for all functions: O(n/k) 
// Space Complexity for MyHashMap: O(n)
  class ListNode {
    constructor(key, val, next) {
      this.key = key;
      this.val = val;
      this.next = null;
    }
  }
  var MyHashMap = function() {
    this.map = Array(10001);  
  };
  
  MyHashMap.prototype.put = function(key, value) {
    let hash = this.hash(key);
    this.remove(key);
    if (!this.map[hash]) this.map[hash] = new ListNode(key, value);
    else {
      let node = this.map[hash];
      while (node) {
        if (!node.next) {
          node.next = new ListNode(key, value);
          return;
        }
        node = node.next;
      } 
    }
  };
  
  MyHashMap.prototype.get = function(key) {
    let hash = this.hash(key);
    if (this.map[hash] === undefined) return -1;
    let node = this.map[hash];
    while (node) {
      if (node.key === key) return node.val;
      node = node.next;
    }
    return -1;
  };
  
  MyHashMap.prototype.hash = function(key) {
    return key * 104729 % 10001;
  }
  
  MyHashMap.prototype.remove = function(key) {
    let hash = this.hash(key);
    if (!this.map[hash]) return;
    let node = this.map[hash];
    if (node.key === key) this.map[hash] = node.next;
    while (node.next) {
      if (node.next.key === key) {
        node.next = node.next.next;
        return;
      } 
      node = node.next;
    }
  };
  
  // A few test cases
  let map = new MyHashMap();
  map.put(1, 1);
  map.put(2, 2);
  console.log(map.get(1)) // 1
  console.log(map.get(3)) // -1
  map.put(2, 1);
  console.log(map.get(2)) // 1
  map.remove(1)
  console.log(map)