// 1402. Reducing Dishes
// A chef has collected data on the satisfaction level of his n dishes. Chef can cook any dish in 1 unit of time.
// Like-time coefficient of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level i.e. time[i] * satisfaction[i].
// Return the maximum sum of like-time coefficient that the chef can obtain after dishes preparation.
// Dishes can be prepared in any order and the chef can discard some dishes to get this maximum value.


// Solution: Greedy

// Smaller negatives (further from 0) should be as early as possible.
// Larger positives should be as late as possible.

// Sort nums in desc order.

// Since it is optimal to take the largest satisfaction[i] for the latest times, try to add each satisfaction[i] in desc order.
// When we add satisfaction[i], shift each satisfaction[i] that we have seen one position to the right.
  // To right shift, every satisfaction so far should have one more instance (sum of satisfaction[i] so far).
  // At some point, it may become worse for us to take satisfaction[i]. This is when sum < 0, where we stop.

// Time Complexity: O(n log(n)) 61ms
// Space Complexity: O(log(n)) (space for sorting) 41.5MB
var maxSatisfaction = function(satisfaction) {
  satisfaction.sort((a, b) => b - a);
  let n = satisfaction.length, sum = 0;
  let score = 0;
  for (let i = 0; i < n; i++) {
    sum += satisfaction[i];
    if (sum < 0) break;
    score += sum;
  }
  return score;
};

// Three test cases to run function on
console.log(maxSatisfaction([-1,-8,0,5,-7])) // 14
console.log(maxSatisfaction([4,3,2])) // 20
console.log(maxSatisfaction([-1,-4,-5])) // 0