// 973. K Closest Points to Origin
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).


// Solution: Heap

// Order the heap by the biggest distance first.
// When the size of the heap exceeds k, remove the max item from it.
// When everything is added, the heap will consist of the k closest points.

// Time Complexity: O(n log(k)) 314ms
// Space Complexity: O(k) 71.5MB
var kClosest = function(points, k) {
  let heap = new PriorityQueue((a, b) => b.distance - a.distance);
  for (var i = 0; i < points.length; i++) {
    let distance = (points[i][0] ** 2) + (points[i][1] ** 2);
    heap.add({distance, coordinates: points[i]});
    if (heap.size > k) heap.remove();
  }
  let res = [];
  for (var val of heap.values) {
    res.push(val.coordinates);
  }
  return res;
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
}

// Two test cases to run function on
console.log(kClosest([[1,3],[-2,2]], 1)) // [[-2,2]]
console.log(kClosest([[3,3],[5,-1],[-2,4]], 2)) // [[3,3],[-2,4]]