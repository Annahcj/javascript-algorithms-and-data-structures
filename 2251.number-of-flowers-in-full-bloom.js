// 2251. Number of Flowers in Full Bloom
// You are given a 0-indexed 2D integer array flowers, where flowers[i] = [starti, endi] means the ith flower will be in full bloom from starti to endi (inclusive). You are also given a 0-indexed integer array persons of size n, where persons[i] is the time that the ith person will arrive to see the flowers.
// Return an integer array answer of size n, where answer[i] is the number of flowers that are in full bloom when the ith person arrives.


// Solution: Prefix Sum & Binary Search

// 1. Get each start position from flowers and count the number of flowers at each position.
// indexes = ordered hashmap
  // indexes[start] += 1
  // indexes[end + 1] -= 1
// 2. Prefix sum on indexes to populate the number of flowers at each position (each unique start and end + 1 positions that exists in flowers).
// 3. Lastly, binary search on the sums for each person.
  // Find the highest index in sums where sums[i][0] <= persons[j]

// n = flowers.length, m = persons.length
// Time Complexity: O(m log(n)) 482ms
// Space Complexity: O(n) 105.5MB
var fullBloomFlowers = function(flowers, persons) {  
  let indexes = {};
  for (let [start, end] of flowers) {
    if (!indexes[start]) indexes[start] = 0;
    if (!indexes[end + 1]) indexes[end + 1] = 0;
    indexes[start]++;
    indexes[end + 1]--;
  }
  
  // prefix sum
  let sums = [], sum = 0;
  for (let position in indexes) {
    sum += indexes[position];
    sums.push([+position, sum]);
  }
  
  let res = [];
  for (let location of persons) {
    res.push(getCount(location));
  }
  return res;

  function getCount(location) {
    let low = 0, high = sums.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (sums[mid][0] <= location) low = mid;
      else high = mid - 1;
    }
    return sums[low][0] <= location ? sums[low][1] : 0;
  }
};

// Two test cases to run function on
console.log(fullBloomFlowers([[1,6],[3,7],[9,12],[4,13]], [2,3,7,11])) // [1,2,2,2]
console.log(fullBloomFlowers([[19,37],[19,38],[19,35]], [6,7,21,1,13,37,5,37,46,43])) // [0,0,3,0,0,2,0,2,0,0]