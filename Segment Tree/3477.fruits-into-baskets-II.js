// 3477. Fruits Into Baskets II
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
  // Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
  // Each basket can hold only one type of fruit.
  // If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.


// Solution: Segment Tree w/ Normalized Indices

// Use a segment tree to find the minimum index for a range of values from baskets[i] (baskets[i] is the range, i is the value).
// Because fruits[i] and baskets[i] may not be unique, we need to give them normalized indices.

// For each distinct value, find the starting index and assign a range of normalized indices from the starting index up to starting index + group size.
// The segment tree range will be using the normalized indices.

// Then, for each fruits[i], find the minimum index in range (minimum normalized index for fruits[i], maximum normalized index).
// And update the entry in the segment tree to be Infinity after use.

// Time Complexity: O(n log(n)) 21ms
// Space Complexity: O(n) 64MB
function numOfUnplacedFruits(fruits, baskets) {
  const n = fruits.length, values = [];
  for (let i = 0; i < n; i++) {
    values.push(fruits[i]);
    values.push(baskets[i]);
  }  
  values.sort((a, b) => a - b);
  const minNormalizedIndex = {}, normalizedIndex = {};
  for (let i = 0; i < values.length; i++) {
    if (minNormalizedIndex[values[i]] === undefined) {
      minNormalizedIndex[values[i]] = i;
      normalizedIndex[values[i]] = i;
    }
  }
  const basketIndices = Array(values.length).fill(Infinity);
  const normalizedIndexByBasketIndex = {}; // basket index -> normalized index
  for (let i = 0; i < n; i++) {
    basketIndices[normalizedIndex[baskets[i]]] = i;
    normalizedIndexByBasketIndex[i] = normalizedIndex[baskets[i]];
    normalizedIndex[baskets[i]]++;
  }
  const segTree = new MinSegmentTree(basketIndices);
  let unplaced = 0;
  for (let i = 0; i < n; i++) {
    const minIndex = segTree.minRange(minNormalizedIndex[fruits[i]], values.length - 1);
    if (minIndex === Infinity) {
      unplaced++;
    } else {
      segTree.update(normalizedIndexByBasketIndex[minIndex], Infinity);
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
      this.segTree[i] = arr[i - n];
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