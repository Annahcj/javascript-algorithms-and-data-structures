// 2296. Design a Text Editor
// Design a text editor with a cursor that can do the following:
  // Add text to where the cursor is.
  // Delete text from where the cursor is (simulating the backspace key).
  // Move the cursor either left or right.
// When deleting text, only characters to the left of the cursor will be deleted. The cursor will also remain within the actual text and cannot be moved beyond it. More formally, we have that 0 <= cursor.position <= currentText.length always holds.
// Implement the TextEditor class:
// TextEditor() Initializes the object with empty text.
  // void addText(string text) Appends text to where the cursor is. The cursor ends to the right of text.
  // int deleteText(int k) Deletes k characters to the left of the cursor. Returns the number of characters actually deleted.
  // string cursorLeft(int k) Moves the cursor to the left k times. Returns the last min(10, len) characters to the left of the cursor, where len is the number of characters to the left of the cursor.
  // string cursorRight(int k) Moves the cursor to the right k times. Returns the last min(10, len) characters to the left of the cursor, where len is the number of characters to the left of the cursor.


// Solution: Two Stacks

// Split characters into two stacks: 
  // left: characters to the left of the cursor
  // right: characters to the right of the cursor, in reverse order

// When moving the cursor left or right, shift the characters from left to right, or right to left.
// The reason why we use a stack for the right characters is so that we can use pop and push (O(1) operations) instead of shift and unshift (O(n) operations).

// Time Complexity: O(k) for all methods 575ms
// Space Complexity: O(n) 79.1MB
var TextEditor = function() {
  this.left = [];
  this.right = [];
};

TextEditor.prototype.addText = function(text) {
  for (let char of text) this.left.push(char);
};

TextEditor.prototype.deleteText = function(k) {
  let deleted = Math.min(k, this.left.length);
  for (let i = deleted; i > 0; i--) {
    this.left.pop();
  }
  return deleted;
};

TextEditor.prototype.cursorLeft = function(k) {
  while (this.left.length && k > 0) {
    this.right.push(this.left.pop());
    k--;
  }
  return this.left.slice(Math.max(0, this.left.length - 10)).join("");
};

TextEditor.prototype.cursorRight = function(k) {
  while (this.right.length && k > 0) {
    this.left.push(this.right.pop());
    k--;
  }
  return this.left.slice(Math.max(0, this.left.length - 10)).join("");
};

// A few test cases
let textEditor = new TextEditor(); // The current text is "|". (The '|' character represents the cursor)
textEditor.addText("leetcode"); // The current text is "leetcode|".
console.log(textEditor.deleteText(4)); // return 4
                          // The current text is "leet|". 
                          // 4 characters were deleted.
textEditor.addText("practice"); // The current text is "leetpractice|". 
console.log(textEditor.cursorRight(3)); // return "etpractice"
                           // The current text is "leetpractice|". 
                           // The cursor cannot be moved beyond the actual text and thus did not move.
                           // "etpractice" is the last 10 characters to the left of the cursor.
console.log(textEditor.cursorLeft(8)); // return "leet"
                          // The current text is "leet|practice".
                          // "leet" is the last min(10, 4) = 4 characters to the left of the cursor.
console.log(textEditor.deleteText(10)); // return 4
                           // The current text is "|practice".
                           // Only 4 characters were deleted.
console.log(textEditor.cursorLeft(2)); // return ""
                          // The current text is "|practice".
                          // The cursor cannot be moved beyond the actual text and thus did not move. 
                          // "" is the last min(10, 0) = 0 characters to the left of the cursor.
console.log(textEditor.cursorRight(6)); // return "practi"
                           // The current text is "practi|ce".
                           // "practi" is the last min(10, 6) = 6 characters to the left of the cursor.   