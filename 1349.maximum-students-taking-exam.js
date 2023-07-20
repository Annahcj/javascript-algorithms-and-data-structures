// 1349. Maximum Students Taking Exam
// Given a m * n matrix seats  that represent seats distributions in a classroom. If a seat is broken, it is denoted by '#' character otherwise it is denoted by a '.' character.
// Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting directly in front or behind him. Return the maximum number of students that can take the exam together without any cheating being possible..
// Students must be placed in seats in good condition.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(row, prevRowMask), where
  // row = the row number
  // prevRowMask = bitmask representing the state of the previous row

// Note: In the row bitmask, 0 represents a non-occupied seat (regardless of empty or broken) and 1 represents a student.

// For each dp(row, prevRowMask), try every valid seating combination for this row.
// Although it is not necessary with the given constraints, we can use backtracking to generate only the valid seating combination based on the previous row. This is an alternative to enumerating each possible bitmask.

// Time Complexity: O(m * 2^n * 2^n) 74ms
// Space Complexity: O(m * 2^n) 44.9MB
var maxStudents = function(seats) {
  let m = seats.length, n = seats[0].length;
  let memo = Array(m).fill(0).map(() => Array(1 << n).fill(-1));
  return dp(0, 0);
  
  function dp(row, prevRowMask) {
    if (row === m) return 0;
    if (memo[row][prevRowMask] !== -1) return memo[row][prevRowMask];
    
    let ans = 0, possibleRowMasks = getPossibleRows(seats[row], prevRowMask);
    for (let rowMask of possibleRowMasks) {
      ans = Math.max(ans, countStudents(rowMask) + dp(row + 1, rowMask));
    }
    return memo[row][prevRowMask] = ans;
  }
};

function countStudents(rowMask) {
  let students = 0;
  while (rowMask > 0) {
    students += (rowMask & 1);
    rowMask >>= 1;
  }
  return students;
}

// return the array of bitmasks representing all the possible rows based on the previous row
function getPossibleRows(seats, prevRowMask) {
  let possibleRows = [], n = seats.length;
  let prevRow = prevRowMask.toString(2);
  prevRow = '0'.repeat(n - prevRow.length) + prevRow;
  backtrack(0, 0);
  return possibleRows;
  
  function backtrack(col, rowMask) {
    if (col === n) {
      possibleRows.push(rowMask);
      return;
    }
    backtrack(col + 1, rowMask << 1); // leave as empty
    let upperLeftIsStudent = col > 0 && prevRow[col - 1] === '1';
    let upperRightIsStudent = col < n - 1 && prevRow[col + 1] === '1';
    let leftIsStudent = col > 0 && (rowMask & 1);
    if (seats[col] === '.' && !upperLeftIsStudent && !upperRightIsStudent && !leftIsStudent) {
      backtrack(col + 1, (rowMask << 1) | 1); // student takes the seat
    }
  }
}

// Two test cases
console.log(maxStudents([["#",".","#","#",".","#"],[".","#","#","#","#","."],["#",".","#","#",".","#"]])) // 4
console.log(maxStudents([[".","#"],["#","#"],["#","."],["#","#"],[".","#"]])) // 3