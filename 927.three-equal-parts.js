// 927. Three Equal Parts
// You are given an array arr which consists of only zeros and ones, divide the array into three non-empty parts such that all of these parts represent the same binary value.
// If it is possible, return any [i, j] with i + 1 < j, such that:
  // arr[0], arr[1], ..., arr[i] is the first part,
  // arr[i + 1], arr[i + 2], ..., arr[j - 1] is the second part, and
  // arr[j], arr[j + 1], ..., arr[arr.length - 1] is the third part.
  // All three parts have equal binary values.
// If it is not possible, return [-1, -1].
// Note that the entire part is used when considering what binary value it represents. For example, [1,1,0] represents 6 in decimal, not 3. Also, leading zeros are allowed, so [0,1,1] and [1,1] represent the same value.


// Solution: Math Logic

// The number of ones must be equal for the three parts.
// First, get the positions of each 1.
// Then, check that the distances between the ones in each part are consistent for all three parts.

// Trailing zeros:
  // Find the number of zeros behind the last one of the third part, since that determines the number of zeros that need to come behind the first and second part.
  // Count the distance between the end of each part to the start of the next part (excluding the third part).
  // If the distances between the end/start of parts are greater than or equal to the trailing zeros on the third part, then it is possible for the three parts to be equal since any extra zeros can be leading zeros which don't affect the binary value.

// n = length of arr
// Time Complexity: O(n) 63ms
// Space Complexity: O(n) 47.1MB
var threeEqualParts = function(arr) {
  let n = arr.length, ones = 0, onesIndexes = [];
  for (let i = 0; i < n; i++) {
    if (arr[i] === 1) {
      ones++;
      onesIndexes.push(i);
    }
  }
  if (ones % 3 !== 0) return [-1, -1];
  if (ones === 0) return [0, 2];
  let oneThird = ones / 3;
  let trailingZeros = n - onesIndexes[onesIndexes.length - 1] - 1;
  let firstEnd = onesIndexes[oneThird - 1], secondStart = onesIndexes[oneThird];
  let secondEnd = onesIndexes[ones - oneThird - 1], thirdStart = onesIndexes[ones - oneThird];
  if (secondStart - firstEnd - 1 < trailingZeros || thirdStart - secondEnd - 1 < trailingZeros) return [-1, -1]; // not enough trailing zeros in first or second part
  
  // check distances between ones are consistent for all three parts
  for (let i = 1; i < oneThird; i++) {
    let firstDiff = onesIndexes[i] - onesIndexes[i - 1];
    let secondDiff = onesIndexes[i + oneThird] - onesIndexes[i + oneThird - 1];
    let thirdDiff = onesIndexes[i + oneThird * 2] - onesIndexes[i + oneThird * 2 - 1];
    if (firstDiff !== secondDiff || secondDiff !== thirdDiff) return [-1, -1];
  }
  return [firstEnd + trailingZeros, secondEnd + trailingZeros + 1];
};

// Three test cases
console.log(threeEqualParts([1,0,1,0,1])) // [0,3]
console.log(threeEqualParts([1,1,0,1,1])) // [-1,-1]
console.log(threeEqualParts([1,1,0,0,1])) // [0,2]