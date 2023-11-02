// 68. Text Justification
// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.


// Solution: 

// Go through words[i] from left to right.
// Keep track of the current count of words and count of characters of the words.
  // wordCount = number of words in the current sentence
  // charCount = number of characters for the words in the current sentence

// To calculate whether it's possible for a subarray of words to be grouped in one sentence, add the current charCount to the number of words - 1 (since we take minimum of one space in between words).
// If adding words[i] to the current sentence makes the minimum sentence length exceed maxWidth, then we need to create a sentence up to the previous word.
  // To get the number of spaces between two words: Math.ceil(totalSpaces / (number of words - 1))
  // We keep updating totalSpaces and wordCount as we process each word in the sentence.

// Time Complexity: O(n) 53ms
// Space Complexity: O(n) 42.5MB
var fullJustify = function(words, maxWidth) {
  let n = words.length, wordCount = 0, charCount = 0, sentences = [];
  for (let i = 0; i < n; i++) {
    let newWordCount = wordCount + 1;
    let newCharCount = charCount + words[i].length;
    // if adding words[i] to the current sentence makes the character count + the count of adding one space in between each word exceeds maxWidth, then we need to split the sentence
    if (newCharCount + newWordCount - 1 > maxWidth) {
      sentences.push(getSentence(words, maxWidth, i - wordCount, i - 1, charCount));
      wordCount = 0;
      charCount = 0;
    }
    wordCount++;
    charCount += words[i].length;
  }
  let lastSentence = getLeftJustifiedSentence(words, maxWidth, n - wordCount, n - 1);
  sentences.push(lastSentence);
  return sentences;
};

// returns [words[start], ..., words[end]] evenly separated by spaces
// edge case: if there is only one word, the space will be added to the end
function getSentence(words, maxWidth, start, end, charCount) {
  if (start === end) return getLeftJustifiedSentence(words, maxWidth, start, end);
  let totalSpaces = maxWidth - charCount;
  let sentence = words[start];
  let wordCount = end - start;
  for (let i = start + 1; i <= end; i++) {
    let spaces = Math.ceil(totalSpaces / wordCount);
    sentence += " ".repeat(spaces) + words[i];
    totalSpaces -= spaces;
    wordCount--;
  }
  return sentence;
}

// returns [words[start], ..., words[end]] separated by one space, with spaces padded at the end
function getLeftJustifiedSentence(words, maxWidth, start, end) {
  let sentence = words[start];
  let charCount = words[start].length;
  for (let i = start + 1; i <= end; i++) {
    sentence += ' ' + words[i];
    charCount += words[i].length + 1;
  }
  return sentence + ' '.repeat(maxWidth - charCount);
}
  
// Two test cases 
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