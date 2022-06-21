// 1642. Furthest Building You Can Reach
// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.
// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.
// While moving from building i to building i+1 (0-indexed),
  // If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
  // If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.


// Solution: Min Heap

// The goal is to use the ladders for the biggest differences.
// However, there may still be a point where ladders and bricks combined won't be able to reach (when answer is < n-1).

// Use up all the ladders for the first l higher buildings.
// Use a min heap to keep the differences of building heights where ladders are used.
// When the ladders are all used up, try to replace the smallest difference with the current difference (replace ladder with bricks, use ladder for current).

// n = length of heights, l = ladders
// Time Complexity: O(n log(l)) 116ms
// Space Complexity: O(l) 56.9MB
var furthestBuilding = function(heights, bricks, ladders) {
  let heap = new PriorityQueue();
  for (let i = 1; i < heights.length; i++) {
    let diff = heights[i] - heights[i - 1];
    if (diff <= 0) continue;
    heap.add(diff);
    if (heap.size > ladders) {
      let minDiff = heap.remove();
      if (bricks < minDiff) return i - 1;
      bricks -= minDiff;
    }
  }
  return heights.length - 1;
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
console.log(furthestBuilding([4,2,7,6,9,14,12], 5, 1)) // 4
console.log(furthestBuilding([4,12,2,7,3,18,20,3,19], 10, 2)) // 7