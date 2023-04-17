// 1431. Kids With the Greatest Number of Candies
// There are n kids with candies. You are given an integer array candies, where each candies[i] represents the number of candies the ith kid has, and an integer extraCandies, denoting the number of extra candies that you have.
// Return a boolean array result of length n, where result[i] is true if, after giving the ith kid all the extraCandies, they will have the greatest number of candies among all the kids, or false otherwise.
// Note that multiple kids can have the greatest number of candies.


// Solution: 

// Find the maximum candies[i].
// For each candies[i], if candies[i] + extraCandies >= max candies, then the result is true.

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 42.9MB
var kidsWithCandies = function(candies, extraCandies) {
  let n = candies.length, res = Array(n);
  let maxCandies = Math.max(...candies);
  for (let i = 0; i < n; i++) {
    res[i] = candies[i] + extraCandies >= maxCandies;
  }
  return res;
};

// Three test cases
console.log(kidsWithCandies([2,3,5,1,3], 3)) // [true,true,true,false,true] 
console.log(kidsWithCandies([4,2,1,1,2], 1)) // [true,false,false,false,false] 
console.log(kidsWithCandies([12,1,12], 10)) // [true,false,true]