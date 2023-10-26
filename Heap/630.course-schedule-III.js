// 630. Course Schedule III
// There are n different online courses numbered from 1 to n. You are given an array courses where courses[i] = [durationi, lastDayi] indicate that the ith course should be taken continuously for durationi days and must be finished before or on lastDayi.
// You will start on the 1st day and you cannot take two or more courses simultaneously.
// Return the maximum number of courses that you can take.


// Solution: Greedy w/ Sorting & Heap

// 1. Sort courses by lastDay.
// 2. Keep durations in a max heap.
  // Take each duration one by one.
  // If the total time exceeds the lastDay, remove the largest duration from the heap.

// This is a greedy approach which ensures that we will always take the maximum number of courses.
// The approach of removing the largest duration from the heap is correct because given the current endpoint (lastDay), 
// it is always optimal to remove the largest duration as this results in the minimum duration.

// Time Complexity: O(n log(n)) 308ms
// Space Complexity: O(n) 60.5MB
var scheduleCourse = function(courses) {
  courses.sort((a, b) => a[1] - b[1]);
  let heap = new PriorityQueue((a, b) => b - a);
  let lastTime = 0;
  for (let [duration, lastDay] of courses) {
    heap.add(duration);
    lastTime += duration;
    if (lastTime > lastDay) {
      lastTime -= heap.remove();
    }
  }
  return heap.size;
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

// Three test cases to run function on
console.log(scheduleCourse([[100,200],[200,1300],[1000,1250],[2000,3200]])) // 3
console.log(scheduleCourse([[1,2]])) // 1
console.log(scheduleCourse([[3,2],[4,3]])) // 0