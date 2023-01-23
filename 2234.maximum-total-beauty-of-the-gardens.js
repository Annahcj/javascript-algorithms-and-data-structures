// 2234. Maximum Total Beauty of the Gardens
// Alice is a caretaker of n gardens and she wants to plant flowers to maximize the total beauty of all her gardens.
// You are given a 0-indexed integer array flowers of size n, where flowers[i] is the number of flowers already planted in the ith garden. Flowers that are already planted cannot be removed. You are then given another integer newFlowers, which is the maximum number of flowers that Alice can additionally plant. You are also given the integers target, full, and partial.
// A garden is considered complete if it has at least target flowers. The total beauty of the gardens is then determined as the sum of the following:
  // The number of complete gardens multiplied by full.
  // The minimum number of flowers in any of the incomplete gardens multiplied by partial. If there are no incomplete gardens, then this value will be 0.
// Return the maximum total beauty that Alice can obtain after planting at most newFlowers flowers.


// Solution: Binary Search, Sorting, Prefix Sum

// Try each combination of the number of complete gardens.
  // Try to take i complete gardens and n - i incomplete gardens greedily.
  // Sort flowers in desc order.
  // Fill up i gardens by filling the gardens that are closest to being complete.
  // Then with the remaining flowers, assign flowers to the incomplete gardens with the least number of flowers to increase the minimum number of flowers in an incomplete garden.
    // Use binary search to find the maximum minimum flowers in an incomplete garden given we have "flowers" number of flowers left to assign.
      // Binary search again for the leftmost index where flowers[index] <= the amount of flowers we are binary searching for.
    // Use prefix sum to keep track of the sum of flowers from right to left. sumRight[i] = the sum of flowers from garden i to n - 1.

// Time Complexity: O(n log(n)) 1446ms
// Space Complexity: O(n) 63.4MB
var maximumBeauty = function(flowers, newFlowers, target, full, partial) {
  let n = flowers.length, flowersLeft = newFlowers;
  flowers.sort((a, b) => b - a);
  let sumRight = [...flowers], maxBeauty = 0;
  for (let i = n - 2; i >= 0; i--) { // prefix sum of flowers from right to left
    sumRight[i] += sumRight[i + 1];
  }
  for (let i = 0; i <= n; i++) { // take i complete gardens and n - i incomplete gardens
    if (i > 0 && flowers[i - 1] < target) { 
      let flowersNeeded = target - flowers[i - 1];
      if (flowersNeeded > flowersLeft) break;
      flowersLeft -= flowersNeeded;
    } 
    let minimumIncompleteFlowers = i === n ? 0 : getMinimumIncompleteFlowers(flowersLeft, i);
    if (i < n && flowers[i] >= target) continue; // this case will be covered when we take more complete gardens
    maxBeauty = Math.max(maxBeauty, i * full + minimumIncompleteFlowers * partial);
  }
  return maxBeauty;
  
  function getMinimumIncompleteFlowers(flowersLeft, startIndex) { // binary search for the maximum minimum amount of flowers flowersCount where we make all flowers from startIndex onwards have at least flowersCount number of flowers
    let low = flowers[n - 1], high = target - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      let flowerIndex = lower_bound(mid, startIndex);
      if (hasEnoughFlowers(mid, flowersLeft, flowerIndex)) low = mid;
      else high = mid - 1;
    }
    return low;
  }
  
  function hasEnoughFlowers(numFlowers, flowersLeft, flowerIndex) {
    let gardens = n - flowerIndex;
    let flowersNeeded = numFlowers * gardens - sumRight[flowerIndex];
    return flowersNeeded <= flowersLeft;
  }

  function lower_bound(minFlowers, startIndex) { // binary search for the leftmost index where flowers[index] < minFlowers
    let low = startIndex, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (flowers[mid] < minFlowers) high = mid;
      else low = mid + 1;
    }
    return low;
  }
};

// Two test cases
console.log(maximumBeauty([1,3,1,1], 7, 6, 12, 1)) // 14
console.log(maximumBeauty([2,4,5,3], 10, 5, 2, 6)) // 30