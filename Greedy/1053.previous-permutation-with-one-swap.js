// 1053. Previous Permutation With One Swap
// Given an array of positive integers arr (not necessarily distinct), return the lexicographically largest permutation that is smaller than arr, that can be made with exactly one swap. If it cannot be done, then return the same array.
// Note that a swap exchanges the positions of two numbers arr[i] and arr[j].


// Solution: Greedy 

// We need to choose a pair of (i, j) where i < j and arr[i] > arr[j].
// We want the biggest number, which means the swap should happen as far right in the array as possible.
// Find the largest arr[j] where arr[i] > arr[j]. If there are multiple of the same arr[j], choose the leftmost one. (This is because we want to maximize the new value that will be swapped to index i. For ties, we want to put the larger digit as early as possible, so we pick the earliest index)

// Go through each arr[i] from right to left,
  // Keep track of the minimum number so far.
  // If the minimum number is less than arr[i], that means we have at least one number to swap with.
    // Loop to the right of i to find the first occurance of the maximum arr[j] where arr[i] < arr[j].

// Time Complexity: O(n) 106ms
// Space Complexity: O(1) 47MB
var prevPermOpt1 = function(arr) {
  let n = arr.length, min = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if (min < arr[i]) {
      let index = -1;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[i]) {
          if (index === -1 || arr[index] < arr[j]) {
            index = j;
          }
        }
      }
      [arr[i], arr[index]] = [arr[index], arr[i]];
      return arr;
    }
    min = Math.min(min, arr[i]);
  }
  return arr;
};

// Three test cases
console.log(prevPermOpt1([3,2,1])) // [3,1,2]
console.log(prevPermOpt1([1,1,5])) // [1,1,5]
console.log(prevPermOpt1([1,9,4,6,7])) // [1,7,4,6,9]