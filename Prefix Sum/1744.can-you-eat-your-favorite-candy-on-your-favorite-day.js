// 1744. Can You Eat Your Favorite Candy on Your Favorite Day?
// You are given a (0-indexed) array of positive integers candiesCount where candiesCount[i] represents the number of candies of the ith type you have. You are also given a 2D array queries where queries[i] = [favoriteType[i], favoriteDay[i], dailyCap[i]].
// You play a game with the following rules:
  // You start eating candies on day 0.
  // You cannot eat any candy of type i unless you have eaten all candies of type i - 1.
  // You must eat at least one candy per day until you have eaten all the candies.
// Construct a boolean array answer such that answer.length == queries.length and answer[i] is true if you can eat a candy of type favoriteType[i] on day favoriteDay[i] without eating more than dailyCap[i] candies on any day, and false otherwise. Note that you can eat different types of candy on the same day, provided that you follow rule 2.
// Return the constructed array answer.


// Solution: Prefix Sum 

// We can think about each query separately.
// For the ith query, we can eat favoriteCandy on favoriteDay if these two conditions are true:
  // 1. We can eat all candies smaller than favoriteCandy before the end of favDay: The sum of candies smaller than or equal to favoriteCandy <= favouriteDay * dailyCap + (dailyCap - 1)
  // 2. We can eat at least one candy per day: The sum of candies smaller than or equal to favoriteCandy >= favouriteDay + 1

// Use prefix sum to store the sum of candies < i.
  // pSum[i] = sum of [candiesCount[0], ..., candiesCount[i - 1]]

// n = candiesCount.length, m = number of queries
// Time Complexity: O(n + m) 244ms
// Space Complexity: O(n + m) 87.6MB
var canEat = function(candiesCount, queries) {
  let n = candiesCount.length, pSum = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    pSum[i + 1] = pSum[i] + candiesCount[i];
  }
  
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [favType, favDay, dailyCap] = queries[i];
    let canEatAllSmaller = pSum[favType] <= favDay * dailyCap + (dailyCap - 1);
    let canEatAtLeastOnePerDay = pSum[favType + 1] >= favDay + 1;
    ans[i] = canEatAllSmaller && canEatAtLeastOnePerDay;
  }
  return ans;
};

// Two test cases
console.log(canEat([7,4,5,3,8], [[0,2,2],[4,2,4],[2,13,1000000000]])) // [true,false,true]
console.log(canEat([5,2,6,4,1], [[3,1,2],[4,10,3],[3,10,100],[4,100,30],[1,3,1]])) // [false,true,true,false,false]