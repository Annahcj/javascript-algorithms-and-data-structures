// 535. Encode and Decode TinyURL
// TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk. Design a class to encode a URL and decode a tiny URL.


// Solution: Hashmap & Generate Random Code

// Use two hashmaps which store the mappings of the longUrls to shortUrls and the other way around.
// encode the longUrl into a 6 random characters in the choice of (26 lowercase, 26 uppercase, digits 0-9), in total 62 choices.
// The chances of a collision is very small, but we still have to handle it, so keep generating the random code until we get a new one.

// Both time and space complexity is O(1) for one call.

let long2Short = new Map();
let short2Long = new Map();
let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

var encode = function(longUrl) {
  if (long2Short.has(longUrl)) return long2Short.get(longUrl);
  let code = getCode();
  while (short2Long.has(code)) code = getCode();
  short2Long.set(code, longUrl);
  long2Short.set(longUrl, code);
  return 'http://tinyurl.com/' + code;
};
  
function getCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    let idx = Math.floor(Math.random() * 62);
    code += chars[idx];
  }
  return code;
}

var decode = function(shortUrl) {
  let code = shortUrl.slice(shortUrl.length - 6);
  return short2Long.get(code);  
};

// A test case to run functions on
console.log(decode(encode("https://leetcode.com/problems/design-tinyurl"))) // "https://leetcode.com/problems/design-tinyurl"