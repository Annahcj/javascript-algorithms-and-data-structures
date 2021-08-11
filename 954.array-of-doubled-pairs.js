// 954. Array of Doubled Pairs
// Given an array of integers arr of even length, return true if and only if it is possible to reorder it such that arr[2 * i + 1] = 2 * arr[2 * i] for every 0 <= i < len(arr) / 2.


// Solution: Sort by Absolute Value / Frequency Map

// Sort the arr in increasing order by their absolute value.
// For e.g: [2,4,1,8]
// If we don't sort the array, we end up matching 2,4 first, then 1,8 will be left without a pair. However, if it's sorted, 
// we can match 1,2 first, then 4,8. For negative numbers, they should be in decreasing order, so we sort by absolute value.
// Next, map the frequency of each number in a hash map.
// Set a counter to the length of arr.
// Loop through each num in arr
  // If num is 0 and freq[0] is bigger than 1 (if it's zero, we need two zeros)
    // Decrement count by two
    // Decrement freq[0] by two
  // Else if num is not 0 and freq[num] still has at least one number and freq[num * 2] still has at least one number
    // Decrement count by two
    // Decrement freq[num] by one
    // Decrement freq[num * 2] by one
// If count is equal to zero (they can all be paired) return true, otherwise false.

// Time Complexity: O(n log(n)) technically O(n log(n) + n + n) 240ms
// Space Complexity: O(n) 47.7MB
  var canReorderDoubled = function(arr) {
    arr = arr.sort((a, b) => Math.abs(a) - Math.abs(b));
    let freq = {};
    for (var n of arr) freq[n] = (freq[n] || 0) + 1;
    let count = arr.length;
    for (var num of arr) {
      if (num === 0 && freq[num] > 1) {
        count -= 2;
        freq[num] -= 2;
      } else if (num !== 0 && freq[num] > 0 && freq[num * 2] > 0) {
        count -= 2;
        freq[num]--;
        freq[num * 2]--;
      }
    }
    return count === 0;
  };
  
  // Three test cases to run function on
  console.log(canReorderDoubled([0,0])) // true
  console.log(canReorderDoubled([4,-2,2,-4])) // true
  console.log(canReorderDoubled([3,1,3,6])) // false