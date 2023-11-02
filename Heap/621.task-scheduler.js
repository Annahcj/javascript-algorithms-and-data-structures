// 621. Task Scheduler
// Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.
// However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.
// Return the least number of units of times that the CPU will take to finish all the given tasks.


// Solution: Greedy Approach w/ Priority Queue & Frequency Count

// 1. convert each letter to its charcode and add the frequency to the priority queue.
// 2. keep a priority queue -> sorted in desc by frequency. 
  // format: {frequency of letter, last index of letter}
// 3. while the pq is not empty, greedily take letters out:
  // take out all the frequencies which cannot be used right now into a temporary array.
  // if there is a letter we can use, remove it from the queue and subtract the frequency.
  // add the frequencies in the temp array back into the pq.
// Repeat step 3 until the queue is empty, and return the total time taken.

// n = number of tasks
// Time Complexity: O(n log(n)) 880ms
// Space Complexity: O(n) 50.7MB
var leastInterval = function(tasks, n) {
  let freq = Array(26).fill(0);
  let heap = new Heap((a, b) => b.freq - a.freq);
  for (var task of tasks) freq[task.charCodeAt() - 65]++;
  for (var i = 0; i < 26; i++) {
    if (freq[i] > 0) {
      heap.add({freq: freq[i], lastIdx: -Infinity});
    }
  }
  
  let time = 0;
  while (!heap.isEmpty()) {
    let temp = [];
    while (!heap.isEmpty() && time <= heap.top().lastIdx + n) {
      temp.push(heap.remove());
    }
    if (!heap.isEmpty()) {
      let {freq} = heap.remove();
      if (freq > 1) {
        heap.add({freq: freq - 1, lastIdx: time});
      }
    }
    time++;
    for (var entry of temp) heap.add(entry);
  }
  return time;
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
console.log(leastInterval(["A","A","A","B","B","B"], 2)) // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)) // 6
console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2)) // 16