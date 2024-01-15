// 1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number
// You are given a string num, representing a large integer, and an integer k.
// We call some integer wonderful if it is a permutation of the digits in num and is greater in value than num. There can be many wonderful integers. However, we only care about the smallest-valued ones.
  // For example, when num = "5489355142":
    // The 1st smallest wonderful integer is "5489355214".
    // The 2nd smallest wonderful integer is "5489355241".
    // The 3rd smallest wonderful integer is "5489355412".
    // The 4th smallest wonderful integer is "5489355421".
// Return the minimum number of adjacent digit swaps that needs to be applied to num to reach the kth smallest wonderful integer.
// The tests are generated in such a way that kth smallest wonderful integer exists.


// Solution: Greedy

// 1. Find the kth smallest integer larger than num.
// 2. Calculate the number of swaps needed to turn num into the kth smallest.
  // Compare each num[i] and kthSmallest[i].
  // If num[i] and kthSmallest[i] are not equal, 
    // find the leftmost occurance (index j) of kthSmallest[i] in num, which occurs to the right of index i.
    // shift all the digits between index i and j right one index (simulating j-i adjacent swaps).

// n = length of num
// Time Complexity: O(nk + n^2) 120ms
// Space Complexity: O(n) 49.3MB
var getMinSwaps = function(num, k) {
  num = num.split("");
  let kthSmallest = num;
  for (let i = 0; i < k; i++) {
    kthSmallest = nextPermutation(kthSmallest);
  }
  let swaps = 0;
  for (let i = 0; i < num.length; i++) {
    if (num[i] !== kthSmallest[i]) {
      let j = i + 1;
      while (num[j] !== kthSmallest[i]) j++;
      swaps += j - i;
      for (let k = j; k > i; k--) num[k] = num[k - 1];
    }
  }
  return swaps;
};

function nextPermutation(num) {
  let kthSmallest = [...num];
  for (let i = kthSmallest.length - 2; i >= 0; i--) {
    if (kthSmallest[i] < kthSmallest[i + 1]) {
      let j = rightmostLargerIndex(kthSmallest, i);
      [kthSmallest[i], kthSmallest[j]] = [kthSmallest[j], kthSmallest[i]];
      reverse(kthSmallest, i + 1, kthSmallest.length - 1);
      return kthSmallest;
    }
  }
}

// Find the rightmost num[index] where num[index] > num[i]
function rightmostLargerIndex(num, i) {
  let low = i + 1, high = num.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (num[mid] > num[i]) low = mid;
    else high = mid - 1;
  }
  return low;
}

function reverse(num, start, end) {
  while (start < end) {
    [num[start], num[end]] = [num[end], num[start]];
    start++, end--;
  }
}

// Two test cases
console.log(getMinSwaps("5489355142", 4)) // 2
console.log(getMinSwaps("11112", 4)) // 4