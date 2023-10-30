// 2454. Next Greater Element IV
// You are given a 0-indexed array of non-negative integers nums. For each integer in nums, you must find its respective second greater integer.
// The second greater integer of nums[i] is nums[j] such that:
  // j > i
  // nums[j] > nums[i]
  // There exists exactly one index k such that nums[k] > nums[i] and i < k < j.
// If there is no such nums[j], the second greater integer is considered to be -1.
  // For example, in the array [1, 2, 4, 3], the second greater integer of 1 is 4, 2 is 3, and that of 3 and 4 is -1.
// Return an integer array answer, where answer[i] is the second greater integer of nums[i].


// Solution: Monotonic Stack & Min Heap 

// Maintain a monotonic decreasing stack and a min heap:
  // stack = indexes of elements on the left that don't have a greater element yet
  // minHeap = indexes of elements on the left that have a greater element, but don't have a second greater element yet

// For each nums[i], 
  // remove elements smaller than nums[i] from the min heap
  // remove elements smaller than nums[i] from the top of the stack and add them to the min heap
  // Note: The min heap must be processed before the stack, otherwise nums[i] can be counted as both the greater and second greater element for some numbers.

// Summary: 
  // We use the monotonic stack to find the elements that have found the first greater element.
  // When elements find their first greater element, we move those to the min heap (removing smaller elements from the top of the stack)
  // Now, all elements in the min heap have already found their first greater element, so we can treat them in the same way now to find the second greater element.
  // From the min heap, we try to find the second greater elements for numbers by removing smaller elements from the top of the heap.

// Time Complexity: O(n log(n)) 210ms
// Space Complexity: O(n) 69.2MB
var secondGreaterElement = function(nums) {
  let n = nums.length, stack = [], minHeap = new Heap((a, b) => nums[a] - nums[b]);
  let secondGreater = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    while (!minHeap.isEmpty() && nums[minHeap.top()] < nums[i]) {
      secondGreater[minHeap.remove()] = nums[i];
    }
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      minHeap.add(stack.pop());
    }
    stack.push(i);
  }
  return secondGreater;
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
console.log(secondGreaterElement([2,4,0,9,6])) // [9,6,6,-1,-1]
console.log(secondGreaterElement([3,3])) // [-1,-1]