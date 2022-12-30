// 816. Ambiguous Coordinates
// We had some 2-dimensional coordinates, like "(1, 3)" or "(2, 0.5)". Then, we removed all commas, decimal points, and spaces and ended up with the string s.
// For example, "(1, 3)" becomes s = "(13)" and "(2, 0.5)" becomes s = "(205)".
// Return a list of strings representing all possibilities for what our original coordinates could have been.
// Our original representation never had extraneous zeroes, so we never started with numbers like "00", "0.0", "0.00", "1.0", "001", "00.01", or any other number that can be represented with fewer digits. Also, a decimal point within a number never occurs without at least one digit occurring before it, so we never started with numbers like ".1".
// The final answer list can be returned in any order. All coordinates in the final answer have exactly one space between them (occurring after the comma.)


// Solution: Combinations

// Try every combination of splitting s into two parts.
  // For each of the two parts of s, return the valid numbers we can generate.
    // For each part, we can three different situations:
      // 1. Take the whole number as it is. This is valid as long as there are no leading zeros. e.g: 30 -> 30
      // 2. If we have a leading zero, take 0.xxx. This is the only decimal representation we can take. e.g: 042 -> 0.42
      // 3. If we don't have a leading zero AND no trailing zero, take every combination of decimal representations. e.g: 123 -> 1.23, 12.3

// n = length of s
// Time Complexity: O(n^3) 95ms
// Space Complexity: O(n^3) 45.7MB
var ambiguousCoordinates = function(s) {
  let n = s.length, res = [];
  for (let i = 1; i < n - 2; i++) {
    let leftCoords = getCoords(s.slice(1, i + 1));
    let rightCoords = getCoords(s.slice(i + 1, n - 1));
    for (let leftCoord of leftCoords) {
      for (let rightCoord of rightCoords) {
        res.push(`(${leftCoord}, ${rightCoord})`);
      }
    }
  }
  return res;
  
  function getCoords(str) {
    let coords = [];
    let leadingZero = str[0] === '0', trailingZero = str[str.length - 1] === '0';
    if (!leadingZero || str === '0') {
      coords.push(str); // take whole number
    }
    if (leadingZero && str.length > 1 && !trailingZero) {
      coords.push(`0.${str.slice(1)}`);
    }
    if (!leadingZero && !trailingZero) { 
      for (let j = 0; j < str.length - 1; j++) { // decimal representations
        coords.push(`${str.slice(0, j + 1)}.${str.slice(j + 1)}`);
      }
    }
    return coords;
  }
};

// Three test cases
console.log(ambiguousCoordinates("(123)")) // ["(1, 2.3)","(1, 23)","(1.2, 3)","(12, 3)"]
console.log(ambiguousCoordinates("(0123)")) // ["(0, 1.23)","(0, 12.3)","(0, 123)","(0.1, 2.3)","(0.1, 23)","(0.12, 3)"]
console.log(ambiguousCoordinates("(00011)")) // ["(0, 0.011)","(0.001, 1)"]