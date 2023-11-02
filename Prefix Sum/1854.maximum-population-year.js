// 1854. Maximum Population Year
// You are given a 2D integer array logs where each logs[i] = [birthi, deathi] indicates the birth and death years of the ith person.
// The population of some year x is the number of people alive during that year. The ith person is counted in year x's population if x is in the inclusive range [birthi, deathi - 1]. Note that the person is not counted in the year that they die.
// Return the earliest year with the maximum population.


// Solution 1: Brute Force

// Keep track of the 100 years: 1950 - 2050 in an array of length 100, offset by 1950.
// For each person, increase the population for each year from birth to death - 1.
// After populating the population array, find the max population, then return the first year with the max population.

// Time Complexity: O(n * 100) 89ms
// Space Complexity: O(n) 42.8MB
var maximumPopulation = function(logs) {
  let population = Array(100).fill(0);
  for (let [birth, death] of logs) {
    for (let yr = birth; yr < death; yr++) {
      population[yr - 1950]++;
    }
  }
  let max = 0;
  for (let i = 0; i < 100; i++) {
    max = Math.max(max, population[i]);
  }
  for (let i = 0; i < 100; i++) {
    if (population[i] === max) return i + 1950;
  }
};

// Solution 2: Prefix Sum

// Starting year: +1
// Ending year: -1

// result will be e.g: [0,0,1,1,-1,0,0]
// Then the yearly population will be:
// [0,0,1,2,1,1,1], the accumulative values from left to right.

// Time Complexity: O(n) 64ms
// Space Complexity: O(2050) 44.2MB
var maximumPopulation = function(logs) {
  let population = Array(2051).fill(0);
  for (let [birth, death] of logs) {
    population[birth]++; 
    population[death]--;
  }
  
  let res = 1950;
  for (let i = 1950; i <= 2050; i++) {
    population[i] += population[i - 1];
    if (population[i] > population[res]) res = i;
  }
  return res;
};

// Two test cases
console.log(maximumPopulation([[1993,1999],[2000,2010]])) // 1993
console.log(maximumPopulation([[1950,1961],[1960,1971],[1970,1981]])) // 1960