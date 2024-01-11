// 2999. Count the Number of Powerful Integers
// You are given three integers start, finish, and limit. You are also given a 0-indexed string s representing a positive integer.
// A positive integer x is called powerful if it ends with s (in other words, s is a suffix of x) and each digit in x is at most limit.
// Return the total number of powerful integers in the range [start..finish].
// A string x is a suffix of a string y if and only if x is a substring of y that starts from some index (including 0) in y and extends to the index y.length - 1. For example, 25 is a suffix of 5125 whereas 512 is not.


// Solution: Digit DP

// Memoize each dp(i, startState, finishState), where
  // i = current length of the number
  // startState = state of the number against start (0 if smaller, 1 if the same, 2 if bigger)
  // finishState = state of the number against finish (0 if smaller, 1 if the same, 2 if bigger)

// For each dp(i, startState, finishState), 
// try adding each possible digit from 0 to limit.
// Ensure the number doesn't become smaller than start, or bigger than finish.
// For each number, add s to the end and calculate whether it is within the range [start..finish].

// m = number of digits in finish
// Time Complexity: O(9m * limit) 106ms
// Space Complexity: O(9m) 54.8MB
var numberOfPowerfulInt = function(start, finish, limit, s) {
  start = start.toString(), finish = finish.toString();
  let maxLen = finish.length - s.length;
  let memo = Array(maxLen + 1).fill(0).map(() => Array(3).fill(0).map(() => Array(3).fill(-1)));
  return dp(0, 1, 1);
  
  function dp(i, startState, finishState) {
    if (i + s.length > finish.length) return 0;
    if (memo[i][startState][finishState] !== -1) return memo[i][startState][finishState];
    
    let count = numWithSuffixIsWithinRange(i, startState, finishState, start, finish, s) ? 1 : 0;
    for (let newDigit = 0; newDigit <= limit; newDigit++) {
      if (i === 0 && newDigit === 0) continue; // no leading zeros
      count += dp(i + 1, getNextState(i + 1, start, startState, newDigit), getNextState(i + 1, finish, finishState, newDigit));
    }
    return memo[i][startState][finishState] = count;
  }
};

function numWithSuffixIsWithinRange(i, startState, finishState, start, finish, s) {
  let newStartState = startState;
  let newFinishState = finishState;
  let len = i;
  for (let digit of s) {
    len++;
    newStartState = getNextState(len, start, newStartState, digit);
    newFinishState = getNextState(len, finish, newFinishState, digit);
  }
  if (len < start.length || len > finish.length) return false;
  if ((len === start.length && newStartState === 0) || (len === finish.length && newFinishState === 2)) return false;
  return true;
}

function getNextState(newLen, toCompare, oldState, newDigit) {
  if (newLen > toCompare.length) return 2;
  // state only changes if it was tracking equal so far
  if (oldState === 1) {
    if (toCompare[newLen - 1] == newDigit) return 1;
    return toCompare[newLen - 1] < newDigit ? 2 : 0;
  } 
  return oldState;
}

// Two test cases
console.log(numberOfPowerfulInt(1, 6000, 4, "124")) // 5
console.log(numberOfPowerfulInt(15, 215, 6, "10")) // 2