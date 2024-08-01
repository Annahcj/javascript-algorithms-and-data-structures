// 3206. Alternating Groups I
// There is a circle of red and blue tiles. You are given an array of integers colors. The color of tile i is represented by colors[i]:
  // colors[i] == 0 means that tile i is red.
  // colors[i] == 1 means that tile i is blue.
// Every 3 contiguous tiles in the circle with alternating colors (the middle tile has a different color from its left and right tiles) is called an alternating group.
// Return the number of alternating groups.
// Note that since colors represents a circle, the first and the last tiles are considered to be next to each other.


// Solution: Fixed Sliding Window

// Compare every three adjacent tiles and return the alternating groups.

// Time Complexity: O(n) 66ms
// Space Complexity: O(1) 51.7MB
function numberOfAlternatingGroups(colors) {
  let n = colors.length, groups = 0;
  for (let i = 0; i < n; i++) {
    let first = i, second = i + 1, third = i + 2;
    if (colors[first % n] !== colors[second % n] && colors[second % n] !== colors[third % n]) {
      groups++;
    }
  }
  return groups;
};

// Two test cases
console.log(numberOfAlternatingGroups([1,1,1])) // 0
console.log(numberOfAlternatingGroups([0,1,0,0,1])) // 3