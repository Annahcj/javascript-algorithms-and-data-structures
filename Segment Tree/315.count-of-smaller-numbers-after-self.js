// 315. Count of Smaller Numbers After Self
// You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].


// Solution 1: Merge Sort

// Basically, we just sort nums using merge sort, but in the merge helper function, count the number of smaller numbers.
// For example, for numbers [5,2,6,1]
// mergeSort will split them until they are arrays of size 1, and build them back up again.
// [5,2], [6,1]
// [5], [2], [6], [1]
// then will join them with merge (helper function)
// at this stage, we will be merging [5] and [2]. 
// since we know that items in the second array are always on the right of items in the first array, 
// when we check whether the item in arr2 is smaller than the item in arr1, that would mean that we have found a smaller number to the right of arr1[i].
// to illustrate: 2 < 5, and 2 is in arr2, so we can increment the count for 5 by one.
// similarly, [6] and [1] can be joined to [1,6], and the count of 6 will increase by one.
// so far, the result will look like this [1,0,1,0]
// now, we join [2,5] and [1,6]
// compare arr1[i] (2), arr2[j] (1), 1 is smaller AND in arr2, so increment 'smallerCount' by one
// compare arr1[i] (2), arr2[j] (6), 2 is smaller BUT in arr1, so we increment result for 2 by smallerCount.
// (NOTE: Since items will always be sorted, we can keep using and building up smallerCount for the next items)
// compare arr1[i] (5), arr2[j] (6), 5 is smaller BUT in arr1, so we increment result for 5 by smallerCount.
// now, the result will look like this [2,1,1,0]

// *********************************************************
// Algorithm
// Set res (result) to an array the length of nums, filled with 0's.

// (here, we turn each number into an object (val, idx), because the order will be changed)
// Loop through nums (pointer = i)
  // set nums[i] to {val: nums[i], idx: i}
// call mergeSort for nums
// Return res.

// mergeSort (nums)
  // base case: if length of arr is 1, return [arr[0]]
  // get mid point
  // set left to be a recursive call on mergeSort for left half of array
  // set right to be a recursive call on mergeSort for right half of array
  // return merge(left, right)

// merge (arr1, arr2)
  // newArr = [] 
  // set pointers i (for arr1), j (for arr2) to 0
  // set smallerCount to 0 (count of smaller numbers to the right)
  // Loop while i is smaller than arr1 length AND j is smaller than arr2 length
    // if arr2[j] is smaller than arr1[i],
      // increment smallerCount by one
      // push arr2[j] to newArr
      // increment j by one
    // else,
      // (we will be pushing arr1[i] into newArr, so we need to update the smaller number count for it)
      // (find the index of arr1[i] by its 'idx')
      // increment res[arr1[i].idx] by smallerCount
      // push arr1[i] to newArr
      // increment i by one
// (now, we have to clean up the remains of either arr1 or arr2)
// Loop while i is smaller than arr1 length
  // increment res[arr1[i].idx] by smallerCount
  // push arr1[i] to newArr
  // increment i by one

// Loop while j is smaller than arr2 length
  // push arr2[j] to newArr
  // increment j by one

// Return newArr.
// - end of merge function -

// *********************************************************

// Time Complexity: O(n log(n)) 827ms
// Space Complexity: O(n) 112.7MB
var countSmaller = function(nums) {
  let res = Array(nums.length).fill(0);
  for (var i = 0; i < nums.length; i++) {
    nums[i] = {val: nums[i], idx: i};
  }
  nums = mergeSort(nums);
  return res;
  function mergeSort(arr) {
    if (arr.length === 1) return [arr[0]];
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }
  function merge(arr1, arr2) {
    let newArr = [];
    let i = 0, j = 0;
    let smallerCount = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr2[j].val < arr1[i].val) {
        smallerCount++;
        newArr.push(arr2[j]);
        j++;
      } else {
        res[arr1[i].idx] += smallerCount;
        newArr.push(arr1[i]);
        i++;
      }
    }
    while (i < arr1.length) {
      res[arr1[i].idx] += smallerCount;
      newArr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      newArr.push(arr2[j]);
      j++;
    }
    return newArr;
  }
};

// Solution 2: Segment Tree

// Since nums[i] is in the range of [-10000, 10000], create a segment tree of size 10000 * 2 + 1.
// Each bucket in the segment tree represents the count of the number i.

// Traverse nums backwards and get the range sum/count of numbers between -10000 and nums[i] - 1.
// Then, update the count of nums[i].
// Note: We need an offset of 10000 since nums[i] can be as small as -10000. 
  // Whenever updating or getting the range sum/count, remember to add the offset.

// m = 10^4 * 2.
// Time Complexity: O(n log(m)) 528ms
// Space Complexity: O(m) 66.7MB
var countSmaller = function(nums) {
  let n = nums.length, res = Array(n).fill(0);
  let offset = 10 ** 4;
  let segTree = new SegmentTree(offset * 2 + 1);
  for (let i = n - 1; i >= 0; i--) {
    res[i] = segTree.getSum(0, nums[i] + offset - 1);
    segTree.update(nums[i] + offset, 1);
  }
  return res;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] += val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  getSum(left, right) {
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Three test cases to run function on
console.log(countSmaller([5,2,6,1])) // [2,1,1,0]
console.log(countSmaller([-1])) // [0]
console.log(countSmaller([-1,-1])) // [0,0]