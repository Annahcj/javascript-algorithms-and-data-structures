// 1535. Find the Winner of an Array Game
// Given an integer array arr of distinct integers and an integer k.
// A game will be played between the first two elements of the array (i.e. arr[0] and arr[1]). In each round of the game, we compare arr[0] with arr[1], the larger integer wins and remains at position 0, and the smaller integer moves to the end of the array. The game ends when an integer wins k consecutive rounds.
// Return the integer which will win the game.
// It is guaranteed that there will be a winner of the game.


// Solution: One Pass 

// If k > length of arr - 1, then the answer must be the maximum integer in the array.
// Otherwise, it will take at most n moves to find the winning integer. This is because at worst the maximum integer will be in position 0 in less than n moves.
// Since it takes at most n moves, we can do one pass, keeping track of the current maximum number and comparing each arr[i] with the current maximum.

// Time Complexity: O(n) 55ms
// Space Complexity: O(1) 51.5MB
var getWinner = function(arr, k) {
  if (k > arr.length - 1) return Math.max(...arr);
  let consec = 0, n = arr.length, max = arr[0];
  for (let i = 1; i < n; i++) {
    if (arr[i] < max) {
      consec++;
    } else {
      max = arr[i];
      consec = 1;
    }
    if (consec === k) return max;
  }
  return max;
};

// Two test cases
console.log(getWinner([2,1,3,5,4,6,7], 2)) // 5
console.log(getWinner([3,2,1], 10)) // 3