// 3479. Fruits Into Baskets III
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
  // Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
  // Each basket can hold only one type of fruit.
  // If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.


// Solution: Segment Tree

// Use a segment tree to find the minimum index in baskets, based on a range of values.
// Normalize the values of fruits and baskets as maximum is 10^9.
// However, we need to give a unique index to every value, so for a group of the same values, give fruits[i] the start value and increment it for every equal baskets[i].
// For every fruits[i], find the minimum index in the range (normalizedIndex[fruits[i]], maximum normalized index).

// Time Complexity: O(n log(n)) 759ms
// Space Complexity: O(n) 115.2MB
function numOfUnplacedFruits(fruits, baskets) {
  const n = fruits.length, values = [];
  for (let i = 0; i < n; i++) {
    values.push(fruits[i]);
    values.push(baskets[i]);
  }
  // assign normalized index
  values.sort((a, b) => a - b);
  const minNormalizedIndex = {}, normalizedIndex = {};
  for (let i = 0; i < values.length; i++) {
    if (minNormalizedIndex[values[i]] === undefined) {
      minNormalizedIndex[values[i]] = i;
      normalizedIndex[values[i]] = i;
    }
  }
  const m = values.length - 1;
  const indicesByValue = Array(m + 1).fill(Infinity); // mapping normalized index -> index in baskets
  const value = Array(n);
  for (let i = 0; i < n; i++) {
    indicesByValue[normalizedIndex[baskets[i]]] = i;
    value[i] = normalizedIndex[baskets[i]]++;
  }
  const segTree = new MinSegmentTree(indicesByValue);
  let unplaced = 0;
  for (let i = 0; i < n; i++) {
    const normalizedIndex = minNormalizedIndex[fruits[i]];
    const leftmostIndexInRange = segTree.minRange(normalizedIndex, m);
    if (leftmostIndexInRange === Infinity) {
      unplaced++;
    } else {
      segTree.update(value[leftmostIndexInRange], Infinity);
    }
  }
  return unplaced;
};

class MinSegmentTree {
  constructor(arr) {
    const n = arr.length;
    this.size = n;
    this.segTree = Array(n * 2).fill(Infinity);
    this.build(arr);
  }
  build(arr) {
    const n = this.size;
    for (let i = n; i < n * 2; i++) {
      this.segTree[i] = arr[i - n]; // populate leaf values
    }
    for (let i = n - 1; i > 0; i--) {
      this.segTree[i] = Math.min(this.segTree[i * 2], this.segTree[i * 2 + 1]);
    }
  }
  update(index, value) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = value;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.min(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  minRange(left, right) {
    if (left > right) return Infinity;
    let n = this.size, min = Infinity;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) min = Math.min(min, this.segTree[left_idx++]);
      if (right_idx % 2 === 0) min = Math.min(min, this.segTree[right_idx--]);
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return min;
  }
}

// Two test cases
console.log(numOfUnplacedFruits([4,2,5], [3,5,4])) // 1
console.log(numOfUnplacedFruits([3,6,1], [6,4,7])) // 0