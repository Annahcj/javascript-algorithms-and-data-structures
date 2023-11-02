// 493. Reverse Pairs
// Given an integer array nums, return the number of reverse pairs in the array.
// A reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].


// Solution: Mergesort

// In mergesort, there is a helper function 'merge' which merges two sorted arrays into one sorted array.
// Inside this merge function, we end up comparing numbers from the two sorted arrays.
// We can utilize these comparisons to count the number of reverse pairs.

// Note: Compare for the reverse pairs, and merging into an array must be done separately due to the conditions for a reverse pair.
// e.g: [3,4,5], [1,2,2]
// i = pointer for left, j = pointer for right.

//  i        j
// [3,4,5], [1,2,2]
// right[j] (1) * 2 < left[i] (3), so smallerCount++ and j++;

//  i          j
// [3,4,5], [1,2,2]
// right[j] (2) * 2 IS NOT < left[i] (3), so i++;
// add smallerCount (1) to our result (1)

//    i        j
// [3,4,5], [1,2,2]
// right[j] (2) * 2 IS NOT < left[i] (4), so i++;
// add smallerCount (1) to our result (now 2)

//      i      j
// [3,4,5], [1,2,2]
// right[j] (2) * 2 < left[i] (5), so smallerCount++ and j++;

//      i        j
// [3,4,5], [1,2,2]
// right[j] (2) * 2 < left[i] (5), so smallerCount++ and j++;

// since j === right.length, our while loop is terminated.
// but we still need to calculate the rest of the reverse pairs for the left array.
// the amount of items on the left remaining: left.length - i.
// add smallerCount * amount of items remaining on left to our result.

// then, we would merge left and right into a single sorted array and return for the next call.

// Time Complexity: O(n log(n)) 276ms
// Space Complexity: O(n) 82.2MB
var reversePairs = function(nums) {
  let res = 0;
  mergesort(nums);
  return res;
  
  function mergesort(nums) {
    if (nums.length === 1) return [nums[0]];
    let mid = Math.floor(nums.length / 2);
    let left = mergesort(nums.slice(0, mid));
    let right = mergesort(nums.slice(mid));
    return merge(left, right);
  }
  
  function merge(left, right) {
    let smallerCount = 0;
    let i = 0, j = 0;
    let newArr = [];
    
    // find the number of reverse pairs
    while (i < left.length && j < right.length) {
      if (right[j] * 2 < left[i]) {
        smallerCount++;
        j++;
      } else {
        res += smallerCount;
        i++;
      }
    }
    res += smallerCount * (left.length - i);
    
    // populate newArr
    i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (right[j] < left[i]) newArr.push(right[j++]);
      else newArr.push(left[i++]);
    }
    while (i < left.length) newArr.push(left[i++]);
    while (j < right.length) newArr.push(right[j++]);
    return newArr;
  }
};

// Two test cases to run function on
console.log(reversePairs([1,3,2,3,1])) // 2
console.log(reversePairs([2,4,3,5,1])) // 3