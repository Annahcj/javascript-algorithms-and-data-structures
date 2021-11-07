// 2064. Minimized Maximum of Products Distributed to Any Store
// You are given an integer n indicating there are n specialty retail stores. There are m product types of varying amounts, which are given as a 0-indexed integer array quantities, where quantities[i] represents the number of products of the ith product type.
// You need to distribute all products to the retail stores following these rules:
// A store can only be given at most one product type but can be given any amount of it.
// After distribution, each store will be given some number of products (possibly 0). Let x represent the maximum number of products given to any store. You want x to be as small as possible, i.e., you want to minimize the maximum number of products that are given to any store.
// Return the minimum possible x.


// Solution: Binary Search

// Set range from 1 to maxiumum amount in quantities
// Set mid to Math.floor((low + high) / 2) 
// if distribute(mid) is true, set high to mid (because mid could be the final answer, but we should still check for lower choices)
// otherwise, set low to mid + 1 (higher amount)

// distribute (amount)
  // make a copy of quantities -> arr
  // loop through arr (pointer = i)
    // while arr[i] is bigger than 0
      // decrement amount from arr[i]
      // if stores is bigger than or equal to n (meaning amount is too low), return false.
      // increment stores
  // If we reached the end, return true (able to distribute all)

// max = max number in quantities
// Time Complexity: O(n log(max)) 508ms
// Space Complexity: O(n) 58.5MB
var minimizedMaximum = function(n, quantities) {
  // binary search for smallest possible minimum amount 
  let low = 1, high = 0;
  for (var num of quantities) {
    high = Math.max(high, num);
  }
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (distribute(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function distribute(amount) {
    let arr = [...quantities];
    let store = 0;
    for (var i = 0; i < arr.length; i++) {
      while (arr[i] > 0) {
        arr[i] -= Math.min(arr[i], amount);
        if (store >= n) return false;
        store++;
      }
    }
    return true;
  } 
};

// Four test cases to run function on
console.log(minimizedMaximum(5, [10, 10])) // 5
console.log(minimizedMaximum(6, [11,6])) // 3
console.log(minimizedMaximum(7, [15,10,10])) // 5
console.log(minimizedMaximum(1, [100000])) // 100000