// 468. Validate IP Address
// Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type.
// A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses but "192.168.01.1", while "192.168.1.00" and "192.168@1.1" are invalid IPv4 addresses.
// A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:
  // 1 <= xi.length <= 4
  // xi is a hexadecimal string which may contain digits, lower-case English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
  // Leading zeros are allowed in xi.


// Solution 1: Split

// Time Complexity: O(1) 98ms
// Space Complexity: O(1) 42.2MB
var validIPAddress = function(queryIP) {
  if (isValidIPv4(queryIP)) return 'IPv4';
  return isValidIPv6(queryIP) ? 'IPv6' : 'Neither';
  
  function isValidIPv4(IP) {
    let arr = IP.split(".");
    if (arr.length !== 4) return false;
    for (let num of arr) {
      // empty string, larger than 255, leading zero, non-digit.
      if (!num.length || +num > 255 || (num[0] === '0' && num.length > 1) || num.match(/[^0-9]/)) return false;
    }
    return true;
  }
  
  function isValidIPv6(IP) {
    let arr = IP.split(":");
    if (arr.length !== 8) return false;
    for (let str of arr) {
      // empty string, length greater than 4, character not matching 0-9, a-f, A-F.
      if (!str.length || str.length > 4 || str.match(/[^0-9a-f]/i)) return false;
    }
    return true;
  }
};

// Solution 2: Without Split

// Time Complexity: O(1) 76ms
// Space Complexity: O(1) 43.8MB
var validIPAddress = function(queryIP) {
  if (isValidIPv4(queryIP)) return 'IPv4';
  return isValidIPv6(queryIP) ? 'IPv6' : 'Neither';
  
  function isValidIPv4(IP) {
    let num = "", x = 0, n = IP.length; // num = current number, x = number of 'chunks'
    for (let i = 0; i < n; i++) {
      if (IP[i] === '0') {
        // leading zero
        if (i < n - 1 && IP[i + 1] !== '.' && +num === 0) return false;
        num += IP[i];
      } else if (IP[i] === '.') {
        // empty string or larger than 255
        if (!num.length || +num > 255) return false;
        num = "";
        x++;
      } else if (IP[i].match(/\d/)) {
        num += IP[i];
      } else return false; // non-digit
    }
    // check the last chunk
    return IP[n - 1] !== '.' && +num <= 255 && x === 3;
  }
  
  function isValidIPv6(IP) {
    let n = IP.length, x = 0, len = 0;
    for (let i = 0; i < n; i++) {
      if (IP[i] === ':') {
        // length of chunk must be 1-4
        if (len === 0 || len > 4) return false;
        len = 0;
        x++;
      } else if (IP[i].match(/[0-9a-f]/i)) { // character doesn't match 0-9, a-f, A-F
        len++;
      } else return false;
    }
    // last chunk
    return len > 0 && len < 5 && x === 7;
  }
};

// Three test cases to run function on
console.log(validIPAddress("172.16.254.1")) // "IPv4"
console.log(validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334")) // "IPv6"
console.log(validIPAddress("256.256.256.256")) // "Neither"