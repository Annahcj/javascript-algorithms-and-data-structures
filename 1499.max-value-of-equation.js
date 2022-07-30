// 1499. Max Value of Equation
// You are given an array points containing the coordinates of points on a 2D plane, sorted by the x-values, where points[i] = [xi, yi] such that xi < xj for all 1 <= i < j <= points.length. You are also given an integer k.
// Return the maximum value of the equation yi + yj + |xi - xj| where |xi - xj| <= k and 1 <= i < j <= points.length.
// It is guaranteed that there exists at least one pair of points that satisfy the constraint |xi - xj| <= k.


// Solution: Priority Queue & Two Pointers

// Try each points[i] as the first point in a pair and use a max heap to find the maximum other point that matches the condition points[i][0] + points[j][0] <= k.
// Sort heap by maximum x + y (this works for cases with negative numbers).
// Remove elements from top of heap that have index <= i.

// Time Complexity: O(n log(n)) 856ms
// Space Complexity: O(n) 136.2MB
var findMaxValueOfEquation = function(points, k) {
  let heap = new PriorityQueue((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
  let j = 1, n = points.length, ans = -Infinity;
  for (let i = 0; i < n; i++) {
    while (j < n && Math.abs(points[i][0] - points[j][0]) <= k) {
      heap.add([...points[j], j]);
      j++;
    }
    while (!heap.isEmpty() && heap.top()[2] <= i) heap.remove();
    if (!heap.isEmpty()) {
      let maxPoint = heap.top();
      ans = Math.max(ans, points[i][1] + maxPoint[1] + Math.abs(points[i][0] - maxPoint[0]));
    }
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

// Three test cases to run function on
console.log(findMaxValueOfEquation([[1,3],[2,0],[5,10],[6,-10]], 1)) // 4
console.log(findMaxValueOfEquation([[0,0],[3,0],[9,2]], 3)) // 3
console.log(findMaxValueOfEquation([[-17,13],[2,1],[8,-5],[18,-20]], 26)) // 33