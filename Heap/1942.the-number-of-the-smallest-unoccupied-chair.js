// 1942. The Number of the Smallest Unoccupied Chair
// There is a party where n friends numbered from 0 to n - 1 are attending. There is an infinite number of chairs in this party that are numbered from 0 to infinity. When a friend arrives at the party, they sit on the unoccupied chair with the smallest number.
  // For example, if chairs 0, 1, and 5 are occupied when a friend comes, they will sit on chair number 2.
// When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.
// You are given a 0-indexed 2D integer array times where times[i] = [arrivali, leavingi], indicating the arrival and leaving times of the ith friend respectively, and an integer targetFriend. All arrival times are distinct.
// Return the chair number that the friend numbered targetFriend will sit on.


// Solution: Two Heaps & Sorting

// 1. Add an index i to each times[i] -> [i, arrival, leaving]

// 2. Sort times by arrival time in asc order. This is so we can process each friend by arrival time.

// 3. Maintain two heaps for each [chair index, available time]:
  // available: chairs that are available, order based on chair index in asc order.
  // notAvailable: chairs that are not available, order based on available time in asc order.

// 4. Process each times[i]
  // a. First, move chairs that have become available from the notAvailable heap to the available heap.
  // b. If we have an available chair to re-use, use it. Otherwise, we can use a new chair.
  // c. Add the updated/new chair and next available time to the notAvailable heap.

// Time Complexity: O(n log(n)) 242ms
// Space Complexity: O(n) 61.2MB
var smallestChair = function(times, targetFriend) {
  // [index, arrival, leaving]
  times = times
    .map((time, index) => [index, time[0], time[1]])
    .sort((a, b) => a[1] - b[1]);
  
  // [chair index, available time]
  let available = new Heap((a, b) => a[0] - b[0]);
  let notAvailable = new Heap((a, b) => a[1] - b[1]);
  let newChairNum = 0;
  for (let [i, arrival, leaving] of times) {
    while (!notAvailable.isEmpty() && notAvailable.top()[1] <= arrival) {
      available.add(notAvailable.remove());
    }
    let chairNum;
    if (!available.isEmpty()) chairNum = available.remove()[0]; // there is an available chair we can re-use
    else chairNum = newChairNum++; // use a new chair
    if (i === targetFriend) return chairNum;
    notAvailable.add([chairNum, leaving]);
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

// Two test cases
console.log(smallestChair([[1,4],[2,3],[4,6]], 1)) // 1
console.log(smallestChair([[3,10],[1,5],[2,6]], 0)) // 2