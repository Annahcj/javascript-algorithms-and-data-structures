// 1996. The Number of Weak Characters in the Game
// You are playing a game that contains multiple characters, and each of the characters has two main properties: attack and defense. You are given a 2D integer array properties where properties[i] = [attacki, defensei] represents the properties of the ith character in the game.
// A character is said to be weak if any other character has both attack and defense levels strictly greater than this character's attack and defense levels. More formally, a character i is said to be weak if there exists another character j where attackj > attacki and defensej > defensei.
// Return the number of weak characters.


// Solution: Sort by One Property, Right-Left Scan

// Firstly, sort properties by one property (it doesn't matter whether we sort by attack or defense)
// For simplicity, we'll sort them by the first property (attack)
// However, a character is only weak is both properties are strictly less, so 
// if the attack is the same, put them in decreasing order according to their defense.
// For e.g: for [1,4], [1,5], since the attack is the same, they should be put in this order -> [1,5], [1,4]

// Keep track of a maximum defense value (since anything to the right is guaranteed to have a bigger attack)
// Keep track of a count of weak characters.
// Next, loop through properties from right to left (pointer = i)
  // if properties[i]'s defense is smaller than max defense, increment count by one.
  // update max defense if properties[i]'s defense is bigger than max defense

// return count.

// Time Complexity: O(n log(n)) 392ms
// Space Complexity: O(1) 73.4MB 
var numberOfWeakCharacters = function(properties) {
  let n = properties.length;
  properties = properties.sort((a, b) => {
    if (a[0] == b[0]) return b[1] - a[1];
    else return a[0] - b[0];
  });
  let count = 0, maxDefense = -Infinity;
  for (let i = n - 1; i >= 0; i--) {
    if (properties[i][1] < maxDefense) count++;
    maxDefense = Math.max(maxDefense, properties[i][1]);
  }
  return count;
};

// Three test cases
console.log(numberOfWeakCharacters([[5,5],[6,3],[3,6]])) // 0
console.log(numberOfWeakCharacters([[2,2],[3,3]])) // 1
console.log(numberOfWeakCharacters([[1,5],[10,4],[4,3]])) // 1