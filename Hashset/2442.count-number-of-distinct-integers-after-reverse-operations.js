// 2442. Count Number of Distinct Integers After Reverse Operations
// You are given an array nums consisting of positive integers.
// You have to take each integer in the array, reverse its digits, and add it to the end of the array. You should apply this operation to the original integers in nums.
// Return the number of distinct integers in the final array.


// Solution: Hashset 

// Add all numbers and reversed numbers to a hashset and return the size.
// Reversing a number costs O(log(n)).

// Time Complexity: O(n log(n)) 243ms
// Space Complexity: O(n) 78.3MB
var countDistinctIntegers = function(nums) {
  let set = new Set(nums);
  for (let num of nums) {
    set.add(reverse(num));
  }
  return set.size;
};

function reverse(num) {
  let reversed = 0;
  while (num > 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }
  return reversed;
}  

// Two test cases
console.log(countDistinctIntegers([1,13,10,12,31])) // 6
console.log(countDistinctIntegers([2,2,2])) // 1