// 709. To Lower Case
// Given a string s, return the string after replacing every uppercase letter with the same lowercase letter.


// Solution 1: Using ASCII values

// For each of the characters in the string, we get the character code
// ASCII values: 65 - 96 = uppercase alphabet, 97 - 122 = lowercase alphabet.
// If the char code is between 65 and 95, 
// we simply add 32 to the character code and get the lowercase letter using the 'fromCharCode' function

// Time Complexity: O(n) 76 ms
// Space Complexity: O(n) (output string) 38.8MB

var toLowerCase = function(s) {
    let ans = '';
    for (var i = 0; i < s.length; i++) {
      let charCode = s[i].charCodeAt();
      if (charCode < 91 && charCode > 64) ans += String.fromCharCode(charCode + 32);
      else ans += s[i];
    }
    return ans;
  };
  
  // Three test cases to run function on
  console.log(toLowerCase("Hello")) // "hello"
  console.log(toLowerCase("here")) // "here"
  console.log(toLowerCase("LOVELY")) // lovely"