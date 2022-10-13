// 898. Bitwise ORs of Subarrays
// We have an array arr of non-negative integers.
// For every (contiguous) subarray sub = [arr[i], arr[i + 1], ..., arr[j]] (with i <= j), we take the bitwise OR of all the elements in sub, obtaining a result arr[i] | arr[i + 1] | ... | arr[j].
// Return the number of possible results. Results that occur more than once are only counted once in the final answer


// Solution: Three Sets

// Keep track of three sets:
  // res: bitwise ORs of all subarrays so far
  // prev: the bitwise ORs of all subarrays ending at index i-1
  // curr: the bitwise ORs of all subarrays ending at index i

// By using a set to keep track of previous subarrays, we eliminate any duplicate ORs.
// For each number in arr, 
  // Add the number to the curr set.
  // Add the new ORs to the curr set generated using the previous ORs.
  // Add all the newly generated ORs to the result set.

var subarrayBitwiseORs = function(arr) {
  let res = new Set(), prev = new Set();
  for (let num of arr) { 
    let curr = new Set([num]);
    for (let prevNum of prev) {
      curr.add(prevNum | num);
    }
    prev = curr;
    for (let num of curr) res.add(num);
  }
  return res.size;
};

// Two test cases
console.log(subarrayBitwiseORs([0])) // 1
console.log(subarrayBitwiseORs([1,1,2])) // 3