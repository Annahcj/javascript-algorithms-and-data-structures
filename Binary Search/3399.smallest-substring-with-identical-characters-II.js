// 3399. Smallest Substring With Identical Characters II
// You are given a binary string s of length n and an integer numOps.
// You are allowed to perform the following operation on s at most numOps times:
  // Select any index i (where 0 <= i < n) and flip s[i]. If s[i] == '1', change s[i] to '0' and vice versa.
// You need to minimize the length of the longest substring of s such that all the characters in the substring are identical.
// Return the minimum length after the operations.

 
// Solution: Binary Search

// Binary search for the minimum maximum substring length.
// For a length x, greedily flip characters when there are more than x consecutive identical characters.

// If we get x+1 identical characters, we can flip the x+1th character.
// Now this can be a problem if the x+2th character is the opposite character.
// In this scenario, we can just flip the xth character instead of the x+1th.
// The only case this doesn't apply is when x is 1, hence we need to deal with this case separately. 

// If x is 1, s has to become either 10101 or 01010. 
// Count the number of moves to convert s into either one of these and return the minimum moves out of the two.

// Time Complexity: O(n log(n)) 177ms
// Space Complexity: O(1) 56.2MB
function minLength(s, numOps) {
  let low = 1, high = s.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (minMoves(s, mid) <= numOps) high = mid;
    else low = mid + 1;
  }
  return low;
};

function minMoves(s, x) {
  if (x === 1) return minMovesToAlternate(s);
  let identical = 1, moves = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) identical++;
    else identical = 1;
    if (identical > x) {
      moves++;
      identical = 1;
      i++;
    }
  }
  return moves;
}
  
function minMovesToAlternate(s) {
  let oneFirst = 0, zeroFirst = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == (i % 2)) oneFirst++;
    else zeroFirst++;
  }
  return Math.min(oneFirst, zeroFirst);
}

// Three test cases
console.log(minLength("000001", 1)) // 2
console.log(minLength("0000", 2)) // 1
console.log(minLength("0101", 0)) // 1