// 831. Masking Personal Information
// You are given a personal information string s, representing either an email address or a phone number. Return the masked personal information using the below rules.
// Email address:
// An email address is:
  // A name consisting of uppercase and lowercase English letters, followed by
  // The '@' symbol, followed by
  // The domain consisting of uppercase and lowercase English letters with a dot '.' somewhere in the middle (not the first or last character).
// To mask an email:
  // The uppercase letters in the name and domain must be converted to lowercase letters.
  // The middle letters of the name (i.e., all but the first and last letters) must be replaced by 5 asterisks "*****".
// Phone number:
// A phone number is formatted as follows:
  // The phone number contains 10-13 digits.
  // The last 10 digits make up the local number.
  // The remaining 0-3 digits, in the beginning, make up the country code.
  // Separation characters from the set {'+', '-', '(', ')', ' '} separate the above digits in some way.
// To mask a phone number:
// Remove all separation characters.
  // The masked phone number should have the form:
  // "***-***-XXXX" if the country code has 0 digits.
  // "+*-***-***-XXXX" if the country code has 1 digit.
  // "+**-***-***-XXXX" if the country code has 2 digits.
  // "+***-***-***-XXXX" if the country code has 3 digits.
  // "XXXX" is the last 4 digits of the local number.


// Solution: 

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 41.9MB
var maskPII = function(s) {
  if (isEmail(s)) {
    let [name, domain] = s.split('@');
    let maskedName = name[0] + '*****' + name[name.length - 1];
    return (maskedName + '@' + domain).toLowerCase();
  } else {
    let digits = getDigits(s), lastFourDigits = digits.slice(digits.length - 4);
    let countryCodeLen = digits.length - 10;
    let prefix = countryCodeLen === 0 ? '' : `+${'*'.repeat(countryCodeLen)}-`;
    return `${prefix}***-***-${lastFourDigits}`;
  }
};

function isEmail(s) {
  return s.includes('@');
}

function isDigit(char) {
  return char.match(/\d/);
}

function getDigits(s) {
  let digits = "";
  for (let char of s) {
    if (isDigit(char)) {
      digits += char;
    }
  }
  return digits;
}

// Three test cases
console.log(maskPII("LeetCode@LeetCode.com")) // "l*****e@leetcode.com"
console.log(maskPII("AB@qq.com")) // "a*****b@qq.com"
console.log(maskPII("1(234)567-890")) // "***-***-7890"