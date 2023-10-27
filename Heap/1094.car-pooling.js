// 1094. Car Pooling
// There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).
// You are given the integer capacity and an array trips where trip[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.
// Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.


// Solution: Sorting & Priority Queue

// 1. Sort trips in asc order by start time
// 2. Keep a priority queue ordered by end time in asc order
// 3. Loop through trips
  // remove people who we have already dropped off 
  // decrement the count of the people we have dropped off
  // pick up the current group of people, if the capacity is exceeded, return false.
  // add the current trip to the priority queue

// Time Complexity: O(n log(n)) 146ms
// Space Complexity: O(n) 44.8MB
var carPooling = function(trips, capacity) {
  trips.sort((a, b) => a[1] - b[1]);
  let count = 0, pq = new Heap((a, b) => a[2] - b[2]);
  for (let [numPpl, start, end] of trips) {
    while (!pq.isEmpty() && pq.top()[2] <= start) {
      count -= pq.top()[0];
      pq.remove();
    }
    count += numPpl;
    if (count > capacity) return false;
    pq.add([numPpl, start, end]);
  }
  return true;
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

// Three test cases 
console.log(carPooling([[2,1,5],[3,3,7]], 4)) // false
console.log(carPooling([[2,1,5],[3,3,7]], 5)) // true
console.log(carPooling([[2,1,2],[1,2,3],[1,2,3]], 2)) // true