// 3484. Design Spreadsheet
// A spreadsheet is a grid with 26 columns (labeled from 'A' to 'Z') and a given number of rows. Each cell in the spreadsheet can hold an integer value between 0 and 10^5.
// Implement the Spreadsheet class:
  // Spreadsheet(int rows) Initializes a spreadsheet with 26 columns (labeled 'A' to 'Z') and the specified number of rows. All cells are initially set to 0.
  // void setCell(String cell, int value) Sets the value of the specified cell. The cell reference is provided in the format "AX" (e.g., "A1", "B10"), where the letter represents the column (from 'A' to 'Z') and the number represents a 1-indexed row.
  // void resetCell(String cell) Resets the specified cell to 0.
  // int getValue(String formula) Evaluates a formula of the form "=X+Y", where X and Y are either cell references or non-negative integers, and returns the computed sum.
// Note: If getValue references a cell that has not been explicitly set using setCell, its value is considered 0.


// Solution: 2D Array

// Use a 2D array to store the cell values: cells[26][rows].

// setCell: Update the cell value in the 2D array the given value.
// resetCell: Update the cell value in the 2D array to be 0.
// getValue: Parse the values in the formula based on whether it's a number, and sum the values together.

// Time Complexity: O(1) 106ms
  // setCell: O(1)
  // resetCell: O(1)
  // getValue: O(1)
// Space Complexity: O(rows * 26) 79MB
class Spreadsheet {
  constructor(rows) {
    this.cells = Array(26).fill(0).map(() => Array(rows).fill(0));
  }
  setCell(cell, value) {
    const [col, row] = this.#getCoords(cell);
    this.cells[col][row] = value;
  }
  resetCell(cell) {
    const [col, row] = this.#getCoords(cell);
    this.cells[col][row] = 0;
  }
  getValue(formula) {
    const [x, y] = formula.slice(1).split('+');
    const valueX = isNaN(x) ? this.cells[this.#getCoords(x)[0]][this.#getCoords(x)[1]] : parseInt(x);
    const valueY = isNaN(y) ? this.cells[this.#getCoords(y)[0]][this.#getCoords(y)[1]] : parseInt(y);
    return valueX + valueY;
  }
  #getCoords(cell) {
    const col = cell[0], row = cell.slice(1);
    return [col.charCodeAt() - 65, parseInt(row) - 1];
  }
}

// A few test cases
var spreadsheet = new Spreadsheet(3); // Initializes a spreadsheet with 3 rows and 26 columns
console.log(spreadsheet.getValue("=5+7")); // returns 12 (5+7)
spreadsheet.setCell("A1", 10); // sets A1 to 10
console.log(spreadsheet.getValue("=A1+6")); // returns 16 (10+6)
spreadsheet.setCell("B2", 15); // sets B2 to 15
console.log(spreadsheet.getValue("=A1+B2")); // returns 25 (10+15)
spreadsheet.resetCell("A1"); // resets A1 to 0
console.log(spreadsheet.getValue("=A1+B2")); // returns 15 (0+15)