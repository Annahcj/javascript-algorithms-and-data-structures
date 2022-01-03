// 1029. Two City Scheduling
// A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.
// Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.


// Solution: Greedy

// The logic is to sort costs by biggest difference between each aCost and bCost.
// If we minimize the losses, we are bound to have the optimal solution.

// After we sort by difference, take as many optimal choices as possible, keeping count of how many flights go to city a and city b:
// When we have n flights to city a, we have no choice but to keep on taking city b.
// When we have n flights to city b, we have no choice but to keep on taking city a.
// Otherwise, we can take the optimal choice: take the lower cost out of the two.

// Time Complexity: O(n log(n)) 85ms
// Space Complexity: O(log(n)) (sorting algo) 40MB
var twoCitySchedCost = function(costs) {
  let n = costs.length / 2;
  
  costs.sort((a, b) => Math.abs(b[0] - b[1]) - Math.abs(a[0] - a[1])); // sort by difference
  
  let ans = 0;
  let a = n, b = n;
  for (var [aCost, bCost] of costs) {
    if (a === 0) { // we must take city b
      ans += bCost;
      b--;
    } else if (b === 0) { // we must take city a
      ans += aCost;
      a--;
    } else { // we can still take the optimal choice
      if (aCost < bCost) {
        ans += aCost;
        a--;
      } else {
        ans += bCost;
        b--;
      }
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(twoCitySchedCost([[10,20],[30,200],[400,50],[30,20]])) // 110
console.log(twoCitySchedCost([[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]])) // 1859
console.log(twoCitySchedCost([[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]])) // 3086