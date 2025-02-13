// 3447. Assign Elements to Groups with Constraints
// You are given an integer array groups, where groups[i] represents the size of the ith group. You are also given an integer array elements.
// Your task is to assign one element to each group based on the following rules:
  // An element j can be assigned to a group i if groups[i] is divisible by elements[j].
  // If there are multiple elements that can be assigned, assign the element with the smallest index j.
  // If no element satisfies the condition for a group, assign -1 to that group.
// Return an integer array assigned, where assigned[i] is the index of the element chosen for group i, or -1 if no suitable element exists.
// Note: An element may be assigned to more than one group.

 
// Solution: Enumerate Divisors

// The amount of divisors for every number costs sqrt(n), so it is small enough to loop over for each groups[i].
// First, store the minimum index for every distinct elements[i] as there can be duplicates.
// Then, for every groups[i], iterate through each divisor and find the minimum minElementIndex[divisor], minElementIndex[groups[i] / divisor].

// n = number of groups, m = number of elements
// Time Complexity: O(n sqrt(n) + m) 498ms
// Space Complexity: O(n + m) 87.80MB
function assignElements(groups, elements) {
  const n = groups.length, m = elements.length;
  const maxElement = Math.max(...elements);
  const minElementIndex = Array(maxElement + 1).fill(Infinity);
  for (let j = 0; j < m; j++) {
    minElementIndex[elements[j]] = Math.min(minElementIndex[elements[j]], j);
  }
  const assigned = Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    for (let x = 1; x * x <= groups[i]; x++) {
      if (groups[i] % x === 0) {
        assigned[i] = Math.min(assigned[i], minElementIndex[x] ?? Infinity, minElementIndex[groups[i] / x] ?? Infinity);
      }
    }
    assigned[i] = assigned[i] === Infinity ? -1 : assigned[i];
  }
  return assigned;
};

// Two test cases
console.log(assignElements([8,4,3,2,4], [4,2])) // [0,0,-1,1,0]
console.log(assignElements([2,3,5,7], [5,3,3])) // [-1,1,0,-1]