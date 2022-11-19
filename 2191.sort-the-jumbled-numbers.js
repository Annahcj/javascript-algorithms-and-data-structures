// 2191. Sort the Jumbled Numbers
// You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit i should be mapped to digit j in this system.
// The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.
// You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.
// Notes:
  // Elements with the same mapped values should appear in the same relative order as in the input.
  // The elements of nums should only be sorted based on their mapped values and not be replaced by them.


// Solution: Precompute Mapped Values & Sort

// Precompute the mapped value of each number.
// Sort nums based on their mapped values.
// If the mapped values of two numbers are equal, the original order will be maintained.

// Time Complexity: O(n log(n)) 519ms
// Space Complexity: O(n) 63.3MB
var sortJumbled = function(mapping, nums) {
  let mappedValues = new Map();
  for (let num of nums) {
    if (mappedValues.has(num)) continue; // already computed for this number
    let mappedValue = getMappedValue(num);
    mappedValues.set(num, mappedValue);
  }
  nums.sort((a, b) => mappedValues.get(a) - mappedValues.get(b));
  return nums;
  
  function getMappedValue(num) {
    if (num === 0) return mapping[0];
    let pow10 = 1, mappedValue = 0;
    while (num > 0) {
      let digit = num % 10;
      mappedValue += pow10 * mapping[digit];
      pow10 *= 10;
      num = Math.floor(num / 10);
    }
    return mappedValue;
  }
};

// Two test cases
console.log(sortJumbled([8,9,4,0,2,1,3,5,7,6], [991,338,38])) // [338,38,991]
console.log(sortJumbled([0,1,2,3,4,5,6,7,8,9], [789,456,123])) // [123,456,789]