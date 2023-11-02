// 799. Champagne Tower
// We stack glasses in a pyramid, where the first row has 1 glass, the second row has 2 glasses, and so on until the 100th row.  Each glass holds one cup of champagne.
// Then, some champagne is poured into the first glass at the top.  When the topmost glass is full, any excess liquid poured will fall equally to the glass immediately to the left and right of it.  When those glasses become full, any excess champagne will fall equally to the left and right of those glasses, and so on.  (A glass at the bottom row has its excess champagne fall on the floor.)
// For example, after one cup of champagne is poured, the top most glass is full.  After two cups of champagne are poured, the two glasses on the second row are half full.  After three cups of champagne are poured, those two cups become full - there are 3 full glasses total now.  After four cups of champagne are poured, the third row has the middle glass half full, and the two outside glasses are a quarter full, as pictured below.


// Solution: Dynamic Programming

// Observations: 
  // 1. Each row will have exactly row number + 1 number of glasses.
  // 2. We need to process the entire row before processing the next row because two glasses may pour to the same glass on the next level

// We only need to keep track of the previous and current level of glasses.
// Start with the top glass with the value of poured.
// Work downwards and only take maximum 1 glass for each,
  // Spread the remaining champagne to the two lower glasses.

// n = query_row
// Time Complexity: O(n^2) 99ms
// Space Complexity: O(n) 46.1MB
var champagneTower = function(poured, query_row, query_glass) {
  let row = [poured];
  for (let i = 0; i < query_row; i++) {
    let nextRow = Array(row.length + 1).fill(0);
    for (let j = 0; j <= i; j++) {
      let amount = row[j], amountHeld = Math.min(amount, 1);
      amount -= amountHeld;
      if (amount > 0) {
        nextRow[j] += amount / 2;
        nextRow[j + 1] += amount / 2;
      }
    }
    row = nextRow;
  }
  return Math.min(row[query_glass], 1);
};

// Three test cases to run function on
console.log(champagneTower(1, 1, 1)) // 0.00000
console.log(champagneTower(2, 1, 1)) // 0.50000
console.log(champagneTower(100000009, 33, 17)) // 1.00000