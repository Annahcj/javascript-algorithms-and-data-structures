// 2300. Successful Pairs of Spells and Potions
// You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.
// You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.
// Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.


// Solution 1: Sorting & Two Pointers

// 1. Sort spells in asc order
// 2. Sort potions in desc order
// 3. Use two pointers
  // Iterate over each spells[i] 
  // Move j up while spells[i] * potions[j] >= success
  // The number of potions for spells[i] = j

// n = spells.length, m = potions.length
// Time Complexity: O(n log(n) + m log(m)) 755ms 
// Space Complexity: O(n) 101.6MB
var successfulPairs = function(spells, potions, success) {
  spells = spells.map((spell, idx) => [spell, idx]).sort((a, b) => a[0] - b[0]);
  potions.sort((a, b) => b - a);
  let n = spells.length, m = potions.length;
  let res = Array(n), j = 0;
  for (let i = 0; i < n; i++) {
    let [spell, index] = spells[i];
    while (j < m && spell * potions[j] >= success) j++;
    res[index] = j;
  }
  return res;
};


// Solution 2: Sorting & Binary Search

// 1. Sort potions in desc order
// 2. For each spells[i], binary search for the rightmost position j in potions, where spells[i] * potions[j] >= success

// Time Complexity: O(n + m log(m)) 489ms
// Space Complexity: O(log(m)) (space for sorting, not including output) 69.2MB 
var successfulPairs = function(spells, potions, success) {
  potions.sort((a, b) => b - a);
  let n = spells.length, m = potions.length;
  let res = Array(n);
  for (let i = 0; i < n; i++) {
    let low = 0, high = m - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (spells[i] * potions[mid] >= success) low = mid;
      else high = mid - 1;
    }
    res[i] = spells[i] * potions[low] >= success ? low + 1 : 0;
  }
  return res;
};

// Two test cases
console.log(successfulPairs([5,1,3], [1,2,3,4,5], 7)) // [4,0,3]
console.log(successfulPairs([3,1,2], [8,5,8], 16)) // [2,0,2]