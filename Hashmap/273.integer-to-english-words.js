// 273. Integer to English Words
// Convert a non-negative integer num to its English words representation.


// Solution:

// Split num in segments of 3, starting from the end.
// Each segment is less than 1000 and will have the same prefix (123 = One Hundred Twenty Three) regardless of the suffix (Thousand, Million, Billion).

// Special cases:
  // 1. If the whole number is 0, return 'Zero'.
  // 2. If a segment starts with 0, ignore all the leading zeros (e.g. '092' or '007').
  // 3. If a segment is '000', omit it from the final word representation (e.g. 123000 -> 'One Hundred Twenty Three Thousand').
  // 4. Numbers from 10 to 19 need a special mapping that ignores the last digit.

// Time Complexity: O(1) 61ms
// Space Complexity: O(1) 51.4MB
var numberToWords = function(num) {
  if (num === 0) return 'Zero';
  num = num.toString();
  const suffix = ['', ' Thousand', ' Million', ' Billion'];
  let words = [], n = num.length;
  for (let i = n - 1, suffixIndex = 0; i >= 0; i -= 3, suffixIndex++) {
    let startIndex = Math.max(0, i - 2);
    let prefix = getEnglishWordForSegment(num.slice(startIndex, i + 1));
    if (prefix === 'Zero') continue; // skip all zeros
    words.push(prefix + suffix[suffixIndex]);
  }
  return words.reverse().join(" ");
};

// Return the english word for the number (< 1000).
function getEnglishWordForSegment(num) {
  num = parseInt(num).toString();
  if (num === '0') return 'Zero';
  const onesMap = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine'
  };
  const teensMap = {
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen'
  };
  const tensMap = {
    2: 'Twenty',
    3: 'Thirty',
    4: 'Forty',
    5: 'Fifty',
    6: 'Sixty',
    7: 'Seventy',
    8: 'Eighty',
    9: 'Ninety'
  };
  
  let word = [];
  if (num.length === 3) { // in the hundreds
    word.push(onesMap[num[0]] + ' Hundred');
  }
  if (num.length >= 2) {
    if (teensMap[num.slice(num.length - 2)]) { // special mapping for 10-19
      word.push(teensMap[num.slice(num.length - 2)]);
      return word.join(" ");
    } else if (num[num.length - 2] !== '0') { // omit trailing zeros
      word.push(tensMap[num[num.length - 2]]); 
    }
  }
  if (num[num.length - 1] !== '0') { // last digit
    word.push(onesMap[num[num.length - 1]]);
  }
  return word.join(" ");
}

// Three test cases
console.log(numberToWords(123)) // "One Hundred Twenty Three"
console.log(numberToWords(12345)) // "Twelve Thousand Three Hundred Forty Five"
console.log(numberToWords(1234567)) // "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"