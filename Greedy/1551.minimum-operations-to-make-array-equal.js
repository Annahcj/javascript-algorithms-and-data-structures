// 1551. Minimum Operations to Make Array Equal
// You have an array arr of length n where arr[i] = (2 * i) + 1 for all valid values of i (i.e., 0 <= i < n).
// In one operation, you can select two indices x and y where 0 <= x, y < n and subtract 1 from arr[x] and add 1 to arr[y] (i.e., perform arr[x] -=1 and arr[y] += 1). The goal is to make all the elements of the array equal. It is guaranteed that all the elements of the array can be made equal using some operations.
// Given an integer n, the length of the array, return the minimum number of operations needed to make all the elements of arr equal.


// Solution: Greedy Approach 

// It is always optimal to turn all numbers into the median.

// If n is odd, turn every number into the median number.
// If n is even, turn every number into the middle of the two medians.

// e.g: n = 3 -> [1, 3, 5] turn 1 and 5 into 3. 
// We only need to calculate one side, so 3 - 1 = 2, ans = 2.

// e.g: n = 4 -> [1, 3, 5, 7], turn 1, 3, 5, and 7 into 4.
// 4 - 1 = 3
// 4 - 3 = 1
// ans = 3 + 1 = 4

// Time Complexity: O(n) 96ms
// Space Complexity: O(1) 42MB
var minOperations = function(n) {
  let mid1 = getVal(Math.floor((n - 1) / 2)), mid2 = getVal(Math.ceil((n - 1) / 2));
  let mid = n % 2 === 0 ? (mid1 + mid2) / 2 : mid1;
  
  let l = 0, r = n - 1, ans = 0;
  while (l < r) {
    ans += mid - getVal(l);
    l++, r--;
  }
  return ans;
};

function getVal(num) {
  return (2 * num) + 1;
}

// Three test cases
console.log(minOperations(3)) // 2
console.log(minOperations(4)) // 4
console.log(minOperations(6)) // 9