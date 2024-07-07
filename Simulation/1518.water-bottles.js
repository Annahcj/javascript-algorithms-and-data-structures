// 1518. Water Bottles
// There are numBottles water bottles that are initially full of water. You can exchange numExchange empty water bottles from the market with one full water bottle.
// The operation of drinking a full water bottle turns it into an empty bottle.
// Given the two integers numBottles and numExchange, return the maximum number of water bottles you can drink.

 
// Solution: Simulation

// Keep track of the number of empty bottles as we drink them.
// The number of bottles will be refilled by exchanging empty bottles, and empty bottles may have a remainder to carry over to the next round.

// Time complexity analysis:
  // Each round, numBottles -> numBottles / numExchange.
  // There will be `log base numExchange` rounds (try dry running if numExchange = 2).

// n = numBottles
// Time Complexity: O(log(n)) 50ms
// Space Complexity: O(1) 48.7MB
function numWaterBottles(numBottles, numExchange) {
  let empty = 0, total = 0;
  while (numBottles > 0) {
    total += numBottles;
    empty += numBottles;
    numBottles = Math.floor(empty / numExchange);
    empty = empty % numExchange;
  }
  return total;
};

// Two test cases
console.log(numWaterBottles(9, 3)) // 13
console.log(numWaterBottles(15, 4)) // 19