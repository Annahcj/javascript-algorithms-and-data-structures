// 295. Find Median from Data Stream
// The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
// Implement the MedianFinder class:
// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.


// Solution 1: Insertion Sort

// Logic:
// addNum:
// Binary search to find the index of the first number bigger than num, then insert it at that index.

// findMedian:
// If the arr length is odd, return the middle element
// Otherwise, return the two middle elements divided by two

// Runtime on LeetCode: 2064ms
// Memory Usage on LeetCode: 73.6MB

// Time Complexity:
// addNum: O(n + log(n))
// findMedian: O(1)

// Space Complexity:
// O(n) for the array
var MedianFinder = function() {
  this.arr = [];  
};

MedianFinder.prototype.addNum = function(num) {
  let idx = search(this.arr, num);
  this.arr.splice(idx, 0, num);
}

MedianFinder.prototype.findMedian = function() {
  let mid = Math.floor(this.arr.length / 2);
  if (this.arr.length % 2 === 1) {
    return this.arr[mid];
  } else {
    return (this.arr[mid - 1] + this.arr[mid]) / 2;
  }
};

function search(arr, num) {
  let low = 0, high = arr.length;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] > num) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

// Solution 2: Two Heaps

// We use a max heap and min heap to store the lower half of the arr and upper half of the arr.
// We let the max heap be the bigger arr if the total length is odd.
// For every insertion, 
// 1. we add the num to max heap,
// 2. remove the top element from the max heap, insert into the min heap.
// 3. if the length of min heap is longer than the length of max heap, 
  // remove the top element from the min heap, insert into max heap.
// By performing the above steps, the min and max heaps will be balanced both in terms of the numbers and length.


// Runtime on LeetCode: 576ms
// Memory Usage on LeetCode: 70.8MB

// Time Complexity:
// addNum: O(log(n))
// findMedian: O(1)

// Space Complexity:
// O(n) (maxheap & minheap combined)
var MedianFinder = function() {
  this.max = new MaxHeap();
  this.min = new MinHeap(); 
};

MedianFinder.prototype.addNum = function(num) {
  this.max.add(num);
  this.min.add(this.max.remove());
  if (this.min.values.length > this.max.values.length) {
    this.max.add(this.min.remove());
  }
}

MedianFinder.prototype.findMedian = function() {
  let length = this.max.values.length + this.min.values.length;
  if (length % 2 === 1) {
    return this.max.values[0];
  } else {
    return (this.max.values[0] + this.min.values[0]) / 2;
  }
};

class MinHeap {
  constructor() {
    this.values = [];
  }
  add(value) {
    let pushed = this.values.push(value);
    let currIdx = this.values.length - 1;
    let parentIdx = Math.floor((currIdx - 1) / 2);
    while (parentIdx >= 0 && this.values[parentIdx] > this.values[currIdx]) {
      [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
      currIdx = parentIdx;
      parentIdx = Math.floor((currIdx - 1) / 2);
    }
    return pushed;
  }
  remove() {
    if (!this.values.length) return -1;
    let currIdx = 0;
    [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
    let removed = this.values.pop();
    let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
    function getSmaller(vals, leftIdx, rightIdx) {
      if (rightIdx < vals.length) {
        if (vals[leftIdx] < vals[rightIdx]) {
          return leftIdx;
        } return rightIdx;
      } else {
        if (leftIdx < vals.length) return leftIdx;
        return -1;
      }
    }
    let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
    while (smallerChild > -1 && this.values[smallerChild] < this.values[currIdx]) {
      [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
      currIdx = smallerChild;
      leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
      smallerChild = getSmaller(this.values, leftIdx, rightIdx);
    }
    return removed;
  }
}

class MaxHeap {
  constructor() {
    this.values = [];
  }
  add(value) {
    let pushed = this.values.push(value);
    let currIdx = this.values.length - 1;
    let parentIdx = Math.floor((currIdx - 1) / 2);
    while (parentIdx >= 0 && this.values[parentIdx] < this.values[currIdx]) {
      [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
      currIdx = parentIdx;
      parentIdx = Math.floor((currIdx - 1) / 2);
    }
    return pushed;
  }
  remove() {
    if (!this.values.length) return -1;
    let currIdx = 0;
    [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
    let removed = this.values.pop();
    let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
    function getSmaller(vals, leftIdx, rightIdx) {
      if (rightIdx < vals.length) {
        if (vals[leftIdx] > vals[rightIdx]) {
          return leftIdx;
        } return rightIdx;
      } else {
        if (leftIdx < vals.length) return leftIdx;
        return -1;
      }
    }
    let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
    while (smallerChild > -1 && this.values[smallerChild] > this.values[currIdx]) {
      [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
      currIdx = smallerChild;
      leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
      smallerChild = getSmaller(this.values, leftIdx, rightIdx);
    }
    return removed;
  }
}

// A few test cases
let medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
console.log(medianFinder.findMedian()); // 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr = [1, 2, 3]
console.log(medianFinder.findMedian()); // 2.0
medianFinder.addNum(1)    // arr = [1, 1, 2, 3]
console.log(medianFinder.findMedian()); // 1.5