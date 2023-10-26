// 374. Guess Number Higher or Lower
// We are playing the Guess Game. The game is as follows:
// I pick a number from 1 to n. You have to guess which number I picked.
// Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
// You call a pre-defined API int guess(int num), which returns 3 possible results:
// -1: The number I picked is lower than your guess (i.e. pick < num).
// 1: The number I picked is higher than your guess (i.e. pick > num).
// 0: The number I picked is equal to your guess (i.e. pick == num).
// Return the number that I picked.


// Solution: Binary Search

// Instead of checking against a target, check against the result from the function guess.
// If guess returns 0, return the answer
// If guess returns 1, look for a bigger number
// If guess returns -1, look for a smaller number

// Time Complexity: O(log(n)) 97ms
// Space Complexity: O(1) 38MB
var guessNumber = function(n) {
  let low = 1, high = n;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let res = guess(mid);
    if (res === 0) return mid;
    else if (res === 1) low = mid + 1;
    else high = mid - 1;
  } 
  return low;
};