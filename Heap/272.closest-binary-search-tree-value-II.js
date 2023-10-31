// 272. Closest Binary Search Tree Value II
// Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order.
// You are guaranteed to have only one unique set of k values in the BST that are closest to the target.


// Solution 1: Max Heap

// Use a max heap to maintain the k smallest distances.
// When the size of the heap exceeds k, eliminate the biggest/furthest value.

// Time Complexity: O(n log(k)) 140ms
// Space Complexity: O(n) 50.3MB
var closestKValues = function(root, target, k) {
  let heap = new Heap((a, b) => Math.abs(b - target) - Math.abs(a - target));
  dfs(root);
  return heap.values;
  
  function dfs(node) {
    if (!node) return;
    heap.add(node.val);
    if (heap.size > k) heap.remove();
    dfs(node.left);
    dfs(node.right);
  }
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}


// Solution 2: Quick Select

// 1. Get the inorder traversal of root (it doesn't matter which order the values are collected)
// 2. Use quick select to get the k closest values as the first k elements in nums
// 3. Return the first k elements of nums

// Time Complexity: O(n) 68ms
  // avg: O(n)
  // worst case: O(n^2) This is highly unlikely since we choose a random index.
// Space Complexity: O(n) 47.2MB
var closestKValues = function(root, target, k) {  
  let nums = [];
  inorder(root);
  quickSelect(nums, 0, nums.length - 1, k);
  return nums.slice(0, k);
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    nums.push(node.val);
    inorder(node.right);
  }
  
  function dist(val) {
    return Math.abs(val - target);
  } 
  
  function quickSelect(arr, left, right, k) {
    if (left >= right) return;
    
    // pick a random pivot index between left and right
    let randomIdx = Math.floor(Math.random() * (right - left + 1) + left);
    let pivotIdx = partition(arr, left, right, randomIdx);
    
    if (pivotIdx === k) return;
    else if (pivotIdx > k) quickSelect(arr, left, pivotIdx - 1, k);
    else quickSelect(arr, pivotIdx + 1, right, k);
  }
  
  function partition(arr, left, right, idx) {
    // move pivot to end
    let pivotDist = dist(arr[idx]);
    [arr[idx], arr[right]] = [arr[right], arr[idx]];
    let pivotIdx = left;
    
    // move smaller elements to the left of the pivot
    for (let i = left; i < right; i++) {
      if (dist(arr[i]) < pivotDist) {
        [arr[pivotIdx], arr[i]] = [arr[i], arr[pivotIdx]];
        pivotIdx++;
      }
    }
    
    // move the pivot back to its final place
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    return pivotIdx;
  }
};