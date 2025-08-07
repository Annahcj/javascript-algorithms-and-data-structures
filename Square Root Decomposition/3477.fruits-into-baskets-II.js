// 3477. Fruits Into Baskets II
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
  // Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
  // Each basket can hold only one type of fruit.
  // If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.


// Solution: Square Root Decomposition

// Segment baskets in into sqrt(n) buckets, preserving their original order, 
// Then, sort each bucket by quantity.

// For each fruits[i],
  // 1. Linearly search for the leftmost bucket where the maximum (rightmost) quantity >= fruits[i].
  // 2. Linearly search for the minimum index within the found bucket where maximum quantity >= fruits[i].
  // 3. Remove the minimum index after using it.

// Time Complexity: O(n sqrt(n)) 18ms
// Space Complexity: O(n) 64MB
function numOfUnplacedFruits(fruits, baskets) {
  const n = fruits.length, bucketSize = Math.floor(Math.sqrt(n));
  const numBuckets = Math.ceil(n / bucketSize);
  const buckets = Array(numBuckets).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    buckets[Math.floor(i / bucketSize)].push(i);
  }
  for (let bucket of buckets) {
    bucket.sort((a, b) => baskets[a] === baskets[b] ? a - b : baskets[a] - baskets[b]);
  }
  let unplaced = 0;
  for (let i = 0; i < n; i++) {
    let minIndex = -1;
    // find the leftmost bucket with sufficient quantity,
    // then find the minimum index within that bucket
    for (let bucket of buckets) {
      if (baskets[bucket[bucket.length - 1]] >= fruits[i]) {
        for (let j = 0; j < bucket.length; j++) {
          const index = bucket[j];
          if (baskets[index] >= fruits[i] && (minIndex === -1 || index < bucket[minIndex])) {
            minIndex = j;
          }
        }
        // remove the used basket
        bucket.splice(minIndex, 1);
        break;
      }
    }
    if (minIndex === -1) {
      unplaced++;
    }
  }
  return unplaced;
};

// Two test cases
console.log(numOfUnplacedFruits([4,2,5], [3,5,4])) // 1
console.log(numOfUnplacedFruits([3,6,1], [6,4,7])) // 0