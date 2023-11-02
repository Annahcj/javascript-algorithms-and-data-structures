// 2468. Split Message Based on Limit
// You are given a string, message, and a positive integer, limit.
// You must split message into one or more parts based on limit. Each resulting part should have the suffix "<a/b>", where "b" is to be replaced with the total number of parts and "a" is to be replaced with the index of the part, starting from 1 and going up to b. Additionally, the length of each resulting part (including its suffix) should be equal to limit, except for the last part whose length can be at most limit.
// The resulting parts should be formed such that when their suffixes are removed and they are all concatenated in order, they should be equal to message. Also, the result should contain as few parts as possible.
// Return the parts message would be split into as an array of strings. If it is impossible to split message as required, return an empty array.


// Solution: Check Each Number of Digits 

// Notice that we only care about the number of digits in the number of parts, since the length of part will only change if the number of digits in the number of parts changes.
// There are only "d" number of cases to check for, where d = the number of digits in the length of message (since a part must contain at least one character from message).
  // partsLen = number of digits in b (e.g: 14 -> number of digits = 2).
  // Find the smallest number of parts that we can split into a valid array.
  // Then, generate the final split array.

// n = message.length, d = number of digits in message.length (<= 5)
// Time Complexity: O(nd) 240ms
// Space Complexity: O(n) 60.4MB
var splitMessage = function(message, limit) {
  let n = message.length, d = message.length.toString().length;
  for (let len = 1; len <= d; len++) {
    let parts = getParts(len);
    if (parts === -1) continue;
    return splitMessage(parts, len);
  }
  return [];
  
  function getParts(partsLen) {
    let currLen = 0, part = 1;
    for (let i = 0; i < n; i++) {
      currLen++;
      let suffixLen = 3 + part.toString().length + partsLen;
      if (currLen + suffixLen > limit) return -1; 
      if (part >= 10 ** partsLen) return -1; // number of parts we have taken exceeded the maximum length we have set
      if (currLen + suffixLen === limit) {
        currLen = 0;
        part++;
      }
    }
    return currLen > 0 ? part : part - 1;
  }  
  
  function splitMessage(parts, partsLen) {
    let str = "", res = [], part = 1;
    for (let i = 0; i < n; i++) {
      str += message[i];
      let suffixLen = 3 + part.toString().length + partsLen;
      if (str.length + suffixLen === limit) {
        res.push(`${str}<${part}/${parts}>`);
        str = "";
        part++;
      }
    }
    if (str.length > 0) res.push(`${str}<${part}/${parts}>`);
    return res;
  }
};

// Two test cases
console.log(splitMessage("this is really a very awesome message", 9)) // ["thi<1/14>","s i<2/14>","s r<3/14>","eal<4/14>","ly <5/14>","a v<6/14>","ery<7/14>"," aw<8/14>","eso<9/14>","me<10/14>"," m<11/14>","es<12/14>","sa<13/14>","ge<14/14>"]
console.log(splitMessage("short message", 15)) // ["short mess<1/2>","age<2/2>"]