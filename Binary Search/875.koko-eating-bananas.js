// 875. Koko Eating Bananas
// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.
// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.
// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
// Return the minimum integer k such that she can eat all the bananas within h hours.


// Solution: Binary Search

// Binary search for the lowest eating speed.
// Set left pointer to 1, and right pointer to the maximum of piles.
// For each k, loop through piles to get the number of hours/time to finish all bananas with the speed of k.
// If the time is less than or equal to h,
  // (that means k was big enough, but mid could be the answer)
  // so set right to mid
// Otherwise if time is bigger than h,
  // (that means k was too small)
  // so set left to mid + 1
// Return left

// n = length of piles, m = max of piles
// Time Complexity: O(n * log(m)) 92ms
// Space Complexity: O(1) 42.7MB
var minEatingSpeed = function(piles, h) {
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let time = finishTime(mid);
    if (time <= h) right = mid;
    else if (time > h) left = mid + 1;
  }
  return left;

  function finishTime(speed) {
    let time = 0;
    for (var pile of piles) {
      time += Math.ceil(pile / speed);
    }
    return time;
  } 
};

// Three test cases to run function on
console.log(minEatingSpeed([3,6,7,11], 8)) // 4
console.log(minEatingSpeed([30,11,23,4,20], 5)) // 30
console.log(minEatingSpeed([30,11,23,4,20], 6)) // 23