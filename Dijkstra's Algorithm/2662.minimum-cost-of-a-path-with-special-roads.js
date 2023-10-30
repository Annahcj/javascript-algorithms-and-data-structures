// 2662. Minimum Cost of a Path With Special Roads
// You are given an array start where start = [startX, startY] represents your initial position (startX, startY) in a 2D space. You are also given the array target where target = [targetX, targetY] represents your target position (targetX, targetY).
// The cost of going from a position (x1, y1) to any other position in the space (x2, y2) is |x2 - x1| + |y2 - y1|.
// There are also some special roads. You are given a 2D array specialRoads where specialRoads[i] = [x1i, y1i, x2i, y2i, costi] indicates that the ith special road can take you from (x1i, y1i) to (x2i, y2i) with a cost equal to costi. You can use each special road any number of times.
// Return the minimum cost required to go from (startX, startY) to (targetX, targetY).


// Solution: Dijkstra's Algorithm 

// When going to a non-special cell, we only need to consider the path that goes straight to it, since the cost of getting to that cell without using special roads will always be the same.
// The only difference comes from using special roads.
// Get the minimum cost coming from a possible combination of normal roads and special roads.

// Use Dijkstra's algorithm to find the minimum cost to each special cell. At the end, return the minimum cost going from the end of a special road to the target.
// Note: Since the special road may not start from the current cell, we need to travel to the start of the special road using a normal road.

// n = number of special roads
// Time Complexity: O(n^2 log(n)) 186ms
// Space Complexity: O(n) 52.7MB
var minimumCost = function(start, target, specialRoads) {
  let heap = new Heap((a, b) => a[2] - b[2]);
  heap.add([start[0], start[1], 0]); // [row, column, current cost]
  let minCost = new Map();
  while (!heap.isEmpty()) {
    let [row, col, currCost] = heap.remove(), key = `${row},${col}`;
    if (minCost.has(key) && minCost.get(key) < currCost) continue; // there is a better cost recorded
    for (let [x1, y1, x2, y2, cost] of specialRoads) {
      let newKey = `${x2},${y2}`, newCost = currCost + cost + Math.abs(x1 - row) + Math.abs(y1 - col);
      if (minCost.has(newKey) && minCost.get(newKey) <= newCost) continue; // there is a better cost recorded
      minCost.set(newKey, newCost);
      heap.add([x2, y2, newCost]);
    }
  }
  let ans = Math.abs(target[0] - start[0]) + Math.abs(target[1] - start[1]);
  for (let [_x1, _y1, x2, y2] of specialRoads) {
    let minimumCost = minCost.get(`${x2},${y2}`);
    ans = Math.min(ans, minimumCost + Math.abs(target[0] - x2) + Math.abs(target[1] - y2));
  }
  return ans;
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
console.log(minimumCost([1,1], [4,5], [[1,2,3,3,2],[3,4,4,5,1]])) // 5
console.log(minimumCost([3,2], [5,7], [[3,2,3,4,4],[3,3,5,5,5],[3,4,5,6,6]])) // 7