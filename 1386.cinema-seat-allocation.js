// 1386. Cinema Seat Allocation
// A cinema has n rows of seats, numbered from 1 to n and there are ten seats in each row, labelled from 1 to 10 as shown in the figure above.
// Given the array reservedSeats containing the numbers of seats already reserved, for example, reservedSeats[i] = [3,8] means the seat located in row 3 and labelled with 8 is already reserved.
// Return the maximum number of four-person groups you can assign on the cinema seats. A four-person group occupies four adjacent seats in one single row. Seats across an aisle (such as [3,3] and [3,4]) are not considered to be adjacent, but there is an exceptional case on which an aisle split a four-person group, in that case, the aisle split a four-person group in the middle, which means to have two people on each side.


// Solution: Only check rows in reservedSeats

// Each empty row can seat at most two 4-person groups.

// 1. Set the total groups to n * 2, then reduce the count from rows which are in reservedSeats.
// 2. For each row in reservedSeats, mark an occupied seat as 0, and an empty seat as 1.
// 3. Go through each modified row, and recalculate the maximum number of 4-person groups. 
  // Decrement the total groups by (2 - new group count) for each modified row.

// Time Complexity: O(n) 359ms
// Space Complexity: O(n) 62.4MB
var maxNumberOfFamilies = function(n, reservedSeats) {
  let total = n * 2;
  let map = {};
  for (var [row, seat] of reservedSeats) {
    if (!map[row]) map[row] = Array(11).fill(1);
    map[row][seat] = 0;
  }
  
  for (var rowNum in map) {
    let row = map[rowNum], count = 0;
    let allowed = new Set([2,4,6]);
    for (var i = 1; i <= 7; i++) {
      if (!allowed.has(i)) continue;
      if (row[i] === 1 && row[i + 1] === 1 && row[i + 2] === 1 && row[i + 3] === 1) {
        count++;
        i += 3;
      }
    }
    total -= (2 - count);
  }
  return total;
};

// Two test cases to run function on
console.log(maxNumberOfFamilies(3, [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]])) // 4
console.log(maxNumberOfFamilies(2, [[2,1],[1,8],[2,6]])) // 2