// 1726. Tuple with Same Product
// Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.


// Solution: Counting & Combinatorics

// Go through every pair and store the occurances of every product in a hashmap:
  // count = current count of pairs with the same product.
  // count * 2 = every pair of pairs, in both orders: (ab cd) (cd ab)
  // count * 2 * 4 = every pair of pairs including internal orderings: (ab cd) (ba cd) (ab dc) (ba dc) (cd ab) (dc ab) (cd ba) (dc ba)

// Time Complexity: O(n^2) 390ms
// Space Complexity: O(n^2) 88.2MB
function tupleSameProduct(nums) {
  let n = nums.length, productCount = {};
  let tuples = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let product = nums[i] * nums[j];
      tuples += (productCount[product] || 0) * 8;
      productCount[product] = (productCount[product] || 0) + 1;
    }
  }
  return tuples;
};

// Two test cases
console.log(tupleSameProduct([2,3,4,6])) // 8
console.log(tupleSameProduct([1,2,4,5,10])) // 16