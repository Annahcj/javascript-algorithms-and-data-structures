// 12. Integer to Roman
// Given an integer, convert it to a roman numeral.


// Solution 1: No Hardcoding Special Cases (e.g. IV, IX, etc.)
// NOTE: This solution will definitely be slower, but may be more suitable for interviews because of the flexibility.

// Store key roman numbers in an object, and numbers [1000, 500, 100, 50, 10, 5, 1] in an array.
// While the number is bigger than 0, we check the first number (924 => 9), accounting for four and nine, otherwise we just keep subtracting the nearest roman integer (either 1000, 500, 100, etc...) and add the corresponding roman numberal to our end string.

// Time Complexity: O(1) 272ms 
// Space Complexity: O(1) 46.5MB

var intToRoman = function(num) {
    let roman = {
      1: 'I',
      5: 'V',
      10: 'X',
      50: 'L',
      100: 'C',
      500: 'D',
      1000: 'M'
    };
    let nums = [1000, 500, 100, 50, 10, 5, 1];
    if (roman[num]) return roman[num];
    let ans = '';
    while (num > 0) {
      for (var i = 0; i < nums.length; i++) {
      if (num >= nums[i]) {
        break;
      }
    }
    let firstNum = +num.toString()[0];
    let sumToMinus = nums[i];
      if (firstNum === 4 || firstNum === 9) {
        if (firstNum === 4) {
          ans += roman[nums[i]] + roman[nums[i - 1]];
          sumToMinus = nums[i] * 4;
        } else {
          ans += roman[nums[i + 1]] + roman[nums[i - 1]];
          sumToMinus = nums[i + 1] * 9;
        }
      } else {
        ans += roman[nums[i]];
      }
      num = num - sumToMinus;
    }
    return ans;
  };
  
  
  // Solution 2: Hardcoding Special Cases
  
  // Store all possible roman numberals in an object, with their numbers in a seperate array.
  // While number is bigger than 0, keep subtracting closest roman integer from number and add the corresponding roman numeral to our end string.
  
  // Time Complexity: O(1) 128ms 
  // Space Complexity: O(1) 45.6MB 
  
  var intToRoman = function(num) {
    let roman = {
      1: 'I',
      4: 'IV',
      5: 'V',
      9: 'IX',
      10: 'X',
      40: 'XL',
      50: 'L',
      90: 'XC',
      100: 'C',
      400: 'CD',
      500: 'D',
      900: 'CM',
      1000: 'M'
    };
    let nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    if (roman[num]) return roman[num];
    let ans = '';
    while (num > 0) {
      for (var i = 0; i < nums.length; i++) {
      if (num >= nums[i]) {
        break;
      }
    }
      ans += roman[nums[i]];
      num = num - nums[i];
    }
    return ans;
  };
  
  // Five test cases to run function on
  console.log(intToRoman(3)) // III
  console.log(intToRoman(4)) // IV
  console.log(intToRoman(9)) // IX
  console.log(intToRoman(58)) // LVIII
  console.log(intToRoman(1994)) // MCMXCIV 