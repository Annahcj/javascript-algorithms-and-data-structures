// 2178. Maximum Split of Positive Even Integers
// You are given an integer finalSum. Split it into a sum of a maximum number of unique positive even integers.
// For example, given finalSum = 12, the following splits are valid (unique positive even integers summing up to finalSum): (12), (2 + 10), (2 + 4 + 6), and (4 + 8). Among them, (2 + 4 + 6) contains the maximum number of integers. Note that finalSum cannot be split into (2 + 2 + 4 + 4) as all the numbers should be unique.
// Return a list of integers that represent a valid split containing a maximum number of integers. If no valid split exists for finalSum, return an empty list. You may return the integers in any order.


// Solution: Greedy

// Edge case: If finalSum is odd, it is not splittable into even numbers.
// It is always optimal to take all the smallest even numbers until (the remaining sum - the current even number <= the current even number),
// then take the remaining sum as the last even number.

// e.g: finalSum = 14
// i = 2: remain = 12, res = [2]
// i = 4: remain = 8, res = [2,4]
// i = 6: remain = 2, since remain <= 6, BREAK.
  // If we had taken 6, the remaining sum would become 2 and it would be an invalid split.

// Lastly, take the remaining sum (8) as the last even number. 
// res = [2,4,8]

var maximumEvenSplit = function(finalSum) {
  if (finalSum % 2 === 1) return [];
  let sum = finalSum, res = [];
  for (let i = 2; i <= finalSum; i += 2) {
    let remain = sum - i;
    if (remain <= i) break;
    res.push(i);
    sum -= i;
  }
  res.push(sum);
  return res;
};

// Three test cases
console.log(maximumEvenSplit(12)) // [2,4,6]
console.log(maximumEvenSplit(7)) // []
console.log(maximumEvenSplit(28)) // [2,4,6,16]