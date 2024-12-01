// 1346. Check If N and Its Double Exist
// Given an array arr of integers, check if there exist two indices i and j such that :
  // i != j
  // 0 <= i, j < arr.length
  // arr[i] == 2 * arr[j]


// Solution: Sorting & Two Pointers

// Sort the array in asc order.
// Maintain two pointers - left pointer moves up incrementally and right pointer moves either down or up depending on whether arr[i] is negative or positive.

// Consider arr as two split segments - the negative numbers and the positive numbers.
// If arr[i] is negative, move the right pointer up while arr[j] < arr[i] / 2.
// If arr[i] is positive, move the right pointer up while arr[j] < arr[i] * 2.

// Return true if we find arr[i] * 2 === arr[j] OR arr[i] / 2 === arr[j].

// Time Complexity: O(n log(n)) 4ms
// Space Complexity: O(log(n)) 51.8MB
function checkIfExist(arr) {
  arr.sort((a, b) => a - b);
  let n = arr.length;
  for (let i = 0, j = 1; i < n; i++) {
    if (arr[i] >= 0) {
      while (j < n && arr[j] < arr[i] * 2) j++; 
    } else {
      while (j < n && arr[j] < arr[i] / 2) j++;
    }
    if (j !== i && (arr[i] * 2 === arr[j] || arr[i] / 2 === arr[j])) {
      return true;
    }
  }
  return false;
};

// Two test cases
console.log(checkIfExist([10,2,5,3])) // true
console.log(checkIfExist([3,1,7,11])) // false