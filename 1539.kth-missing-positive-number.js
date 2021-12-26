// 1539. Kth Missing Positive Number
// Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
// Find the kth positive integer that is missing from this array.


// Solution: Binary Search

// Binary search for the rightmost index where the number of missing numbers before arr[index] is smaller than k.
// Then, we return arr[index] + (remaining k after subtracting the number of missing numbers before arr[index]).

// Edge case: if the kth missing positive number is smaller than the first element in arr, simply return k.

// Time Complexity: O(log(n)) 68ms
// Space Complexity: O(1) 39.7MB
var findKthPositive = function(arr, k) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (missingNums(mid) >= k) high = mid - 1;
    else low = mid;
  }
  let extraAdd = k - missingNums(low);
  if (low === 0 && missingNums(low) >= k) return k;
  return arr[low] + extraAdd;
  
  function missingNums(idx) {
    return arr[idx] - (idx + 1);
  }
};

// Two test cases to run function on
console.log(findKthPositive([2,3,4,7,11], 5)) // 9
console.log(findKthPositive([1,2,3,4], 2)) // 6