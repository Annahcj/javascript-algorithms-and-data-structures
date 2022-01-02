// 2125. Number of Laser Beams in a Bank
// Anti-theft security devices are activated inside a bank. You are given a 0-indexed binary string array bank representing the floor plan of the bank, which is an m x n 2D matrix. bank[i] represents the ith row, consisting of '0's and '1's. '0' means the cell is empty, while'1' means the cell has a security device.
// There is one laser beam between any two security devices if both conditions are met:
  // The two devices are located on two different rows: r1 and r2, where r1 < r2.
  // For each row i where r1 < i < r2, there are no security devices in the ith row.
// Laser beams are independent, i.e., one beam does not interfere nor join with another.
// Return the total number of laser beams in the bank.


// Solution: 

// Count the number of security devices in each row.
// Calculate the total count of the products of each neighboring non-zero pair.

// Time Complexity: O(mn) 147ms
// Space Complexity: O(m) 48MB
var numberOfBeams = function(bank) {
  let m = bank.length, n = bank[0].length, count = Array(m).fill(0); 
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (bank[i][j] === '1') count[i]++;
    }
  } 
  let total = 0, prev = 0;
  for (var curr = 1; curr < m; curr++) {
    total += count[prev] * count[curr];
    if (count[curr] !== 0) {
      prev = curr;
    }
  }
  return total;
};

// Two test cases to run function on
console.log(numberOfBeams(["011001","000000","010100","001000"])) // 8
console.log(numberOfBeams(["000","111","000"])) // 0