// 1845. Seat Reservation Manager
// Design a system that manages the reservation state of n seats that are numbered from 1 to n.
// Implement the SeatManager class:
  // SeatManager(int n) Initializes a SeatManager object that will manage n seats numbered from 1 to n. All seats are initially available.
  // int reserve() Fetches the smallest-numbered unreserved seat, reserves it, and returns its number.
  // void unreserve(int seatNumber) Unreserves the seat with the given seatNumber.


// Solution: Min Heap w/ Lazy Removal

// Use an array of size n to keep track of whether a seat is available or not.
// Keep each supposedly available seat in a min heap.
// Seats in the heap may be unavailable, so we remove the seat at the top of the heap while it is not available.

// Time Complexity: 717ms
  // init: O(n log(n))
  // reserve: O(n log(n)) amortized
  // unreverse: O(1) per call
// Space Complexity: O(n) 86.1MB
var SeatManager = function(n) {
  this.available = Array(n + 1).fill(true);
  this.minHeap = new Heap();
  for (let i = 1; i <= n; i++) {
    this.minHeap.add(i);
  }
};

SeatManager.prototype.reserve = function() {
  while (!this.minHeap.isEmpty() && !this.available[this.minHeap.top()]) {
    this.minHeap.remove(); // remove unavailable seats from the top of the heap
  }
  let seat = this.minHeap.remove();
  this.available[seat] = false;
  return seat;
};

SeatManager.prototype.unreserve = function(seatNumber) {
  this.available[seatNumber] = true;  
  this.minHeap.add(seatNumber);
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
let seatManager = new SeatManager(5);
console.log(seatManager.reserve()); // 1
console.log(seatManager.reserve()); // 2
seatManager.unreserve(2);
console.log(seatManager.reserve()); // 2
console.log(seatManager.reserve()); // 3
console.log(seatManager.reserve()); // 4
console.log(seatManager.reserve()); // 5
seatManager.unreserve(5);