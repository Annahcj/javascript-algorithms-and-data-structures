// 68. Text Justification
// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.


// Solution 1: Process Line by Line

// Loop through words, calculating total width as we go,
// if total width exceeds maxWidth, 
  // if the number of words is only one, we left justify it, meaning we simply add the word, plus (maxWidth - wordLength) number of spaces after it.
  // if number of words is more than one
    // we generate a sentence from start to i - 1 (since it exceeds, we can't use the current word we are on)
    // to calculate spaces for each word: divide maxWidth by number of words, and round it down.
    // to calculate extra spaces (if spaces cannot be evenly distributed): get modular of maxWidth / num words
    // while we still have extra spaces, add current word + avg spaces + 1, and decrement extra spaces.
// for the last line, it must be left justified, so we just add the words together connected by one space and append the correct number of spaces at the end.
// (as we generate each line, we push it into the result array)
// return the result array.

// Time Complexity: O(n) (length of words) 68ms
// Space Complexity: O(1) 38.9MB
var fullJustify = function(words, maxWidth) {
    let lineLength = 0, start = 0;
    let result = [];
    let numSpaces, totalSpaces, spaces, remainder, sentence;
    for (var i = 0; i < words.length; i++) {
      lineLength += words[i].length + 1;
      if (lineLength - 1 > maxWidth) {
        lineLength = lineLength - words[i].length - 2;
        numSpaces = i - 1 - start;
        totalSpaces = maxWidth - lineLength;
        spaces = Math.floor(totalSpaces / numSpaces);
        remainder = totalSpaces % numSpaces;
        if (!numSpaces) {
          // left justification / only one word in a line
          result.push(words[i - 1] + ' '.repeat(totalSpaces));
        } else {
          // normal spacing
          sentence = '';
          for (var j = start; j < i - 1; j++) {
            if (remainder > 0) {
              sentence += words[j] + ' '.repeat(spaces + 2);
              remainder--;
            } else {
              sentence += words[j] + ' '.repeat(spaces + 1);
            }
          }
          sentence += words[j];
          result.push(sentence);
        }
        lineLength = words[i].length + 1, start = i;
      }
    }
    sentence = '', lineLength = 0;
    // for last line
    for (var k = start; k < i - 1; k++) {
      lineLength += words[k].length + 1;
      sentence += words[k] + ' ';
    }
    // for last word of last line
    lineLength += words[i - 1].length;
    sentence += words[i - 1];
    // spacing for end of last line
    sentence += ' '.repeat(maxWidth - lineLength);
    result.push(sentence);
    return result;
  };
  
  // Two test cases to run function on
  console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16)) // [
  //    "This    is    an",
  //    "example  of text",
  //    "justification.  "
  // ]
  console.log(fullJustify(["What","must","be","acknowledgment","shall","be"], 16)) // [
  //   "What   must   be",
  //   "acknowledgment  ",
  //   "shall be        "
  // ]