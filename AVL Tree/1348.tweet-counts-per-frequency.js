// 1348. Tweet Counts Per Frequency
// A social media company is trying to monitor activity on their site by analyzing the number of tweets that occur in select periods of time. These periods can be partitioned into smaller time chunks based on a certain frequency (every minute, hour, or day).
// For example, the period [10, 10000] (in seconds) would be partitioned into the following time chunks with these frequencies:
  // Every minute (60-second chunks): [10,69], [70,129], [130,189], ..., [9970,10000]
  // Every hour (3600-second chunks): [10,3609], [3610,7209], [7210,10000]
  // Every day (86400-second chunks): [10,10000]
// Notice that the last chunk may be shorter than the specified frequency's chunk size and will always end with the end time of the period (10000 in the above example).
// Design and implement an API to help the company with their analysis.
// Implement the TweetCounts class:
  // TweetCounts() Initializes the TweetCounts object.
  // void recordTweet(String tweetName, int time) Stores the tweetName at the recorded time (in seconds).
  // List<Integer> getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime) Returns a list of integers representing the number of tweets with tweetName in each time chunk for the given period of time [startTime, endTime] (in seconds) and frequency freq.
    // freq is one of "minute", "hour", or "day" representing a frequency of every minute, hour, or day respectively.


// Solution 1: AVL Tree

// recordTweet: Use a hashmap to store an AVL tree per tweetName.

// getTweetCountsPerFrequency: Use binary search to count the number of tweets in each interval in the tree where time >= interval start time and time <= interval end time.

// Time Complexity: 179ms
  // recordTweet: O(log(n))
  // getTweetCountsPerFrequency: O(n)
// Space Complexity: O(n) 64.8MB
var TweetCounts = function() {
  this.trees = {};  
};

TweetCounts.prototype.recordTweet = function(tweetName, time) {
  if (!this.trees[tweetName]) {
    this.trees[tweetName] = new AVLTree();
  }
  this.trees[tweetName].insert(time);  
};

TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
  let tree = this.trees[tweetName];
  if (!tree) return 0;
  
  const FREQ_TO_SECONDS = {
    minute: 60,
    hour: 3600,
    day: 86400
  };
  let chunkSize = FREQ_TO_SECONDS[freq];
  let intervals = Math.ceil((endTime - startTime + 1) / chunkSize);
  let count = Array(intervals).fill(0);
  tree.countForChunks(startTime, endTime, chunkSize, count);
  return count;
};

class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  search(val, node = this.root) {
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) {
      return this.search(val, node.left);
    } else {
      return this.search(val, node.right);
    }
  }
  insert(val) {
    return this.root = this._insert(val, this.root);
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);
    if (val < node.val) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of `val`, pass in the reference of one occurance.
    // To delete all nodes with value `val`, remove the check for `nodeToRemove` in _remove.
    const nodeToRemove = this.search(val, node);
    return this.root = this._remove(val, nodeToRemove, node);
  }
  // Four scenarios for deletion:
    // 1. node to delete has no children - just delete it
    // 2. node to delete only has a left child - replace it with the left child
    // 3. node to delete only has a right child - replace it with the right child
    // 4. node to delete has both left and right children - replace it with the next smallest node that is larger (use in order traversal to find the leftmost node in the right child)
  _remove(val, nodeToRemove, node) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (val > node.val) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (val === node.val && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(leftmostNode.val, this.search(leftmostNode.val, node.right), node.right);
    } else {
      return node;
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }
  getKthLargest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let rightSize = node.right?.size ?? 0;
      if (k === rightSize + 1) return node;
      if (rightSize >= k) {
        node = node.right;
      } else {
        k -= rightSize + 1;
        node = node.left;
      }
    }
    return null;
  }
  getKthSmallest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let leftSize = node.left?.size ?? 0;
      if (k === leftSize + 1) return node;
      if (leftSize >= k) {
        node = node.left;
      } else {
        k -= leftSize + 1;
        node = node.right;
      }
    }
    return null;
  }
  countForChunks(startTime, endTime, chunkSize, count, node = this.root) {
    if (!node) return;
    if (node.val >= startTime && node.val <= endTime) {
      let intervalIndex = Math.floor((node.val - startTime) / chunkSize);
      count[intervalIndex]++;
    }
    if (node.val >= startTime) {
      this.countForChunks(startTime, endTime, chunkSize, count, node.left);
    } 
    if (node.val <= endTime) {
      this.countForChunks(startTime, endTime, chunkSize, count, node.right);
    }
  }
  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }
  _getSize(node = this.root) {
    return node ? node.size : 0;
  }
  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }
  _leftRotation(node) { 
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height = 1 + Math.max(this._getHeight(rightNode.left), this._getHeight(rightNode.right));

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    rightNode.size = 1 + this._getSize(rightNode.left) + this._getSize(rightNode.right);

    return rightNode; // right node is the new root
  }
  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height = 1 + Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    leftNode.size = 1 + this._getSize(leftNode.left) + this._getSize(leftNode.right);

    return leftNode; // left node is the new root
  }
  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) { // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) { // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) { // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) { // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}


// Solution 2: Array & Binary Search

// Use a hashmap to store a sorted array of times for each tweetName.

// recordTweet: Binary search for the position in the array and insert in that position. 

// getTweetCountsPerFrequency: For each interval, use binary search to find the number of tweets where time >= interval start time and time <= interval end time.

// Time Complexity: 191ms
  // recordTweet: O(n)
  // getTweetCountsPerFrequency: O(((endTime - startTime) / freq) * log(n))
// Space Complexity: O(n) 65.8MB
var TweetCounts = function() {
  this.arrays = {};  
};

// Find the lowest index where array[index] >= time
function lowerBound(array, time) {
  let low = 0, high = array.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (array[mid] >= time) high = mid;
    else low = mid + 1;
  }
  return array[low] >= time ? low : array.length;
}

// Find the highest index where array[index] <= time
function upperBound(array, time) {
  let low = 0, high = array.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (array[mid] <= time) low = mid;
    else high = mid - 1;
  }
  return array[low] <= time ? low : -1;
}

TweetCounts.prototype.recordTweet = function(tweetName, time) {
  if (!this.arrays[tweetName]) {
    this.arrays[tweetName] = [];
  }  
  let array = this.arrays[tweetName];
  let index = lowerBound(array, time);
  array.splice(index, 0, time);
};

TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
  let array = this.arrays[tweetName];
  const FREQ_TO_SECONDS = {
    minute: 60,
    hour: 3600,
    day: 86400
  };
  let chunkSize = FREQ_TO_SECONDS[freq];
  let count = [];
  for (let i = startTime; i <= endTime; i += chunkSize) {
    count.push(Math.max(0, upperBound(array, Math.min(endTime, i + chunkSize - 1)) - lowerBound(array, i) + 1));
  }
  return count;
};

// A few test cases
let tweetCounts = new TweetCounts();
tweetCounts.recordTweet("tweet3", 0);                              // New tweet "tweet3" at time 0
tweetCounts.recordTweet("tweet3", 60);                             // New tweet "tweet3" at time 60
tweetCounts.recordTweet("tweet3", 10);                             // New tweet "tweet3" at time 10
console.log(tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 59)); // return [2]; chunk [0,59] had 2 tweets
console.log(tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 60)); // return [2,1]; chunk [0,59] had 2 tweets, chunk [60,60] had 1 tweet
tweetCounts.recordTweet("tweet3", 120);                            // New tweet "tweet3" at time 120
console.log(tweetCounts.getTweetCountsPerFrequency("hour", "tweet3", 0, 210));  // return [4]; chunk [0,210] had 4 tweets