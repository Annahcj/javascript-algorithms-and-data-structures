// 722. Remove Comments
// After removing the comments from the source code, return the source code in the same format.


// Solution: Flags

// Use three flags to indicate the type of comment we are in:
  // isBlockComment: indicates whether we are currently in a block comment
  // isLineComment: indicates whether we are currently in a line comment. This resets for each line.
  // isSkipped: When we find the end of a block comment '*/', mark it as isSkipped so that we will not record it in our current line.

// When we find a line comment '//', mark isLineComment as true and increment the pointer to skip over the second '/'.
// When we find a block comment start '/*', mark isBlockComment as true and increment the pointer to skip over the '*'.
// When we find a block comment end '*/', mark isBlockComment as false and increment the pointer to skip over the '/'.
  // Additionally, we also mark isSkipped as true to avoid adding '*' to our current line since we won't have isBlockComment set to true anymore.

// n = total number of characters in source
// Time Complexity: O(n) 67ms
  // technically, it is O(n^2) due to the way strings are built.
  // it can be O(n) if we use an array and join it into a string at the end of each line.
  // however, I prefer building using a string due to the cleanness.
// Space Complexity: O(n) 42.6MB
var removeComments = function(source) {
  let res = [], isBlockComment = false, currLine = '';
  for (let i = 0; i < source.length; i++) {
    let isLineComment = false;
    for (let j = 0; j < source[i].length; j++) {
      let chars = source[i].slice(j, j + 2), isSkipped = false;
      if (!isBlockComment && chars === '//') isLineComment = true, j++;
      if (!isLineComment) {
        if (!isBlockComment && chars === '/*') isBlockComment = true, j++;
        else if (isBlockComment && chars === '*/') isBlockComment = false, j++, isSkipped = true;
      }
      if (!isSkipped && !isBlockComment && !isLineComment && j < source[i].length) currLine += source[i][j];
    }
    if (!isBlockComment && currLine.length) { 
      res.push(currLine);
      currLine = '';
    }
  }
  return res;
};

// Two test cases to run function on
console.log(removeComments(["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"])) // ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]
console.log(removeComments(["a/*comment", "line", "more_comment*/b"])) // ["ab"]