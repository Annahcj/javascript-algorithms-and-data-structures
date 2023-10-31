// 2103. Rings and Rods
// There are n rings and each ring is either red, green, or blue. The rings are distributed across ten rods labeled from 0 to 9.
// You are given a string rings of length 2n that describes the n rings that are placed onto the rods. Every two characters in rings forms a color-position pair that is used to describe each ring where:
  // The first character of the ith pair denotes the ith ring's color ('R', 'G', 'B').
  // The second character of the ith pair denotes the rod that the ith ring is placed on ('0' to '9').
// For example, "R3G2B1" describes n == 3 rings: a red ring placed onto the rod labeled 3, a green ring placed onto the rod labeled 2, and a blue ring placed onto the rod labeled 1.
// Return the number of rods that have all three colors of rings on them.


// Solution: Counting w/ Hashmaps

// Since the number of rods are <= 10, we can create an array colors with the size of 10.
// Set each colors[i] to an empty hashmap.

// Mark each color at its rod as true.
// Get the number of rods which have all three colors.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 38.9MB (will never be bigger than 10 * 3 = 30)
var countPoints = function(rings) {
  let colors = Array(10);
  for (let i = 0; i < 10; i++) colors[i] = {};
  for (let i = 0; i < rings.length; i += 2) {
    let color = rings[i], idx = rings[i + 1];
    colors[idx][color] = true;
  }   
  let count = 0;
  for (let i = 0; i < 10; i++) {
    if (colors[i]['R'] && colors[i]['G'] && colors[i]['B']) count++;
  }
  return count;
};

// Two test cases
console.log(countPoints("B0R0G0R9R0B0G0")) // 1
console.log(countPoints("B0B6G0R6R0R6G9")) // 1