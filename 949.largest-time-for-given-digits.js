// 949. Largest Time for Given Digits
// Given an array arr of 4 digits, find the latest 24-hour time that can be made using each digit exactly once

// Solution 1: Generate Permutations

// Three for loops (and simple calculation for the fourth index) to generate every possible permutation.
// We don't consider the permutation if any indexes are duplicates.
// If the time is valid; hour is less than 24 and minutes are less than 60,
// check if time is bigger than latest recorded time, then replace it if it is. 

// Time Complexity: O(1) 80 ms 
// Space Complexity: O(1) 38.4 MB

var largestTimeFromDigits = function(arr) {
    let maxTime = -Infinity, timeStr = '';
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var h = 0; h < 4; h++) {
          if (i == j || j == h || i == h) continue;
          let k = 6 - i - j - h;
          let jointTime = arr[i] * 1000 + arr[j] * 100 + arr[h] * 10 + arr[k];
          if ((arr[i] * 10) + arr[j] < 24 && (arr[h] * 10) + arr[k] < 60) {
            if (jointTime > maxTime) maxTime = jointTime, timeStr = `${arr[i]}${arr[j]}:${arr[h]}${arr[k]}`;
          }
        }
      }
    }
    return timeStr;
  };
  // Three sample test cases to run the function on
  console.log(largestTimeFromDigits([1, 2, 3, 4])) // '23:41'
  console.log(largestTimeFromDigits([5, 5, 5, 5])) // ''
  console.log(largestTimeFromDigits([0, 0, 1, 0])) // '10:00'