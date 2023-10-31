// 1868. Product of Two Run-Length Encoded Arrays


// Solution 1: Two Pointers

// Keep track of two pointers i and j for encoded1 and encoded2.
// Also keep track of two remainder variables rem1 and rem2 which signify the amount that encoded1[i] and encoded2[j] have left.
// A simpler way would be to manipulate the input array, but since this is not good practice, I made this solution as well.
// 1. Take the minimum of rem1 and rem2 at each iteration -> and take min off rem1 and rem2
// 2. Add into res (if the last product is the same, add min onto the count)
// 3. If rem1 is 0, increment i and set rem1 to the next amount.
//    If rem2 is 0, increment j and set rem2 to the next amount.

// Time Complexity: O(n + m) 1000ms
// Space Complexity: O(1) (not including output) 135.8MB
var findRLEArray = function(encoded1, encoded2) {
  let n = encoded1.length, m = encoded2.length;
  let i = 0, j = 0;
  let rem1 = encoded1[0][1], rem2 = encoded2[0][1];
  let res = [];
  while (i < n && j < m) {
    let product = encoded1[i][0] * encoded2[j][0];
    let min = Math.min(rem1, rem2);
    rem1 -= min, rem2 -= min;
    if (!res.length || res[res.length - 1][0] !== product) {
      res.push([product, min]);
    } else {
      res[res.length - 1][1] += min;
    }
    if (rem1 === 0) {
      i++;
      rem1 = i === n ? 0 : encoded1[i][1];
    }
    if (rem2 === 0) {
      j++;
      rem2 = j === m ? 0 : encoded2[j][1];
    }
  } 
  return res; 
};

// Solution 2: Two Pointers (modifies input)

// The same idea as solution 1, but instead of keeping track of the remaining amount, we subtract off the input.

// Time Complexity: O(n + m) 696ms
// Space Complexity: O(1) (not including output) 89.2MB
var findRLEArray = function(encoded1, encoded2) {
  let n = encoded1.length, m = encoded2.length;
  let i = 0, j = 0;
  let res = [];
  while (i < n && j < m) {
    let product = encoded1[i][0] * encoded2[j][0];
    let min = Math.min(encoded1[i][1], encoded2[j][1]);
    encoded1[i][1] -= min;
    encoded2[j][1] -= min;
    if (!res.length || res[res.length - 1][0] !== product) {
      res.push([product, min]);
    } else {
      res[res.length - 1][1] += min;
    }
    if (encoded1[i][1] === 0) i++;
    if (encoded2[j][1] === 0) j++;
  } 
  return res; 
};

// Two test cases
console.log(findRLEArray([[1,3],[2,3]], [[6,3],[3,3]])) // [[6,6]]
console.log(findRLEArray([[1,3],[2,1],[3,2]], [[2,3],[3,3]])) // [[2,3],[6,1],[9,2]]