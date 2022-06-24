// 1705. Maximum Number of Eaten Apples
// There is a special kind of apple tree that grows apples every day for n days. On the ith day, the tree grows apples[i] apples that will rot after days[i] days, that is on day i + days[i] the apples will be rotten and cannot be eaten. On some days, the apple tree does not grow any apples, which are denoted by apples[i] == 0 and days[i] == 0.
// You decided to eat at most one apple a day (to keep the doctors away). Note that you can keep eating after the first n days.
// Given two integer arrays days and apples of length n, return the maximum number of apples you can eat.


// Solution: Greedy w/ Heap

// Use a heap to store each [numApples, endDay] ordered by endDay (asc).
  // It is always optimal to consume apples that become rotten sooner.

// Loop through each day (i) and while the heap is not empty.
  // Remove rotten apples from the heap (based on the endDay)
  // Consume the apple with the earliest endDay, and add it back to the heap with one less apple.

// Time Complexity: O(n log(n)) 377ms
// Space Complexity: O(n) 58.1MB
var eatenApples = function(apples, days) {
  let heap = new PriorityQueue((a, b) => a[1] - b[1]); // [numApples, endDay]
  let i = 0, n = apples.length, ans = 0;
  while (i < n || !heap.isEmpty()) {
    if (i < n && apples[i] > 0) heap.add([apples[i], i + days[i]]);
    while (!heap.isEmpty() && heap.top()[1] <= i) heap.remove(); // remove rotten apples
    if (!heap.isEmpty()) {
      let [numApples, endDay] = heap.remove();
      ans++;
      if (numApples > 1) heap.add([numApples - 1, endDay]);
    }
    i++;
  }
  return ans;
};

class PriorityQueue {
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

// Two test cases to run function on
console.log(eatenApples([1,2,3,5,2], [3,2,1,4,2])) // 7
console.log(eatenApples([3,0,0,0,0,2], [3,0,0,0,0,2])) // 5