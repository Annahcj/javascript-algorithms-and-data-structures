// 1276. Number of Burgers with No Waste of Ingredients
// Given two integers tomatoSlices and cheeseSlices. The ingredients of different burgers are as follows:
  // Jumbo Burger: 4 tomato slices and 1 cheese slice.
  // Small Burger: 2 Tomato slices and 1 cheese slice.
// Return [total_jumbo, total_small] so that the number of remaining tomatoSlices equal to 0 and the number of remaining cheeseSlices equal to 0. If it is not possible to make the remaining tomatoSlices and cheeseSlices equal to 0 return [].


// Solution: Math Logic

// Invalid cases:
  // 1. Not enough tomatos : tomatoSlices < cheeseSlices * 2
  // 2. Too many tomatos: cheeseSlices * 4 < tomatoSlices
  // 3. tomatoSlices not divisible by 2, so can't be divided into 2's and 4's.

// We know that there will be exactly 'cheeseSlices' number of burgers.
// Take as many small burgers as possible -> cheeseSlices * 2 small burgers

// Then, count the left over tomato slices (remainingTomato) after subtracting cheeseSlices * 2.
// the number of jumbo burgers = (tomatoSlices - cheeseSlices * 2) / 2
// the number of small burgers = ((tomatoSlices - remainingTomato) / 2) - jumbo

// Overview:
  // Get (cheeseSlices * 2) small burgers.
  // Get the number of tomato slices left after subtracting (cheeseSlices * 2).
  // That amount left over divided by 2 is the amount of small burgers that can become jumbo burgers (adding on 2 tomato slices to each small burger).

// Time Complexity: O(1) 128ms
// Space Complexity: O(1) 44.5MB
var numOfBurgers = function(tomatoSlices, cheeseSlices) {
  let notEnoughTomato = tomatoSlices < cheeseSlices * 2;
  let tooMuchTomato = cheeseSlices * 4 < tomatoSlices;
  if (notEnoughTomato || tooMuchTomato || tomatoSlices % 2 !== 0) return [];
  
  let remainingTomato = tomatoSlices - cheeseSlices * 2;
  let jumbo = remainingTomato / 2;
  let small = ((tomatoSlices - remainingTomato) / 2) - jumbo;
  return [jumbo, small];
};

// Three test cases 
console.log(numOfBurgers(16, 7)) // [1,6]
console.log(numOfBurgers(17, 4)) // []
console.log(numOfBurgers(4, 17)) // []