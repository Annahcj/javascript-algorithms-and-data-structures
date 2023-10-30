// 93. Restore IP Addresses
// A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.
  // For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
// Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.


// Solution: Backtracking

// Use recursive backtracking to find all possible valid IP addresses.

// Time Complexity: O(1) 113ms
// Space Complexity: O(1) 40.4MB
var restoreIpAddresses = function(s) {
  let res = [];
  backtrack(0, []);
  return res;
  
  function backtrack(start, address) {
    if (start === s.length) {
      if (address.length !== 4) return;
      res.push(address.join("."));
      return;
    }
    for (let i = start; i < s.length; i++) {
      let str = s.slice(start, i + 1), num = +str;
      if (num > 255 || (str.length > 1 && str[0] === '0')) break; // break if number is larger than 255 or has leading zeroes
      address.push(str);
      backtrack(i + 1,  address);
      address.pop();
    }
  }  
};

// Three test cases
console.log(restoreIpAddresses("25525511135")) // ["255.255.11.135","255.255.111.35"]
console.log(restoreIpAddresses("0000")) // ["0.0.0.0"]
console.log(restoreIpAddresses("101023")) // ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]