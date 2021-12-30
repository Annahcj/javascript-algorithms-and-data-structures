// 1481. Least Number of Unique Integers after K Removals
// Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.


// Solution: Hashmap & Sorting

// 1. Count the frequencies of each number
// 2. Take out the frequencies into an array
// 3. Sort the frequencies in asc order
// 4. Greedily take as many numbers as possible

// Time Complexity: O(n log(n)) 320ms
// Space Complexity: O(n) 77.5MB
var findLeastNumOfUniqueInts = function(arr, k) {
  let freq = {}, unique = 0;
  for (var num of arr) {
    if (!freq[num]) {
      freq[num] = 0;
      unique++;
    }
    freq[num]++;
  }
  let freqArr = Object.values(freq);
  freqArr.sort((a, b) => a - b);
  for (var i = 0; i < freqArr.length; i++) {
    if (freqArr[i] > k) return unique;
    k -= freqArr[i];
    unique--;
  }
  return unique;
};

// Solution 2: Hashmap & Bucket Sort

// 1. Count the frequencies of each number
// 2. Populate bucket sort array -> count the frequencies of frequencies.
// 3. Greedily take as many numbers as possible

// Time Complexity: O(n) 205ms
// Space Complexity: O(n) 72.6MB
var findLeastNumOfUniqueInts = function(arr, k) {
  let freqMap = new Map(), unique = 0, n = arr.length;
  for (var num of arr) {
    if (!freqMap.has(num)) {
      freqMap.set(num, 0);
      unique++;
    }
    freqMap.set(num, freqMap.get(num) + 1);
  }
  let count = Array(n + 1).fill(0);
  for (var [num, freq] of freqMap) {
    count[freq]++;
  }
  for (freq = 1; freq <= n; freq++) {
    if (k >= freq * count[freq]) {
      k -= freq * count[freq];
      unique -= count[freq];
    } else {
      unique -= Math.floor(k / freq);
      return unique;
    }
  }
  return unique;
};

// Two test cases to run function on
console.log(findLeastNumOfUniqueInts([5,5,4], 1)) // 1
console.log(findLeastNumOfUniqueInts([4,3,1,1,3,3,2], 3)) // 2