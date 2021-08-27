// 692. Top K Frequent Words
// Given an array of strings words and an integer k, return the k most frequent strings.
// Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.


// Solution 1: Max Heap

// First, map each word to its frequency -> map.
// Initiate a new MaxHeap -> heap
// Loop through each {word, frequency} and add them to the heap.
// Remove k items from the heap, push them into res.

// MaxHeap:
// For each comparison during add and remove, call equalCompare (item1, item2).
// equalCompare: (a, b)
  // If the frequency of a and b are equal AND the word of a is lexographically smaller than the word of b, return true.
  // Otherwise, return false.

// Time Complexity: O(n log(n)) 96ms
// Space Complexity: O(n) 44.3MB
var topKFrequent = function(words, k) {
  let map = {};
  let heap = new MaxHeap();
  let res = [];
  for (var word of words) {
    map[word] = (map[word] || 0) + 1;
  } 
  for (var key in map) {
    heap.add({key, freq: map[key]});
  }
  for (var i = 0; i < k; i++) {
    res.push(heap.remove().key);
  }
  return res;
};

// Modified Max-Heap
class MaxHeap {
  constructor() {
    this.values = [];
  }
  // if frequencies are equal, return the lexographically smaller word
  equalCompare(a, b) {
    if (a.freq === b.freq && a.key < b.key) return true;
    return false;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && (this.values[idx].freq > this.values[parentIdx].freq || this.equalCompare(this.values[idx], this.values[parentIdx]))) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(values, leftIdx, rightIdx) {
      let end = values.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (values[leftIdx].freq > values[rightIdx].freq || (values[leftIdx].freq === values[rightIdx].freq && values[leftIdx].key < values[rightIdx].key)) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && (this.values[idx].freq < this.values[childIdx].freq || this.equalCompare(this.values[childIdx], this.values[idx]))) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}

// Solution 2: Min Heap

// Same as solution 1, except use a min heap instead of a max heap.
// Always keep the heap size k, remove the min if the heap size becomes bigger than k
// Remove the k elements from the heap, then reverse and return them.

// Time Complexity: O(n log(k)) 108ms
// Space Complexity: O(k) 43.4MB
var topKFrequent = function(words, k) {
  let map = {};
  let heap = new MinHeap();
  let res = [];
  for (var word of words) {
    map[word] = (map[word] || 0) + 1;
  } 
  for (var key in map) {
    heap.add({key, freq: map[key]});
    if (heap.values.length > k) {
      heap.remove();
    }
  }
  for (var i = 0; i < k; i++) {
    res.push(heap.remove().key);
  }
  return res.reverse();
};

// Modified Min-Heap
class MinHeap {
  constructor() {
    this.values = [];
  }
  // if frequencies are equal, return the lexographically bigger word
  equalCompare(a, b) {
    if (a.freq === b.freq && a.key > b.key) return true;
    return false;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && (this.values[idx].freq < this.values[parentIdx].freq || this.equalCompare(this.values[idx], this.values[parentIdx]))) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx].freq < vals[rightIdx].freq || (vals[leftIdx].freq === vals[rightIdx].freq && vals[leftIdx].key > vals[rightIdx].key)) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && (this.values[idx].freq > this.values[childIdx].freq || this.equalCompare(this.values[childIdx], this.values[idx]))) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}

// Three test cases to run function on
console.log(topKFrequent(["i","love","leetcode","i","love","coding"], 3)) // ["i","love","coding"]
console.log(topKFrequent(["i","love","leetcode","i","love","coding"], 2)) // ["i","love"]
console.log(topKFrequent(["the","day","is","sunny","the","the","the","sunny","is","is"], 4)) // ["the","is","sunny","day"]