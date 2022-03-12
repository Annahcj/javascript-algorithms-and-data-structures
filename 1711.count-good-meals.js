// 1711. Count Good Meals
// A good meal is a meal that contains exactly two different food items with a sum of deliciousness equal to a power of two.
// You can pick any two different foods to make a good meal.
// Given an array of integers deliciousness where deliciousness[i] is the deliciousness of the i​​​​​​th​​​​​​​​ item of food, return the number of different good meals you can make from this list modulo 10^9 + 7.
// Note that items with different indices are considered different even if they have the same deliciousness value.


// Solution: Hashmap

// For each number, loop through the 22 powers of 2 (from 1 to 2^20).
  // Get the complement: power - num
  // Add the frequency of the complement (from the hashmap) to the answer.
  // Update the frequency of the current number.

// Time Complexity: O(22n) = O(n) 269ms
// Space Complexity: O(n) 54.9MB
var countPairs = function(deliciousness) {
  let map = new Map();
  let ans = 0, mod = 10 ** 9 + 7;
  for (let n of deliciousness) {
    let power = 1;
    for (let i = 0; i < 22; i++) {
      let complement = power - n;
      if (map.has(complement)) {
        ans = (ans + map.get(complement)) % mod;
      }
      power *= 2;
    }
    map.set(n, (map.get(n) || 0) + 1);
  }
  return ans;
};

// Two test cases to run function on
console.log(countPairs([1,3,5,7,9])) // 4
console.log(countPairs([1,1,1,3,3,3,7])) / 15