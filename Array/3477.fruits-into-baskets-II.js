// 3477. Fruits Into Baskets II
// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
// From left to right, place the fruits according to these rules:
  // Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
  // Each basket can hold only one type of fruit.
  // If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.


// Solution: Brute Force

// For each fruit, iterate through baskets to find the leftmost available basket.
// If an available basket is found, set baskets[i] to 0.
// Otherwise, increment the count of unplaced fruit types.

// Time Complexity: O(n^2) 2ms
// Space Complexity: O(1) 56MB
function numOfUnplacedFruits(fruits, baskets) {
  const n = fruits.length;
  let unplaced = 0;
  for (let i = 0; i < n; i++) {
    let placed = false;
    for (let j = 0; j < n; j++) {
      if (baskets[j] >= fruits[i]) {
        baskets[j] = 0;
        placed = true;
        break;
      }
    }
    if (!placed) unplaced++;
  }
  return unplaced;
};

// Two test cases
console.log(numOfUnplacedFruits([4,2,5], [3,5,4])) // 1
console.log(numOfUnplacedFruits([3,6,1], [6,4,7])) // 0