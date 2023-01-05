// 781. Rabbits in Forest
// There is a forest with an unknown number of rabbits. We asked n rabbits "How many rabbits have the same color as you?" and collected the answers in an integer array answers where answers[i] is the answer of the ith rabbit.
// Given the array answers, return the minimum number of rabbits that could be in the forest.


// Solution: Math Logic

// Rabbits can only have the same color if they have the same answer.
// Use a hashmap to get the count of occurances of each answer and deal with each group with the same answers. 

// For each group,
  // answer = the rabbit's answer, amount = the number of rabbits that answered `answer`.
  // The number of groups of rabbits with the same color = Math.ceil(amount / (answer + 1)).
  // The total number of rabbits for this answer = number of groups * (answer + 1).
 
// Time Complexity: O(n) 99ms
// Space Complexity: O(n) 44.3MB
var numRabbits = function(answers) {
  let count = {};
  for (let answer of answers) {
    count[answer] = (count[answer] || 0) + 1;
  }
  
  let res = 0;
  for (let answer in count) {
    let amount = count[answer], groupSize = Number(answer) + 1;
    let groups = Math.ceil(amount / groupSize); // number of groups of rabbits with the same color
    res += groups * groupSize;
  }
  return res;
};

// Two test cases
console.log(numRabbits([1,1,2])) // 5
console.log(numRabbits([10,10,10])) // 11