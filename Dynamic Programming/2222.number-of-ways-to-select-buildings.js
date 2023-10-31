// 2222. Number of Ways to Select Buildings
// You are given a 0-indexed binary string s which represents the types of buildings along a street where:
  // s[i] = '0' denotes that the ith building is an office and
  // s[i] = '1' denotes that the ith building is a restaurant.
// As a city official, you would like to select 3 buildings for random inspection. However, to ensure variety, no two consecutive buildings out of the selected buildings can be of the same type.
  // For example, given s = "001101", we cannot select the 1st, 3rd, and 5th buildings as that would form "011" which is not allowed due to having two consecutive buildings of the same type.
// Return the number of valid ways to select 3 buildings.


// Solution 1: DP

// We need to account for the two situations - 010 & 101
// For each index i, count the number of ones and zeros on the left and right of it.
  // left[i][0] = the number of zeros on the left of index i
  // left[i][0] = the number of ones on the left of index i
  // right[i][0] = the number of zeros on the left of index i
  // right[i][1] = the number of ones on the left of index i

// Then, take each index i as the middle building and count the number of valid combinations.
  // 101 case: If middle building is 0, there are (ones on left) * (ones on right) number of ways.
  // 010 case: If middle building is 1, there are (zeros on left) * (zeros on right) number of ways.

// Time Complexity: O(n) 2424ms
// Space Complexity: O(n) 141MB
var numberOfWays = function(s) {
  let n = s.length;
  let left = Array(n).fill(0).map(() => Array(2).fill(0)), right = Array(n).fill(0).map(() => Array(2).fill(0));
  // count the number of zeros and ones on the left of each index i
  for (let i = 0; i < n - 1; i++) {
    left[i + 1][0] = left[i][0] + (s[i] === '0' ? 1 : 0);
    left[i + 1][1] = left[i][1] + (s[i] === '1' ? 1 : 0);
  }
  // count the number of zeros and ones on the right of each index i
  for (let i = n - 1; i > 0; i--) {
    right[i - 1][0] = right[i][0] + (s[i] === '0' ? 1 : 0);
    right[i - 1][1] = right[i][1] + (s[i] === '1' ? 1 : 0);
  }
  
  // take each index i as the middle building and count the number of valid combinations
  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    let val = Number(s[i]) ^ 1;
    ans += left[i][val] * right[i][val];
  }
  return ans;
};


// Solution 2: Constant Space

// The same concept as solution 1 except we are storing the counts in four variables instead of taking O(n * 2) space, and keeping a running count of the counts of ones and zeros.

// Time Complexity: O(n) 186ms
// Space Complexity: O(1) 49.5MB
var numberOfWays = function(s) {
  let n = s.length, zerosRight = 0, onesRight = 0;
  // count the number of zeros and ones in s
  for (let i = 0; i < n; i++) {
    zerosRight += s[i] === '0' ? 1 : 0;
    onesRight += s[i] === '1' ? 1 : 0;
  }
  
  // take each index i as the middle building and count the number of valid combinations
  // keep a running count of the number of zeros and ones on the left
  let ans = 0, zerosLeft = 0, onesLeft = 0;
  for (let i = 0; i < n; i++) {
    zerosRight -= s[i] === '0' ? 1 : 0;
    onesRight -= s[i] === '1' ? 1 : 0;
    
    if (s[i] === '0') { // "101"
      ans += onesLeft * onesRight;
    } else { // "010"
      ans += zerosLeft * zerosRight;
    } 
    
    zerosLeft += s[i] === '0' ? 1 : 0;
    onesLeft += s[i] === '1' ? 1 : 0;
  }
  return ans;
};

// Two test cases
console.log(numberOfWays("001101")) // 6
console.log(numberOfWays("11100")) // 0