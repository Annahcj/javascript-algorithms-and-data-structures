// 1353. Maximum Number of Events That Can Be Attended
// You are given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi.
// You can attend an event i at any day d where startTimei <= d <= endTimei. You can only attend one event at any time d.
// Return the maximum number of events you can attend.


// Solution: Sorting & Priority Queue

// Use a priority queue to keep the end times of events on the go.

// 1. Sort events by start time
// 2. Loop through the events (pointer = idx)
  // If heap is empty, update day to the next possible day: events[idx][0]
  // Add event's end times while the start time is smaller than or equal to day. (only open events)
  // Pop off the earliest ending event (we know this exists because we at least had the initial events[idx]), increment answer and day.
  // Remove events from the heap while they are out of range (end time is smaller than current day)

// Time Complexity: O(n log(n)) 391ms
// Space Complexity: O(n) 90.3MB
var maxEvents = function(events) {
  events.sort((a, b) => a[0] - b[0]);
  let heap = new Heap((a, b) => a - b);
  let idx = 0, day = 1, ans = 0;
  while (idx < events.length || !heap.isEmpty()) {
    if (heap.isEmpty()) {
      day = events[idx][0];
    }
    while (idx < events.length && events[idx][0] <= day) {
      heap.add(events[idx++][1]);
    }
    heap.remove();
    ans++, day++;
    while (heap.top() < day) heap.remove();
  } 
  return ans;
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

// Four test cases
console.log(maxEvents([[1,5],[1,5],[1,5],[2,3],[2,3]])) // 5
console.log(maxEvents([[1,2],[1,2],[3,3],[1,5],[1,5]])) // 5
console.log(maxEvents([[1,2],[2,3],[3,4]])) // 3
console.log(maxEvents([[1,2],[2,3],[3,4],[1,2]])) // 4