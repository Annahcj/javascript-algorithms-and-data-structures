// 1338. Reduce Array Size to The Half
// You are given an integer array arr. You can choose a set of integers and remove all the occurrences of these integers in the array.
// Return the minimum size of the set so that at least half of the integers of the array are removed.


// Solution 1: Hash Map & Sorting

// 1. Count the frequency of each number and store them in a hashmap.
// 2. Take out each [number, frequency] into an array.
// 3. Sort the array by frequency in desc order.
// 4. Remove each number from highest frequency to lowest and stop when the total size becomes less than or equal to half the original size.

// Time Complexity: O(n log(n)) 276ms
// Space Complexity: O(n) 93.1MB
var minSetSize = function(arr) {
  let freq = new Map(), n = arr.length;
  for (let num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  let unique = [];
  for (let [num] of freq) {
    unique.push([num, freq.get(num)]);
  }
  unique.sort((a, b) => b[1] - a[1]);
  
  let size = n, removed = 0;
  for (let [_num, frequency] of unique) {
    size -= frequency;
    removed++;
    if (size <= n / 2) return removed;
  }
};

// Solution 2: Counting Sort for Frequencies

// 1. Count the frequency of each number and store them in a hashmap, and get the max frequency.
// 2. Use counting sort (with an array of length maxFreq + 1) to keep the count of frequencies.
// 3. Starting from the max frequency, loop down until the total size is less than or equal to half the original size.

// Time Complexity: O(n) 171ms
// Space Complexity: O(n) 73.6MB
var minSetSize = function(arr) {
  let freq = new Map(), n = arr.length, maxFreq = 0;
  for (let num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
    maxFreq = Math.max(maxFreq, freq.get(num));
  }
  let freqCount = Array(maxFreq + 1).fill(0);
  for (let [num] of freq) {
    freqCount[freq.get(num)]++;
  }
  
  let i = maxFreq, size = n, removed = 0;
  while (i > 0 && size > n / 2) {
    if (freqCount[i] === 0) i--;
    else {
      freqCount[i]--;
      size -= i;
      removed++;
    }
  }
  return removed;
};

// Two test cases
console.log(minSetSize([3,3,3,3,5,5,5,2,2,7])) // 2
console.log(minSetSize([7,7,7,7,7,7])) // 1