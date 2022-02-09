// 1220. Count Vowels Permutation
// Given an integer n, your task is to count how many strings of length n can be formed under the following rules:
  // Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
  // Each vowel 'a' may only be followed by an 'e'.
  // Each vowel 'e' may only be followed by an 'a' or an 'i'.
  // Each vowel 'i' may not be followed by another 'i'.
  // Each vowel 'o' may only be followed by an 'i' or a 'u'.
  // Each vowel 'u' may only be followed by an 'a'.
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution 1: Dynamic Programming

// Key:
// "a": 0,
// "e": 1,
// 'i': 2,
// "o": 3,
// "u": 4

// dp[i][j] = numbers of permutations with length i ending with vowel j.
// j is within the range of [0,4].

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 50.9MB
var countVowelPermutation = function(n) {
  let dp = Array(n), mod = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    dp[i] = Array(5).fill(0);
  }
  dp[0] = Array(5).fill(1); // base case: all vowels can be used when length is 1
  
  for (let i = 1; i < n; i++) {
    dp[i][1] = dp[i - 1][0]; // a -> e
    dp[i][0] = (dp[i - 1][1] + dp[i - 1][4]) % mod; // e -> a, u -> a
    dp[i][2] = (dp[i - 1][1] + dp[i - 1][3]) % mod; // e -> i, o -> i
    dp[i][4] = dp[i - 1][3]; // o -> u
    
    for (let j = 0; j < 5; j++) { // i -> all except i
      if (j === 2) continue;
      dp[i][j] = (dp[i][j] + dp[i - 1][2]) % mod;
    }
  }
  
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    sum = (sum + dp[n - 1][i]) % mod;
  }
  return sum;
};

// Solution 2: Constant Space

// We can just use 5 variables to track the previous vowels states, and another 5 variables to track the current states.

// Time Complexity: O(n) 79ms
// Space Complexity: O(1) 42.3MB
var countVowelPermutation = function(n) {
  let prevA = 1, prevE = 1, prevI = 1, prevO = 1, prevU = 1;
  let mod = 10 ** 9 + 7;
  for (let i = 1; i < n; i++) {
    let currA = 0, currE = 0, currI = 0, currO = 0, currU = 0;
    currE = prevA; // a -> e
    currA = (prevE + prevU) % mod; // e -> a, u -> a
    currI = (prevE + prevO) % mod; // e -> i, o -> i
    currU = prevO; // o -> u
    
    // i -> any vowel except i
    currA = (currA + prevI) % mod; 
    currE = (currE + prevI) % mod;
    currO = (currO + prevI) % mod;
    currU = (currU + prevI) % mod;
    
    prevA = currA;
    prevE = currE;
    prevI = currI;
    prevO = currO;
    prevU = currU;
  }
  return (prevA + prevE + prevI + prevO + prevU) % mod;
};

// Four test cases to run function on
console.log(countVowelPermutation(1)) // 5
console.log(countVowelPermutation(2)) // 10
console.log(countVowelPermutation(5)) // 68
console.log(countVowelPermutation(10)) // 1739