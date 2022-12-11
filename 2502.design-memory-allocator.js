// 2502. Design Memory Allocator
// You are given an integer n representing the size of a 0-indexed memory array. All memory units are initially free.
// You have a memory allocator with the following functionalities:
  // 1. Allocate a block of size consecutive free memory units and assign it the id mID.
  // 2. Free all memory units with the given id mID.
// Note that:
  // Multiple blocks can be allocated to the same mID.
  // You should free all the memory units with mID, even if they were allocated in different blocks.
// Implement the Allocator class:
  // Allocator(int n) Initializes an Allocator object with a memory array of size n.
  // int allocate(int size, int mID) Find the leftmost block of size consecutive free memory units and allocate it with the id mID. Return the block's first index. If such a block does not exist, return -1.
  // int free(int mID) Free all memory units with the id mID. Return the number of memory units you have freed.


// Solution: Brute Force

// Time Complexity: 290ms  
  // allocate: O(n)
  // free: O(n)
// Space Complexity: O(n) 50.8MB
var Allocator = function(n) {
  this.arr = Array(n).fill(0);  
};

Allocator.prototype.allocate = function(size, mID) {
  let n = this.arr.length, len = 0;
  let startIndex = -1;
  // 1. Find first index of a free block with length of "size".
  for (let i = 0; i < n; i++) {
    if (this.arr[i] === 0) len++;
    else len = 0;
    if (len === size) {
      startIndex = i - size + 1;
      break;
    }
  }

  // 2. Fill the block with mID
  if (startIndex !== -1) {
    for (let i = startIndex; i < startIndex + size; i++) {
      this.arr[i] = mID;
    }
  }
  return startIndex;
};

Allocator.prototype.free = function(mID) {
  let n = this.arr.length, count = 0;
  for (let i = 0; i < n; i++) {
    if (this.arr[i] === mID) {
      count++;
      this.arr[i] = 0;
    }
  }
  return count;
};