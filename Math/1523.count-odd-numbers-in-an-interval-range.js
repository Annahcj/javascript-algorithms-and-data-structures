// 1523. Count Odd Numbers in an Interval Range
// Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).


// Solution: Math

// Since there is always an odd number at every alternate position, 
// we can generally say there are around (high - low) / 2 odd numbers in between low and high.
// However, this changes when low or high are odd numbers.
// Let's look at some examples:
// 2,4 -> [2,3,4] there is 1 odd number: Math.floor((high - low) / 2)
// 2,5 -> [2,3,4,5] there are 2 odd numbers: Math.floor((high - low) / 2) + 1
// 3,5 -> [3,4,5] there are 2 odd numbers: Math.floor((high - low) / 2) + 1
// 3,6 -> [3,4,5,6] there are 2 odd numbers: Math.floor((high - low) / 2) + 1

// From these cases, we can see that if low or high is odd, we have to add one extra to the count.

// Time Complexity: O(1) 75ms
// Space Complexity: O(1) 42.1MB
var countOdds = function(low, high) {
  let oddCount = Math.floor((high - low) / 2); 
  if (low % 2 === 1 || high % 2 === 1) oddCount++;
  return oddCount;
};

// Two test cases
console.log(countOdds(3, 7)) // 3
console.log(countOdds(8, 10)) // 1