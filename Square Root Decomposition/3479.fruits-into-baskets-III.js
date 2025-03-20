// 3479. Fruits Into Baskets III
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
  // Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
  // Each basket can hold only one type of fruit.
  // If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.


// Solution: Square Root Decomposition

// Split baskets into sqrt(n) buckets, each of size sqrt(n).
// The first sqrt(n) baskets goes into the first bucket, the next sqrt(n) baskets goes into the second bucket, and so on.
// Within each bucket, sort it in ascending order.
// Calculating number of buckets and bucket size:
  // Bucket size: ceil(sqrt(n)).
  // Number of buckets: ceil(n / bucket size).

// For every fruits[i],
  // Linearly search through the buckets and find the leftmost bucket where maximum basket capacity >= fruits[i].
  // Linearly search through the bucket to find the leftmost index where baskets[i] >= fruits[i].

// Time Complexity: O(n sqrt(n)) 468ms
// Space Complexity: O(n) 81MB
function numOfUnplacedFruits(fruits, baskets) {
  const n = fruits.length;
  const bucketSize = Math.ceil(Math.sqrt(n)), numBuckets = Math.ceil(n / bucketSize);
  const buckets = Array(numBuckets).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    buckets[Math.floor(i / bucketSize)].push(i);
  }
  for (let i = 0; i < numBuckets; i++) {
    buckets[i].sort((a, b) => baskets[a] === baskets[b] ? a - b : baskets[a] - baskets[b]);
  }
  let unplaced = 0;
  for (let i = 0; i < n; i++) {
    let foundBasket = false;
    for (let bucket of buckets) {
      if (bucket.length > 0 && baskets[bucket[bucket.length - 1]] >= fruits[i]) {
        let leftmostLargerOrEqual = -1;
        for (let j = 0; j < bucket.length; j++) {
          if (baskets[bucket[j]] >= fruits[i]) {
            leftmostLargerOrEqual = leftmostLargerOrEqual === -1 || bucket[j] < bucket[leftmostLargerOrEqual] ? j : leftmostLargerOrEqual;
          }
        }
        bucket.splice(leftmostLargerOrEqual, 1);
        foundBasket = true;
        break;
      }
    }
    if (!foundBasket) {
      unplaced++;
      continue;
    }
  }
  return unplaced;
};

// Two test cases
console.log(numOfUnplacedFruits([4,2,5], [3,5,4])) // 1
console.log(numOfUnplacedFruits([3,6,1], [6,4,7])) // 0