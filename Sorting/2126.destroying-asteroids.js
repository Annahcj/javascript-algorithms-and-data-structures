// 2126. Destroying Asteroids
// You are given an integer mass, which represents the original mass of a planet. You are further given an integer array asteroids, where asteroids[i] is the mass of the ith asteroid.
// You can arrange for the planet to collide with the asteroids in any arbitrary order. If the mass of the planet is greater than or equal to the mass of the asteroid, the asteroid is destroyed and the planet gains the mass of the asteroid. Otherwise, the planet is destroyed.
// Return true if all asteroids can be destroyed. Otherwise, return false.


// Solution: Greedy & Sorting

// Time Complexity: O(n log(n)) 302ms
// Space Complexity: O(log(n)) (sorting algo) 55.2MB
var asteroidsDestroyed = function(mass, asteroids) {
  asteroids.sort((a, b) => a - b);
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i] > mass) return false;
    mass += asteroids[i];
  }
  return true;
}

// Four test cases
console.log(asteroidsDestroyed(10, [3,9,19,5,21])) // true
console.log(asteroidsDestroyed(5, [4,9,23,4])) // false
console.log(asteroidsDestroyed(10, [1,2,2,2,17])) // true
console.log(asteroidsDestroyed(10, [1,2,2,2,18])) // false