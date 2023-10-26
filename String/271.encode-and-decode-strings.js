// 271. Encode and Decode Strings
// Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.


// Solution 1: Character 257 as Delimiter

// Time Complexity: O(n) 76ms
// Space Complexity: 45.5MB
var encode = function(strs) {
  let delimiter = String.fromCharCode(257);
  return strs.join(delimiter);
};

var decode = function(s) {
  let delimiter = String.fromCharCode(257);
  return s.split(delimiter);
};

// Solution 2: Define Size of Next Chunk

// The strs ["Two","Five"] become 003Two004Five
// The 003 and 004 denotes strings of length 3 and 4 coming directly afterwards.
// By defining the length, we won't have to worry about what the strings contain since we know the exact length.

// Why does the number always have three digits?
  // This is because the longest string has a length of 200 in this challenge, so I kept it to a length of 3 for simplicity.

// Time Complexity: O(n) 104ms
// Space Complexity: O(1) 44.6MB
var encode = function(strs) {
  let ans = '';
  for (var str of strs) {
    let len = str.length.toString();
    let padding = 3 - len.length;
    // pad with zeros before putting the length number
    ans += '0'.repeat(padding) + len;
    // then add the string itself
    ans += str;
  }
  return ans;
};

var decode = function(s) {
  if (!s.length) return [];
  let i = 0, res = [];
  while (i < s.length) {
    // take the length information
    let len = +(s.slice(i, i + 3));
    // take the string
    res.push(s.slice(i + 3, i + 3 + len));
    // jump to the next length information
    i += 3 + len;
  }
  return res;
};

// A few test cases 
let encoded = encode(["Hello","World"]) 
console.log(encoded)
console.log(decode(encoded)) // ["Hello","World"]