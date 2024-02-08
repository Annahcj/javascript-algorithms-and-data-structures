// 2931. Maximum Spending After Buying Items
// You are given a 0-indexed m * n integer matrix values, representing the values of m * n different items in m different shops. Each shop has n items where the jth item in the ith shop has a value of values[i][j]. Additionally, the items in the ith shop are sorted in non-increasing order of value. That is, values[i][j] >= values[i][j + 1] for all 0 <= j < n - 1.
// On each day, you would like to buy a single item from one of the shops. Specifically, On the dth day you can:
  // Pick any shop i.
  // Buy the rightmost available item j for the price of values[i][j] * d. That is, find the greatest index j such that item j was never bought before, and buy it for the price of values[i][j] * d.
// Note that all items are pairwise different. For example, if you have bought item 0 from shop 1, you can still buy item 0 from any other shop.
// Return the maximum amount of money that can be spent on buying all m * n products.


// Solution 1: Greedy w/ Min Heap

// It's optimal to use the larger values on later days.
// Use a min heap to store the current rightmost value at each shop.
// At each day, use the smallest value from the min heap.

// Time Complexity: O(mn log(m)) 196ms
// Space Complexity: O(m) 69.3MB
var maxSpending = function(values) {
  let m = values.length, minHeap = new Heap((a, b) => values[a[0]][a[1]] - values[b[0]][b[1]]); // [i, j]  
  for (let i = 0; i < m; i++) {
    minHeap.add([i, values[i].length - 1]);
  }
  let ans = 0, day = 1;
  while (!minHeap.isEmpty()) {
    let [row, col] = minHeap.remove();
    ans += values[row][col] * day;
    if (col > 0) {
      minHeap.add([row, col - 1]);
    }
    day++;
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


// Solution 2: Greedy w/ Sorting

// Since values[i] is guaranteed to be in non-increasing order, add all the values in one flattened array and sort it in increasing order.
// Use the ith value on the ith day.

// Time Complexity: O(mn log(m)) 119ms
// Space Complexity: O(mn) 67.6MB
var maxSpending = function(values) {
  let m = values.length, allValues = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < values[i].length; j++) {
      allValues.push(values[i][j]);
    }
  }
  allValues.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < allValues.length; i++) {
    ans += allValues[i] * (i + 1);
  }
  return ans;
};

// Two test cases
console.log(maxSpending([[8,5,2],[6,4,1],[9,7,3]])) // 285
console.log(maxSpending([[10,8,6,4,2],[9,7,5,3,2]])) // 386