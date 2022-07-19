// 1187. Make Array Strictly Increasing
// Given two integer arrays arr1 and arr2, return the minimum number of operations (possibly zero) needed to make arr1 strictly increasing.
// In one operation, you can choose two indices 0 <= i < arr1.length and 0 <= j < arr2.length and do the assignment arr1[i] = arr2[j].
// If there is no way to make arr1 strictly increasing, return -1.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j, prevIndex), where 
  // i = index in arr1, 
  // j = index in arr2, 
  // prevIndex = index of previous array 
    // 0 = arr1
    // 1 = arr2
// It is always optimal to replace arr1[i] with the smallest possible arr2[j] we have. Sort arr2 to achieve this.
// Make sure to move j up to the next index where arr2[j] > previous (use binary search to speed it up).
// For each arr[i], take the minimum of two options:
  // If arr1[i] > previous, use arr1[i].
  // If arr2[j] > previous, use arr2[j].

// Time Complexity: O(nm) 1105ms
// Space Complexity: O(nm) 126.3MB
var makeArrayIncreasing = function(arr1, arr2) {
  let n = arr1.length, m = arr2.length;
  let memo = new Map();
  arr2.sort((a, b) => a - b);
  let res = Math.min(dp(1, 0, 0), dp(1, 1, 1) + 1);
  return res === Infinity ? -1 : res;
  
  function dp(i, j, prevIndex) { // i = index in arr1, j = index in arr2, prevIndex = index of previous array (0 = arr1, 1 = arr2)
    if (i === n) return 0;
    let key = `${i},${j},${prevIndex}`;
    if (memo.has(key)) return memo.get(key);
    
    let prev = prevIndex === 0 ? arr1[i - 1] : arr2[j - 1];
    j = getNextIndex(prev, j);
    
    let keep = arr1[i] > prev ? dp(i + 1, j, 0) : Infinity;
    let replace = (j < m && arr2[j] > prev) ? dp(i + 1, j + 1, 1) + 1 : Infinity;
    
    let ans = Math.min(keep, replace);
    memo.set(key, ans);
    return ans;
  }
  
  function getNextIndex(prev, j) {
    let low = j, high = arr2.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr2[mid] > prev) high = mid;
      else low = mid + 1;
    }
    return low;
  }
};

// Three test cases to run function on
console.log(makeArrayIncreasing([1,5,3,6,7], [1,3,2,4])) // 1
console.log(makeArrayIncreasing([1,5,3,6,7], [4,3,1])) // 2
console.log(makeArrayIncreasing([1,5,3,6,7], [1,6,3,3])) // -1