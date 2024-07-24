// 3208. Alternating Groups II
// There is a circle of red and blue tiles. You are given an array of integers colors and an integer k. The color of tile i is represented by colors[i]:
  // colors[i] == 0 means that tile i is red.
  // colors[i] == 1 means that tile i is blue.
// An alternating group is every k contiguous tiles in the circle with alternating colors (each tile in the group except the first and last one has a different color from its left and right tiles).
// Return the number of alternating groups.
// Note that since colors represents a circle, the first and the last tiles are considered to be next to each other.


// Solution: Sliding Window w/ Counting

// Maintain a sliding window of alternating elements.
// When adjacent elements are equal, reset the window.
// If the window size is larger than or equal to k, we have a valid alternating group.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 58.6MB
function numberOfAlternatingGroups(colors, k) {
  let n = colors.length, groups = 0, count = 1;
  for (let i = 0; i < n + k - 2; i++) {
    let modIndex = i % n;
    if (colors[modIndex] === colors[((modIndex - 1) + n) % n]) { // reset the window once we have two equal elements
      count = 1;
    } else {
      count++;
    }
    if (count >= k) groups++;
  }
  return groups;
};

// Three test cases
console.log(numberOfAlternatingGroups([0,1,0,1,0], 3)) // 3
console.log(numberOfAlternatingGroups([0,1,0,0,1,0,1], 6)) // 2
console.log(numberOfAlternatingGroups([1,1,0,1], 4)) // 0