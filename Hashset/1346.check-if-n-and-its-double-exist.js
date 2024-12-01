// 1346. Check If N and Its Double Exist
// Given an array arr of integers, check if there exist two indices i and j such that :
  // i != j
  // 0 <= i, j < arr.length
  // arr[i] == 2 * arr[j]


// Solution: Hashset

// Store each number in a hashset and check whether the hashset contains arr[i] / 2 or arr[i] * 2.

// Time Complexity: O(n) 2ms
// Space Complexity: O(n) 51.2MB
function checkIfExist(arr) {
  let set = new Set();
  for (let num of arr) {
    if (set.has(num * 2) || set.has(num / 2)) {
      return true;
    }
    set.add(num);
  }
  return false;
};

// Two test cases
console.log(checkIfExist([10,2,5,3])) // true
console.log(checkIfExist([3,1,7,11])) // false