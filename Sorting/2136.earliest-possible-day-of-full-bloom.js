// 2136. Earliest Possible Day of Full Bloom
// You have n flower seeds. Every seed must be planted first before it can begin to grow, then bloom. Planting a seed takes time and so does the growth of a seed. You are given two 0-indexed integer arrays plantTime and growTime, of length n each:
  // plantTime[i] is the number of full days it takes you to plant the ith seed. Every day, you can work on planting exactly one seed. You do not have to work on planting the same seed on consecutive days, but the planting of a seed is not complete until you have worked plantTime[i] days on planting it in total.
  // growTime[i] is the number of full days it takes the ith seed to grow after being completely planted. After the last day of its growth, the flower blooms and stays bloomed forever.
// From the beginning of day 0, you can plant the seeds in any order.
// Return the earliest possible day where all seeds are blooming.


// Solution: Greedy w/ Sorting

// It is optimal to plant the tree with the longest growing time FIRST.
// If the growing time is the same, we should choose the one with the bigger planting time (to give more time for other plants to grow).

// 1. Pair each plantTime[i], growTime[i] together in an array.
// 2. Sort them by grow time in desc order, then by plant time in desc order.
// 3. Calculate the maximum full bloom time by keeping track of the current time.

// Time Complexity: O(n log(n)) 425ms
// Space Complexity: O(n)
var earliestFullBloom = function(plantTime, growTime) {
  let n = plantTime.length;
  let plants = [];
  for (let i = 0; i < n; i++) {
    plants.push([plantTime[i], growTime[i]]);
  }
  plants.sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return b[1] - a[1];
  });

  let time = 0, fullBloomTime = 0;
  for (let i = 0; i < n; i++) {
    time += plants[i][0];
    fullBloomTime = Math.max(fullBloomTime, time + plants[i][1]);
  }
  return fullBloomTime;
};

// Three test cases
console.log(earliestFullBloom([1], [1])) // 2
console.log(earliestFullBloom([1,4,3], [2,3,1])) // 9
console.log(earliestFullBloom([1,2,3,2], [2,1,2,1])) // 9