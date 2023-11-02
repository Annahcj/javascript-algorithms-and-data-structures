// 2349. Design a Number Container System
// Design a number container system that can do the following:
  // Insert or Replace a number at the given index in the system.
  // Return the smallest index for the given number in the system.
// Implement the NumberContainers class:
  // NumberContainers() Initializes the number container system.
  // void change(int index, int number) Fills the container at index with the number. If there is already a number at that index, replace it.
  // int find(int number) Returns the smallest index for the given number, or -1 if there is no index that is filled by number in the system.


// Solution: Hashmap & Min Heaps w/ Lazy Removal

// Use a hashmap to keep track of the number at each index: {index: number, index: number, ...}
// Use a min heap to keep track of the indexes of each number: {number: min heap, number: min heap, ...}
// The heaps can store expired indexes, so we can use lazy removal (remove the index from the top of the heap while the number at that index has changed).

// n = number of calls
// Time Complexity: 1119ms
  // change: O(log(n)) per call
  // find: O(n log(n)) amortized 
// Space Complexity: O(n) 133.1MB
var NumberContainers = function() {
  this.numbers = new Map(); // {index: number, index: number, ...}
  this.indexes = new Map(); // {number: min heap, number: min heap, ...}
};

NumberContainers.prototype.change = function(index, number) {
  this.numbers.set(index, number);
  if (!this.indexes.has(number)) {
    this.indexes.set(number, new Heap());
  }
  this.indexes.get(number).add(index);
};

NumberContainers.prototype.find = function(number) {
  let minHeap = this.indexes.get(number);
  if (!minHeap) return -1;
  while (!minHeap.isEmpty() && this.numbers.get(minHeap.top()) !== number) { // remove indexes that are expired from the top of the heap
    minHeap.remove();
  }
  if (minHeap.isEmpty()) return -1;
  return minHeap.top();
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

// A few test cases
let nc = new NumberContainers();
console.log(nc.find(10)); // There is no index that is filled with number 10. Therefore, we return -1.
nc.change(2, 10); // Your container at index 2 will be filled with number 10.
nc.change(1, 10); // Your container at index 1 will be filled with number 10.
nc.change(3, 10); // Your container at index 3 will be filled with number 10.
nc.change(5, 10); // Your container at index 5 will be filled with number 10.
console.log(nc.find(10)); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
nc.change(1, 20); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20. 
console.log(nc.find(10)); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.