// 3100. Water Bottles II
// You are given two integers numBottles and numExchange.
// numBottles represents the number of full water bottles that you initially have. In one operation, you can perform one of the following operations:
  // Drink any number of full water bottles turning them into empty bottles.
  // Exchange numExchange empty bottles with one full water bottle. Then, increase numExchange by one.
// Note that you cannot exchange multiple batches of empty bottles for the same value of numExchange. For example, if numBottles == 3 and numExchange == 1, you cannot exchange 3 empty water bottles for 3 full bottles.
// Return the maximum number of water bottles you can drink.

 
// Solution: Counting

// We don't need the concept of full or empty bottles.
// Only step 2 is needed: Subtracting numExchange bottles and incrementing the bottles count by 1.

// Every operation, we will of course drink whatever bottles we have.
// Initially we have `numBottles` bottles, and we gain 1 more bottle each time we exchange bottles.

// Time Complexity: O(numBottles / numExchange) 52ms
// Space Complexity: O(1) 50.8MB
var maxBottlesDrunk = function(numBottles, numExchange) {
  let full = numBottles;
  while (numBottles >= numExchange) {
    numBottles -= numExchange;
    full++;
    numBottles++;
    numExchange++;
  }
  return full;
};

// Two test cases
console.log(maxBottlesDrunk(13, 6)) // 15
console.log(maxBottlesDrunk(10, 3)) // 13