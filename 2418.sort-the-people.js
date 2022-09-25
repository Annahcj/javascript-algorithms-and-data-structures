// 2418. Sort the People
// You are given an array of strings names, and an array heights that consists of distinct positive integers. Both arrays are of length n.
// For each index i, names[i] and heights[i] denote the name and height of the ith person.
// Return names sorted in descending order by the people's heights.


// Solution: Sorting

// Group each [names[i], heights[i]] and sort by height.
// Return the names after sorting.

// Time Complexity: O(n log(n)) 81ms
// Space Complexity: O(n) 47.2MB
var sortPeople = function(names, heights) {
  let people = [], n = names.length;
  for (let i = 0; i < n; i++) {
    people.push([names[i], heights[i]]);
  }
  return people.sort((a, b) => b[1] - a[1]).map(([name]) => name);
};

// Two test cases
console.log(sortPeople(["Mary","John","Emma"], [180,165,170])) // ["Mary","Emma","John"]
console.log(sortPeople(["Alice","Bob","Bob"], [155,185,150])) // ["Bob","Alice","Bob"]