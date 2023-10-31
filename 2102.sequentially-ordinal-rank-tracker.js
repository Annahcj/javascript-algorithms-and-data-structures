// 2102. Sequentially Ordinal Rank Tracker
// A scenic location is represented by its name and attractiveness score, where name is a unique string among all locations and score is an integer. Locations can be ranked from the best to the worst. The higher the score, the better the location. If the scores of two locations are equal, then the location with the lexicographically smaller name is better.
// You are building a system that tracks the ranking of locations with the system initially starting with no locations. It supports:
  // Adding scenic locations, one at a time.
  // Querying the ith best location of all locations already added, where i is the number of times the system has been queried (including the current query).
    // For example, when the system is queried for the 4th time, it returns the 4th best location of all locations already added.
// Note that the test data are generated so that at any time, the number of queries does not exceed the number of locations added to the system.
// Implement the SORTracker class:
  // SORTracker() Initializes the tracker system.
  // void add(string name, int score) Adds a scenic location with name and score to the system.
  // string get() Queries and returns the ith best location, where i is the number of times this method has been invoked (including this invocation).


// Solution: Two Heaps

// Keep a min heap (for bigger elements) and a max heap (for smaller elements).
// Keep exactly k elements in the min heap, where k is the number of queries that have been made + 1.

// When add is called, 
  // add to the min heap.
  // if the size exceeds k, move the minimum element over to the max heap.

// When get is called, 
  // get the top element in the min heap.
  // bring over the max element from the max heap (if it's not empty) into the min heap.

// We know that each time get is called, there will always be exactly k elements in the min heap.
// This is because 
  // 1. We always move elements to the max heap once the min heap exceeds size k 
  // 2. We move an element from the max heap to the min heap when get has been called (to prepare for the next get call, to account for the case where get is called multiple times consecutively without calling add in between).

// Time Complexity: 1794ms
  // add: O(log(n))
  // get: O(log(n))
// Space Complexity: O(n) 101.3MB
var SORTracker = function() {
  this.k = 1;
  this.minHeap = new Heap((a, b) => {
    return a[1] === b[1] ? b[0].localeCompare(a[0]) : a[1] - b[1];
  });
  this.maxHeap = new Heap((a, b) => {
    return a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1];
  });
};

SORTracker.prototype.add = function(name, score) {
  this.minHeap.add([name, score]);
  if (this.minHeap.size > this.k) {
    this.maxHeap.add(this.minHeap.remove());
  }
};

SORTracker.prototype.get = function() {
  let location = this.minHeap.top()[0];
  this.k++;
  if (!this.maxHeap.isEmpty()) {
    this.minHeap.add(this.maxHeap.remove());
  }
  return location;
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
let tracker = new SORTracker(); // Initialize the tracker system.
tracker.add("bradford", 2); // Add location with name="bradford" and score=2 to the system.
tracker.add("branford", 3); // Add location with name="branford" and score=3 to the system.
console.log(tracker.get());              // The sorted locations, from best to worst, are: branford, bradford.
                            // Note that branford precedes bradford due to its higher score (3 > 2).
                            // This is the 1st time get() is called, so return the best location: "branford".
tracker.add("alps", 2);     // Add location with name="alps" and score=2 to the system.
console.log(tracker.get());              // Sorted locations: branford, alps, bradford.
                            // Note that alps precedes bradford even though they have the same score (2).
                            // This is because "alps" is lexicographically smaller than "bradford".
                            // Return the 2nd best location "alps", as it is the 2nd time get() is called.
tracker.add("orland", 2);   // Add location with name="orland" and score=2 to the system.
console.log(tracker.get());              // Sorted locations: branford, alps, bradford, orland.
                            // Return "bradford", as it is the 3rd time get() is called.
tracker.add("orlando", 3);  // Add location with name="orlando" and score=3 to the system.
console.log(tracker.get());              // Sorted locations: branford, orlando, alps, bradford, orland.
                            // Return "bradford".
tracker.add("alpine", 2);   // Add location with name="alpine" and score=2 to the system.
console.log(tracker.get());              // Sorted locations: branford, orlando, alpine, alps, bradford, orland.
                            // Return "bradford".
console.log(tracker.get());              // Sorted locations: branford, orlando, alpine, alps, bradford, orland.
                            // Return "orland".