// 6. Zigzag Conversion


// Solution: 

// P   A   H   N
// A P L S I I G
// Y   I   R

// Using the above example, walk through these steps:
  // 1. Go downwards until we reach the bottom, pushing each character into its row (e.g: s[0] into row 0, s[1] into row 1, s[3] into row 1)
  // 2. Go upwards until we reach the top, pushing each character into its row.
  // Repeat these two steps until we finish iterating through s.

// Time Complexity: O(n) 88ms
// Space Complexity: O(n) 49MB
var convert = function(s, numRows) {
  if (numRows === 1) return s;
  
  let rows = new Array(numRows);
  for (let i = 0; i < numRows; i++) rows[i] = [];
  
  let row = 0, dir = 1;
  for (let i = 0; i < s.length; i++) {
    rows[row].push(s[i]);
    if (row === numRows - 1) dir = -1;
    else if (dir === -1 && row === 0) dir = 1;
    row += dir;
  }
  
  let res = "";
  for (let i = 0; i < numRows; i++) {
    res += rows[i].join("");
  }
  return res;
};

// Two test cases
console.log(convert("PAYPALISHIRING", 3)) // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)) // "PINALSIGYAHRPI"