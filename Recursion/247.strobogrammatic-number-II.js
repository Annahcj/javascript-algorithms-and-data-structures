// 247. Strobogrammatic Number II
// Given an integer n, return all the strobogrammatic numbers that are of length n. You may return the answer in any order.
// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).


// Solution: Recursion - Expand Outwards

// If n is odd, each number must have a single middle number - either 0, 1, or 8.
// Then, expand outwards from the center, wrapping it with a strobogrammatic pair: (0,0), (1,1), (6,9), (8,8), (9,6)

// Note: Watch out for the leading zero edge case. 
  // A number can only be wrapped with two zeros if its not the most outmost pair (the first and last digits)
 
// Time Complexity: O(5^(n/2)) 223ms
// Space Complexity: O(n/2) (not including output) 70.6MB
var findStrobogrammatic = function(n) {
  let map = [['1','1'],['6','9'],['8','8'],['9','6']], single = ['0','1','8'];
  let res = [];
  if (n % 2 === 0) recurse("");
  else for (let num of single) recurse(num);
  return res;
  
  function recurse(num) {
    if (num.length === n) {
      res.push(num);
      return;
    }
    
    for (let [x, y] of map) {
      recurse(x + num + y);
    }
    if (num.length + 2 !== n) recurse('0' + num + '0');
  }
};

// Two test cases to run function on
console.log(findStrobogrammatic(2)) // ["11","69","88","96"]
console.log(findStrobogrammatic(1)) // ["0","1","8"]