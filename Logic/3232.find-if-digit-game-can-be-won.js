// 3232. Find if Digit Game Can Be Won
// You are given an array of positive integers nums.
// Alice and Bob are playing a game. In the game, Alice can choose either all single-digit numbers or all double-digit numbers from nums, and the rest of the numbers are given to Bob. Alice wins if the sum of her numbers is strictly greater than the sum of Bob's numbers.
// Return true if Alice can win this game, otherwise, return false.


// Solution: Logic

// If the sum of single digit numbers is different from the sum of double-digit numbers, Alice can always choose the numbers with the larger sum.
// The only case where Alice will lose is if the sum of single-digit numbers is the same as double-digit numbers.

// Time Complexity: O(n) 56ms
// Space Complexity: O(1) 51.7MB
function canAliceWin(nums) {
  let single = 0, double = 0;
  for (let num of nums) {
    if (num < 10) {
      single += num;
    } else {
      double += num;
    }
  }
  return single !== double;
};

// Three test cases
console.log(canAliceWin([1,2,3,4,10])) // false
console.log(canAliceWin([1,2,3,4,5,14])) // true
console.log(canAliceWin([5,5,5,25])) // true