// 394. Decode String
// Given an encoded string, return its decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
// You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.
// Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].


// Solution: Two Stacks

// Keep two stacks -> times (the number of times to repeat some string) and stack (where we push in all other characters)
// Loop through s (pointer = i)
  // let's call s[i] 'char'
  // if char is a number
    // (get the entire number)
    // push number to times
  // if char is a closing bracket
    // (get the substring up to the last opening bracket)
    // keep popping from stack until opening bracket is found and append to variable 'subStr'
    // let repeat be times.pop()
    // manually repeat subStr in total 'repeat' number of times, push each character into stack
  // otherwise, push char into stack

// (get final string)
// loop through stack and append each character to 'res'
// return res

// Runtime on LeetCode: 72ms
// Memory Usage on LeetCode: 40MB
var decodeString = function(s) {
  let times = [], stack = [];
  let res = '', n = s.length;
  for (var i = 0; i < n; i++) {
    let char = s[i];
    if (!isNaN(char)) {
      let num = +char;
      while (i < n - 1 && !isNaN(s[i + 1])) {
        i++;
        num = num * 10 + +s[i];
      }
      times.push(num);
    } else if (char === ']') {
      let subStr = '';
      while (stack[stack.length - 1] !== '[') {
        subStr += stack.pop();
      }
      stack.pop();
      let repeat = times.pop(), n = subStr.length;
      for (var j = n * repeat - 1; j >= 0; j--) {
        stack.push(subStr[j % n]);
      }
    } else {
      stack.push(char);
    }
  }
  for (i = 0; i < stack.length; i++) res += stack[i];
  return res;
};

// Four test cases to run function on
console.log(decodeString("3[a]2[bc]")) // "aaabcbc"
console.log(decodeString("3[a2[c]]")) // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")) // "abcabccdcdcdef"
console.log(decodeString("abc3[cd]xyz")) // "abccdcdcdxyz"