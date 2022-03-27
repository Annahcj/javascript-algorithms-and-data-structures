// 1337. The K Weakest Rows in a Matrix
// You are given an m x n binary matrix mat of 1's (representing soldiers) and 0's (representing civilians). The soldiers are positioned in front of the civilians. That is, all the 1's will appear to the left of all the 0's in each row.
// A row i is weaker than a row j if one of the following is true:
  // The number of soldiers in row i is less than the number of soldiers in row j.
  // Both rows have the same number of soldiers and i < j.
// Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.


// Solution 1: Linear Search & Max Heap

// 1. Get the count of soldiers in each row and store them in an array 'count'.
// 2. Use a max heap to keep track of the k weakest rows.
  // When the size of the heap > k, remove the strongest row.
// 3. Extract the k rows from the heap, add them to the result array in reverse order.

// m = number of rows, n = number of columns
// Time Complexity: O(mn + m log(k)) 92ms
// Space Complexity: O(m + k) 45.9MB
var kWeakestRows = function(mat, k) {
  let m = mat.length, n = mat[0].length;
  let count = Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      count[i] += mat[i][j];
    }
  }

  let heap = new PriorityQueue((a, b) => {
    if (count[a] === count[b]) return b - a;
    return count[b] - count[a];
  })
  for (let i = 0; i < m; i++) {
    heap.add(i);
    if (heap.size > k) heap.remove();
  }
  
  let res = Array(k);
  for (let i = k - 1; i >= 0; i--) {
    res[i] = heap.remove();
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
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}


// Solution 2: Binary Search & Max Heap

// The same as solution 1, but we use binary search to find the number of soldiers for each row.

// Time Complexity: O(m log(n) + m log(k)) 93ms
// Space Complexity: O(m + k) 46MB
var kWeakestRows = function(mat, k) {
  let m = mat.length, n = mat[0].length;
  let count = Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    let low = 0, high = n - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (mat[i][mid] === 1) low = mid;
      else high = mid - 1;
    }
    count[i] = mat[i][low] ? low + 1 : low;
  }
  
  let heap = new PriorityQueue((a, b) => {
    if (count[a] === count[b]) return b - a;
    return count[b] - count[a];
  })
  for (let i = 0; i < m; i++) {
    heap.add(i);
    if (heap.size > k) heap.remove();
  }
  
  let res = Array(k);
  for (let i = k - 1; i >= 0; i--) {
    res[i] = heap.remove();
  }
  return res;
};

// A test case to run function on
console.log(kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3)) // [2,0,3]