// 2391. Minimum Amount of Time to Collect Garbage
// You are given a 0-indexed array of strings garbage where garbage[i] represents the assortment of garbage at the ith house. garbage[i] consists only of the characters 'M', 'P' and 'G' representing one unit of metal, paper and glass garbage respectively. Picking up one unit of any type of garbage takes 1 minute.
// You are also given a 0-indexed integer array travel where travel[i] is the number of minutes needed to go from house i to house i + 1.
// There are three garbage trucks in the city, each responsible for picking up one type of garbage. Each garbage truck starts at house 0 and must visit each house in order; however, they do not need to visit every house.
// Only one garbage truck may be used at any given moment. While one truck is driving or picking up garbage, the other two trucks cannot do anything.
// Return the minimum number of minutes needed to pick up all the garbage.


// Solution: Counting & Prefix Sum

// For each garbage type,
  // 1. Count the number of occurances.
  // 2. Record the last house for this garbage type.
// Prefix sum to get the travel cost from house 0 to each house i.
// The total time for each garbage type = time to move to last house + number of occurances

// n = length of garbage, m = length of garbage[i]
// Time Complexity: O(nm) 280ms
// Space Complexity: O(1) 57.8MB
var garbageCollection = function(garbage, travel) {
  let range = Array(3).fill(0), count = Array(3).fill(0);
  let key = {G: 0, P: 1, M: 2}, n = garbage.length;
  for (let i = 0; i < n; i++) {
    for (let type of garbage[i]) {
      let index = key[type];
      range[index] = i;
      count[index]++;
    }
  }  
  
  for (let i = 1; i < travel.length; i++) {
    travel[i] += travel[i - 1];
  }
  
  let ans = 0;
  for (let i = 0; i < 3; i++) {
    let timeToMove = range[i] === 0 ? 0 : travel[range[i] - 1];
    ans += timeToMove + count[i];
  }
  return ans;
};

// Two test cases to run function on
console.log(garbageCollection(["G","P","GP","GG"], [2,4,3])) // 21
console.log(garbageCollection(["MMM","PGM","GP"], [3,10])) // 37