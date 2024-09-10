// 3275. K-th Nearest Obstacle Queries
// There is an infinite 2D plane.
// You are given a positive integer k. You are also given a 2D array queries, which contains the following queries:
  // queries[i] = [x, y]: Build an obstacle at coordinate (x, y) in the plane. It is guaranteed that there is no obstacle at this coordinate when this query is made.
// After each query, you need to find the distance of the kth nearest obstacle from the origin.
// Return an integer array results where results[i] denotes the kth nearest obstacle after query i, or results[i] == -1 if there are less than k obstacles.
// Note that initially there are no obstacles anywhere.
// The distance of an obstacle at coordinate (x, y) from the origin is given by |x| + |y|.


// Solution: Heap

// Keep a max heap of the kth nearest obstacle distances from the origin.
// If the size of the heap exceeds k, we remove the furthest distance.
// The top of the max heap is the kth nearest obstacle at any point in time.

// n = length of queries
// Time Complexity: O(n log(k)) 598ms
// Space Complexity: O(k) 117.5MB
function resultsArray(queries, k) {
  let heap = new Heap((a, b) => b - a);
  let results = [];
  for (let [x, y] of queries) {
    let dist = Math.abs(x) + Math.abs(y);
    heap.add(dist);
    if (heap.size > k) {
      heap.remove();
    }
    results.push(heap.size < k ? -1 : heap.top());
  } 
  return results;
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
console.log(resultsArray([[1,2],[3,4],[2,3],[-3,0]], 2)) // [-1,7,5,3]
console.log(resultsArray([[5,5],[4,4],[3,3]], 1)) // [10,8,6]