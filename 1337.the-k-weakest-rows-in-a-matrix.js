// 1337. The K Weakest Rows in a Matrix
// You are given an m x n binary matrix mat of 1's (representing soldiers) and 0's (representing civilians). The soldiers are positioned in front of the civilians. That is, all the 1's will appear to the left of all the 0's in each row.
// A row i is weaker than a row j if one of the following is true:
  // The number of soldiers in row i is less than the number of soldiers in row j.
  // Both rows have the same number of soldiers and i < j.
// Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.


// Solution: Max Heap & Binary Search to count soliders

// Precompute the count of 1's for each row.
// Use binary search to find the index of the last 1.

// Use a max heap to keep track of the k weakest rows.
// If the size of the heap exceeds k, remove the strongest row from the heap.
// At the end, extract the k rows from the heap and return them after reversing.

// Time Complexity: O(m log(n) * m log(k)) 75ms
// Space Complexity: O(m + k) 45.3MB
var kWeakestRows = function(mat, k) {
  let m = mat.length, count = Array(m);
  for (let i = 0; i < m; i++) {
    count[i] = getCount(mat[i]);
  }
  let maxHeap = new Heap((a, b) => count[a] === count[b] ? b - a : count[b] - count[a]);
  for (let i = 0; i < m; i++) {
    maxHeap.add(i);
    if (maxHeap.size > k) {
      maxHeap.remove();
    }
  }
  let weakestRows = [];
  for (let i = 0; i < k; i++) {
    weakestRows.push(maxHeap.remove());
  }
  return weakestRows.reverse();
};

// binary search for the index of the last 1
function getCount(row) {
  let low = 0, high = row.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (row[mid] === 1) low = mid;
    else high = mid - 1;
  }
  return row[low] === 1 ? low + 1 : 0;
}

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
console.log(kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3)) // [2,0,3]
console.log(kWeakestRows([[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]], 2)) // [0,2]