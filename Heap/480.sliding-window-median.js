// 480. Sliding Window Median
// The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.
  // For examples, if arr = [2,3,4], the median is 3.
  // For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.
// You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the median array for each window in the original array. Answers within 10^-5 of the actual value will be accepted.


// Solution: Two Heaps

// Split the window into two sides revolving around the median.

// Maintain two heaps:
  // Left side: Max heap of all the smaller numbers. 
  // Right side: Min heap of all the larger numbers.
  // For each window, the median comes from the top of the max and min heap.

  // Add to the heaps: 
    // As we move the window, we add the new number in the max heap or min heap.
    // If the new number is smaller or equal to the left maximum, then it should go in the left heap.
    // Otherwise, add it to the right heap.
    // Note: 
      // After adding the new number, the heap sizes may be inbalanced. 
      // If the heap sizes are inbalanced, adjust the heaps by moving a number to the other heap.
      // The left heap can have at most one element more than the right heap, in the case when k is odd and there is only one median. Otherwise the sizes should be equal.

  // Removal from heaps: 
    // We will use a lazy removal of expired elements, but will keep track of the actual size of the heaps. 

// n = length of nums
// Time Complexity: O(n log(n)) 241ms
// Space Complexity: O(n) 81MB
var medianSlidingWindow = function(nums, k) {
  let leftMaxHeap = new Heap((a, b) => b[1] - a[1]); // [index, value]
  let rightMinHeap = new Heap((a, b) => a[1] - b[1]); // [index, value]
  let leftHeapSize = 0; // size of the heap excluding expired elements
  let rightHeapSize = 0; // size of the heap excluding expired elements

  const LEFT_HEAP_SIZE_LIMIT = Math.ceil(k / 2); // limit of the left heap size
  const RIGHT_HEAP_SIZE_LIMIT = Math.floor(k / 2); // limit of the right heap size
  const HEAP_NAMES = {left: 'left', right: 'right'};

  let n = nums.length, heapMap = Array(n).fill(null);
  let medians = Array(n - k);
  for (let i = 0; i < n; i++) {
    if (i >= k) {
      // pretend to remove i-kth element by updating the heap sizes.
      // expired elements will be removed from the top of the heaps later when used
      if (heapMap[i - k] === HEAP_NAMES.left) leftHeapSize--;
      else rightHeapSize--;
    }

    // add nums[i] to the appropriate heap
    if (leftMaxHeap.isEmpty() || leftMaxHeap.top()[1] >= nums[i]) {
      leftMaxHeap.add([i, nums[i]]);
      leftHeapSize++;
      heapMap[i] = HEAP_NAMES.left;
    } else {
      rightMinHeap.add([i, nums[i]]);
      rightHeapSize++;
      heapMap[i] = HEAP_NAMES.right;
    }

    // clean up expired elements at the top of the heaps, so that non-expired elements are at the top of the heaps for the adjustments below
    while (!leftMaxHeap.isEmpty() && leftMaxHeap.top()[0] <= i - k) leftMaxHeap.remove();
    while (!rightMinHeap.isEmpty() && rightMinHeap.top()[0] <= i - k) rightMinHeap.remove();

    // adjustments - move elements if sizes are not balanced
    if (leftHeapSize > LEFT_HEAP_SIZE_LIMIT) {
      let leftHeapTopIndex = leftMaxHeap.top()[0];
      rightMinHeap.add(leftMaxHeap.remove());
      leftHeapSize--;
      rightHeapSize++;
      heapMap[leftHeapTopIndex] = HEAP_NAMES.right;
    } else if (rightHeapSize > RIGHT_HEAP_SIZE_LIMIT) {
      let rightHeapTopIndex = rightMinHeap.top()[0];
      leftMaxHeap.add(rightMinHeap.remove());
      rightHeapSize--;
      leftHeapSize++;
      heapMap[rightHeapTopIndex] = HEAP_NAMES.left;
    }
    
    if (i >= k - 1) {
      // clean up expired elements at the top of the heaps, because we need the accurate median 
      while (!leftMaxHeap.isEmpty() && leftMaxHeap.top()[0] <= i - k) leftMaxHeap.remove();
      while (!rightMinHeap.isEmpty() && rightMinHeap.top()[0] <= i - k) rightMinHeap.remove();
      
      let median = k % 2 === 1 ? leftMaxHeap.top()[1] : (leftMaxHeap.top()[1] + rightMinHeap.top()[1]) / 2;
      medians[i - k + 1] = median; 
    }
  }
  return medians;
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

// Two test cases
console.log(medianSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
console.log(medianSlidingWindow([1,2,3,4,2,3,1,4,2], 3)) // [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]