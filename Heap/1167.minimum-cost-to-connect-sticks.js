// 1167. Minimum Cost to Connect Sticks
// You have some number of sticks with positive integer lengths. These lengths are given as an array sticks, where sticks[i] is the length of the ith stick.
// You can connect any two sticks of lengths x and y into one stick by paying a cost of x + y. You must connect all the sticks until there is only one stick remaining.
// Return the minimum cost of connecting all the given sticks into one stick in this way.


// Solution: Greedy Approach w/ Priority Queue

// It is always optimal to combine the two smallest sticks each time.
// Hence, we can use a priority queue to pick the two smallest sticks, then add the combined value back in.

// Time Complexity: O(n log(n)) 237ms
// Space Complexity: O(n) 57.4MB
var connectSticks = function(sticks) {
  let heap = new Heap();
  for (let stick of sticks) heap.add(stick);
  let cost = 0;
  while (heap.size() > 1) {
    let x = heap.remove(), y = heap.remove();
    cost += x + y;
    heap.add(x + y);
  }
  return cost;
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
  size() {
    return this.values.length;
  }
}

// Three test cases 
console.log(connectSticks([2,4,3])) // 14
console.log(connectSticks([1,8,3,5])) // 30
console.log(connectSticks([5])) // 0