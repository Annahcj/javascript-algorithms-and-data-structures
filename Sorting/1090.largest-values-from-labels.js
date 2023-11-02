// 1090. Largest Values From Labels
// There is a set of n items. You are given two integer arrays values and labels where the value and the label of the ith element are values[i] and labels[i] respectively. You are also given two integers numWanted and useLimit.
// Choose a subset s of the n elements such that:
  // The size of the subset s is less than or equal to numWanted.
  // There are at most useLimit items with the same label in s.
// The score of a subset is the sum of the values in the subset.
// Return the maximum score of a subset s.


// Solution: Greedy w/ Sorting 

// Sort items by value.
// Greedily take the items by the largest value.

// Keep track of how many of each item we have taken.
// If we have exceeded the limit for an item, skip that item.

// Time Complexity: O(n log(n)) 156ms
// Space Complexity: O(n) 48MB
var largestValsFromLabels = function(values, labels, numWanted, useLimit) {
  let items = [], n = values.length;
  for (let i = 0; i < n; i++) {
    items.push([values[i], labels[i]]);
  }
  items.sort((a, b) => b[0] - a[0]);
  
  let count = {}, score = 0, size = 0;
  for (let i = 0; i < n && size < numWanted; i++) {
    let [value, label] = items[i];
    if ((count[label] || 0) === useLimit) continue; // already used this label useLimit number of times
    score += value;
    size++;
    count[label] = (count[label] || 0) + 1;
  }
  return score;
};

// Three test cases
console.log(largestValsFromLabels([5,4,3,2,1], [1,1,2,2,3], 3, 1)) // 9
console.log(largestValsFromLabels([5,4,3,2,1], [1,3,3,3,2], 3, 2)) // 12
console.log(largestValsFromLabels([9,8,8,7,6], [0,0,0,1,1], 3, 1)) // 16