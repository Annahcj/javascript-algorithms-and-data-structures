// 2698. Find the Punishment Number of an Integer
// Given a positive integer n, return the punishment number of n.
// The punishment number of n is defined as the sum of the squares of all integers i such that:
  // 1 <= i <= n
  // The decimal representation of i * i can be partitioned into contiguous substrings such that the sum of the integer values of these substrings equals i.


// Solution: Recursion 

// For each square, use recursion to check if the number can be partitioned to have a sum equal to the original number.

// Time Complexity: O(n log(n)) 197ms
// Space Complexity: O(log(n)) 48.9MB
var punishmentNumber = function(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (canPartition((i * i).toString(), 0, i)) ans += i * i;
  }  
  return ans;
};

function canPartition(num, i, target) {
  if (i === num.length) return target === 0;
  if (target < 0) return false;
  
  for (let j = i; j < num.length; j++) {
    let currNum = Number(num.slice(i, j + 1));
    if (canPartition(num, j + 1, target - currNum)) return true;
  }
  return false;
}

// Two test cases
console.log(punishmentNumber(10)) // 182
console.log(punishmentNumber(37)) // 1478