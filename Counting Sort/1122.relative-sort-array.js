// 1122. Relative Sort Array
// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.


// Solution: Counting Sort

// Sort the values of arr1 in-place using counting sort.

// 1. Count the occurances of each number in arr1.
// 2. Go through each num in arr2 and replace arr1[i] with num while count[num] > 0.
// 3. Go through the remaining numbers in arr2 (whatever remaining in count), and replace arr1[i] with each number while count[num] > 0.

// n = length of arr1, m = max(arr1[i])
// Time Complexity: O(n + m) 61ms
// Space Complexity: O(m) 50.1MB
function relativeSortArray(arr1, arr2) {
  let max = Math.max(...arr1), count = Array(max + 1).fill(0);
  for (let num of arr1) {
    count[num]++;
  }
  let i = 0;
  for (let num of arr2) {
    while (count[num] > 0) {
      arr1[i] = num;
      i++;
      count[num]--;
    }
  }
  for (let j = 0; j < count.length; j++) {
    while (count[j] > 0) {
      arr1[i] = j;
      i++;
      count[j]--;
    }
  }
  return arr1;
};

// Two test cases
console.log(relativeSortArray([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6])) // [2,2,2,1,4,3,3,9,6,7,19]
console.log(relativeSortArray([28,6,22,8,44,17], [22,28,8,6])) // [22,28,8,6,17,44]