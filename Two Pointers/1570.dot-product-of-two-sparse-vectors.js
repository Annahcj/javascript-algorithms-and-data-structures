// 1570. Dot Product of Two Sparse Vectors
// Given two sparse vectors, compute their dot product.


// Solution 1: Hashmap

// Use a hashmap to map non-zero values to their indexes.

// Runtime on LeetCode: 185ms
// Memory Usage on LeetCode: 61.8MB

// k = number of non-zero elements
// T.C: O(n), S.C: O(k)
var SparseVector = function(nums) {
  this.nonZero = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) this.nonZero[i] = nums[i];
  }
};

// T.C: O(k), S.C: O(1)
SparseVector.prototype.dotProduct = function(vec) {
  let map1 = this.nonZero, map2 = vec.nonZero;
  let product = 0;
  for (let idx in map1) {
    if (map2[idx] !== undefined) product += map1[idx] * map2[idx];
  }
  return product;
};


// Solution 2: Two Pointers

// Keep non-zero elements in an array as [index, value] pairs.
// Use two pointers to loop through both arrays and add products of values of matching indexes to the answer.

// Runtime on LeetCode: 112ms
// Memory Usage on LeetCode: 53.3MB

// k = number of non-zero elements
// T.C: O(n), S.C: O(k)
var SparseVector = function(nums) {
  this.arr = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) this.arr.push([i, nums[i]]);
  }
};

// k = number of non-zero elements in vertex 1, k2 = number of non-zero elements in vertex 2
// T.C: O(k + k2), S.C: O(1)
SparseVector.prototype.dotProduct = function(vec) {
  let arr1 = this.arr, arr2 = vec.arr;
  let product = 0;
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i][0] === arr2[j][0]) {
      product += arr1[i][1] * arr2[j][1];
      i++, j++;
    } else if (arr1[i][0] < arr2[j][0]) i++;
    else j++;
  }
  return product;
};

let v1 = new SparseVector([1,0,0,2,3]);
let v2 = new SparseVector([0,3,0,4,0]);
console.log(v1.dotProduct(v2)) // 8