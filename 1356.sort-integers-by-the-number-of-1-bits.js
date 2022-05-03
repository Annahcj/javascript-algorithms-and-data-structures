// 1356. Sort Integers by The Number of 1 Bits
// You are given an integer array arr. Sort the integers in the array in ascending order by the number of 1's in their binary representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order.
// Return the array after sorting it.


// Solution: Sorting & Bit Manupulation

// Use the AND operation and right shift to get the number of 1 bits in a number.
// Sort by the number of 1 bits, then by the number if there is a tie.

// Time Complexity: O(n log(n)) 124ms
// Space Complexity: O(log(n)) (space for sorting) 44.4MB
var sortByBits = function(arr) {
  arr.sort((a, b) => {
    let bitsA = get1Bits(a), bitsB = get1Bits(b);
    if (bitsA === bitsB) return a - b;
    return bitsA - bitsB;
  })
  return arr;
  
  function get1Bits(num) {
    let count = 0;
    while (num > 0) {
      count += num & 1;
      num >>= 1;
    }
    return count;
  }  
};

// Two test cases to run function on
console.log(sortByBits([0,1,2,3,4,5,6,7,8])) // [0,1,2,4,8,3,5,6,7]
console.log(sortByBits([1024,512,256,128,64,32,16,8,4,2,1])) // [1,2,4,8,16,32,64,128,256,512,1024]