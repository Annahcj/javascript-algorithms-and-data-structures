// 273. Integer to English Words
// Convert a non-negative integer num to its English words representation.

// Solution: Using a Map to store English Translations

// Thoughts:
// We store numbers from 1 to 20, 30 to 90 (going up in tens each time), and a thousand, a million, and a billion.
// We can store numbers under a hundred in a hashmap (key = number, value = english) for efficient lookup, and the three cases above a thousand in an array in the following format [number, english].

// Algorithm:
// helper function toWord: (accepts a number under 1000, keep track of str to store english translation)
  // If num is 0, return str.
  // If num is smaller than 20, return the current str + its translation in the u100 hashmap.
  // If num is smaller than 100
    // Find translation of the (first digit of num) * 10, add it to str.
    // Get rid of the first digit of num.
    // Recursively call toWord for num.
  // If num is smaller than 1000
    // Find translation of the first digit of num, add it + 'Hundred' to str.
    // Get rid of the first digit of num.
    // Recursively call toWord for num.
// numerToWords:
// Make a hashmap 'u100' and put the english word for numbers 1 to 20, 30, 40, 50, 60, 70, 80, and 90.
// Make an array 'thousand' and put translations for a thousand, a million, and a billion.
// Edge case: If num is 0, return 'Zero'.
// Keep an answer string 'ans'
// Loop while number is bigger than 0
  // If length of ans is bigger than 0, add a space to it. 
  // If num is smaller than 1000, return ans + toWord(num)
  // Otherwise, loop through thousand and find the first number that is smaller than or equal to num, save it in a variable 'word'. (If num is 2000, stop at 1000)
  // Find next (thousand/million/billion) number, let's call it 'int'. (say if the number is 12543, we find 12). We can calculate this by doing parseInt(num / (thousand/million/billion)). parseInt gets rid of decimal points. 
  // Find the remaining number, set num to num % (thousand/million/billion).
  // Add toWord(int) + (thousand/million/billion) to ans.
// When all is finished, return ans.

// Time Complexity: O(n) (where n is the length of the digits of num) 80ms
// Space Complexity: O(1) (although we store words in a hashmap, it is constant and never changes) 40.2MB
  var numberToWords = function(num) {
    let u100 = {
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten',
      11: 'Eleven',
      12: 'Twelve',
      13: 'Thirteen',
      14: 'Fourteen',
      15: 'Fifteen',
      16: 'Sixteen',
      17: 'Seventeen',
      18: 'Eighteen',
      19: 'Nineteen',
      20: 'Twenty',
      30: 'Thirty',
      40: 'Forty',
      50: 'Fifty',
      60: 'Sixty',
      70: 'Seventy',
      80: 'Eighty',
      90: 'Ninety'
    };
    let thousand = [[1000, 'Thousand'], [1000000, 'Million'], [1000000000, 'Billion']];
    if (num === 0) return 'Zero';
    let ans = '';
    while (num > 0) {
      if (ans.length > 0) ans += ' ';
      if (num < 1000) return ans + toWord(num);
      for (var i = 2; i >= 0; i--) {
        if (thousand[i][0] <= num) {
          break;
        }
      }
      let word = thousand[i][1];
      let remaining = num % thousand[i][0];
      let int = parseInt(num / thousand[i][0]);
      ans += `${toWord(int)} ${word}`;
      num = remaining;
    }
    return ans;
    function toWord(num, str='') {
      if (num === 0) return str;
      if (str.length > 0) str += ' ';
      if (num < 20) return str += `${u100[num]}`;
      if (num < 100) {
        let int = parseInt(num / 10) * 10;
        return toWord(num - int, str + `${u100[int]}`);
      } else {
        let int = parseInt(num / 100);
        return toWord(num - int * 100, str + `${u100[int]} Hundred`);
      }
    }
  };
  
  // Six test cases to run function on
  console.log(numberToWords(1000)) // One Thousand
  console.log(numberToWords(0)) // Zero
  console.log(numberToWords(123)) // "One Hundred Twenty Three"
  console.log(numberToWords(12345)) // "Twelve Thousand Three Hundred Forty Five"
  console.log(numberToWords(1234567)) // "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
  console.log(numberToWords(1234567891)) // "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"