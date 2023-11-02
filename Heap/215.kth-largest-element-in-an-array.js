// 215. Kth Largest Element in an Array
// Given an integer array nums and an integer k, return the kth largest element in the array.


// Solution 1: Min Heap

// Create a new MinHeap.
// Loop through nums
  // add each item into heap.
  // if the length of the heap exceeds k, remove the first item from the heap.
// When iteration is done, return the first value in heap.

// Time Complexity: O(n log(k)) (adding item to heap takes log(k) time (since the maximum length of heap will always be k), and we do this for every num in nums) 88ms
// Space Complexity: O(k) 46.3MB
var findKthLargest = function(nums, k) {
    let heap = new MinHeap();
    for (var i = 0; i < nums.length; i++) {
      heap.add(nums[i]);
      if (heap.values.length > k) heap.remove();
    }  
    return heap.values[0];
  };
  // Min Heap / Priority Queue
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
        this.values.pop();
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
      }
  }
  
  // Two test cases to run function on
  console.log(findKthLargest([3,2,1,5,6,4], 2)) // 5
  console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)) // 4