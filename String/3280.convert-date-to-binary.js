// 3280. Convert Date to Binary
// You are given a string date representing a Gregorian calendar date in the yyyy-mm-dd format.
// date can be written in its binary representation obtained by converting year, month, and day to their binary representations without any leading zeroes and writing them down in year-month-day format.
// Return the binary representation of date.


// Solution:

// Time Complexity: O(1) 46ms
// Space Complexity: O(1) 50.9MB
function convertDateToBinary(date) {
  const year = Number(date.slice(0, 4)).toString(2);
  const month = Number(date.slice(5, 7)).toString(2);
  const day = Number(date.slice(8)).toString(2);
  return `${year}-${month}-${day}`;
};

// Two test cases
console.log(convertDateToBinary("2080-02-29")) // "100000100000-10-11101"
console.log(convertDateToBinary("1900-01-01")) // "11101101100-1-1"