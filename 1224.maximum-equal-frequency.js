// 1224. Maximum Equal Frequency
// Given an array nums of positive integers, return the longest possible length of an array prefix of nums, such that it is possible to remove exactly one element from this prefix so that every number that has appeared in it will have the same number of occurrences.
// If after removing one element there are no remaining elements, it's still considered that every appeared number has the same number of ocurrences (0).


// Solution: Keep Frequencies of Frequencies

// There are two main cases to consider:
  // 1. There is one lone number (number with frequency of 1) and all the rest have the same frequency.
  // 2. All numbers have the same frequency except one number which has that frequency + 1.

// To check for these cases, we have to keep track of the following info:
  // count: the frequency of each nums[i]
  // countFreq: the frequency of each frequency of nums[i]
  // minFreq: the minimum frequency so far
  // maxFreq: the maximum frequency so far
  // n: the number of unique numbers so far

// With this information, we can check for four cases which branch off from the two main ideas:
  // 1. There is one lone number and all the rest have the same frequency
  // 2. There is one extra number (a number with a frequency 1 higher than the rest)
  // 3. Due to the way the first case is checked, we need to consider the case where all numbers have a frequency of 1, so removing any will result in a valid result.
  // 4. There has only been 1 unique number so far, so removing any will still result in a valid result.

// Time Complexity: O(n) 146ms
// Space Complexity: O(n) 52MB
var maxEqualFreq = function(nums) {
  let count = new Map(), countFreq = new Map(), ans = 0;
  let minFreq = Infinity, maxFreq = 0, n = 0;
  for (let i = 0; i < nums.length; i++) {
    let prevCount = count.get(nums[i]) || 0;
    if (!count.has(nums[i])) {
      count.set(nums[i], 1);
      countFreq.set(1, (countFreq.get(1) || 0) + 1);
      n++;
    } else {
      countFreq.set(prevCount, countFreq.get(prevCount) - 1);
      if (minFreq === prevCount && countFreq.get(prevCount) === 0) minFreq++;
      
      countFreq.set(prevCount + 1, (countFreq.get(prevCount + 1) || 0) + 1);
    }
    count.set(nums[i], prevCount + 1);
    
    minFreq = Math.min(minFreq, count.get(nums[i]));
    maxFreq = Math.max(maxFreq, count.get(nums[i]));
    
    const hasOneLone = minFreq === 1 && countFreq.get(1) === 1 && countFreq.get(maxFreq) === n - 1;
    const hasOneExtra = maxFreq === minFreq + 1 && countFreq.get(maxFreq) === 1 && countFreq.get(minFreq) === n - 1;
    const hasAllOneFreq = minFreq === 1 && maxFreq === 1 && countFreq.get(1) === n;
    if (hasOneLone || hasOneExtra || hasAllOneFreq || n === 1) {
      ans = i + 1;
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(maxEqualFreq([2,2,1,1,5,3,3,5])) // 7
console.log(maxEqualFreq([1,1,1,2,2,2,3,3,3,4,4,4,5])) // 13
console.log(maxEqualFreq([3,3,3,3])) // 4