// 705. Design HashSet
// Design a HashSet without using any built-in hash table libraries.
// Implement MyHashSet class:
  // void add(key) Inserts the value key into the HashSet.
  // bool contains(key) Returns whether the value key exists in the HashSet or not.
  // void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.


// Solution 1: Array & Linked List (separate chaining)

// Use an array with a set size (a prime number like 937)
// Have a linked list for each bucket for separate chaining (when a multiple keys have the same hash value, chain them using a linked list)
// Hash function: (key * 7907) % 937 
// In the case of hash collisions, add them as a node in the linked list.

// n = number of values, k = number of buckets, m = number of unique values in the hashset
// Time Complexity for add, remove, contains: O(n / k) 180ms
  // on average, assuming they are evenly distributed.
// Space Complexity: O(k + m) 52.4MB
var MyHashSet = function() {
  this.range = 937;
  this.hashset = Array(this.range);
  for (let i = 0; i < this.range; i++) {
    this.hashset[i] = new LinkedList();
  }
};

MyHashSet.prototype.add = function(key) {
  let hashKey = this.getHash(key);  
  let bucket = this.hashset[hashKey];
  if (!bucket.containsVal(key)) bucket.add(key);
};

MyHashSet.prototype.remove = function(key) {
  let hashKey = this.getHash(key);  
  this.hashset[hashKey].remove(key);
};

MyHashSet.prototype.contains = function(key) {
  let hashKey = this.getHash(key);  
  return this.hashset[hashKey].containsVal(key);
};

MyHashSet.prototype.getHash = function(num) {
  return (num * 7907) % this.range;
}


// Singly Linked List

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new ListNode(null);
    this.tail = this.head;
    this.size = 0;
  }
  add(val) {
    let node = new ListNode(val);
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  removeHead() {
    this.head.next = this.head.next.next;
    this.size--;
    if (!this.head.next) this.tail = this.head; // if there are no nodes after the head, set the tail to be the head.
  }
  getHead() {
    if (!this.head.next) return Infinity;
    return this.head.next.val;
  }
  remove(val) { // removes node with matching value
    let node = this.head;
    while (node && node.next) {
      if (node.next.val === val) {
        if (!node.next.next) this.tail = node; // set new tail when node to remove is the tail
        node.next = node.next.next;
        this.size--;
        return true;
      }
      node = node.next;
    }
    return false;
  }
  containsVal(val) {
    let node = this.head;
    while (node) {
      if (node.val === val) return true;
      node = node.next;
    }
    return false;
  }
}


// Solution 2: Array & Binary Search Tree

// Instead of using a linked list for each bucket, use a binary search tree.
// This brings the time complexity for add, remove, and contains to O(log(n / k)) on average.

// Time Complexity for add, remove, contains: O(log(n / k)) 208ms
// Space Complexity: O(k + m) 57.2MB
var MyHashSet = function() {
  this.range = 937;
  this.hashset = Array(this.range);
  for (let i = 0; i < this.range; i++) {
    this.hashset[i] = new BST();
  }
};

MyHashSet.prototype.add = function(key) {
  let hashKey = this.getHash(key);  
  let bucket = this.hashset[hashKey];
  if (!bucket.contains(key)) bucket.insert(key);
};

MyHashSet.prototype.remove = function(key) {
  let hashKey = this.getHash(key);  
  this.hashset[hashKey].remove(key);
};

MyHashSet.prototype.contains = function(key) {
  let hashKey = this.getHash(key);  
  return this.hashset[hashKey].contains(key);
};

MyHashSet.prototype.getHash = function(num) {
  return (num * 7907) % this.range;
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
    } else {
      let node = this.root;
      while (true) {
        if (node.val < val) {
          if (!node.right) {
            node.right = newNode;
            break;
          } else {
            node = node.right;
          }
        } else {
          if (!node.left) {
            node.left = newNode;
            break;
          } else {
            node = node.left;
          }
        }
      }
    }
  }
  contains(val) {
    let node = this.root;
    while (node) {
      if (node.val === val) return true;
      else if (node.val < val) node = node.right;
      else node = node.left;
    }
    return false;
  }
  remove(val) {
    let node = this.root;
    if (!node) return false;
    if (node.val === val) {
      this.root = replace(node);
      return true;
    }

    while (node) {
      if (node.left && node.left.val === val) {
        node.left = replace(node.left);
        return true;
      } else if (node.right && node.right.val === val) {
        node.right = replace(node.right);
        return true;
      }

      if (node.val < val) node = node.right;
      else node = node.left;
    }

    function replace(node) {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      
      let rightNode = findRight(node.left);
      rightNode.right = node.right;
      return node.left;
    }

    function findRight(node) {
      while (node.right) {
        node = node.right;
      }
      return node;
    }
  }
}

// A few test cases 
let myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
console.log(myHashSet.contains(1)); // return True
console.log(myHashSet.contains(3)); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
console.log(myHashSet.contains(2)); // return True
myHashSet.remove(2);   // set = [1]
console.log(myHashSet.contains(2)); // return False, (already removed)