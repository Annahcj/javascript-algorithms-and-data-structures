// 904. Fruit Into Baskets
// You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.
// You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
// You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
// Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
// Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
// Given the integer array fruits, return the maximum number of fruits you can pick.


// Solution 1: 

// Use a hashmap to keep the last occurance indexes
// set two variables fruit1 and fruit2
// set max to 0, start to 0
// loop through fruits (pointer = i)
  // set the lastIdx[fruit] to i
  // if fruit is not fruit1 and not fruit2, (then we need to move our window)
    // set max to Math.max(max, i - start)
    // if fruits[i - 1] is equal to fruit1
      // set start to the last index of fruit2 + 1 (that is the first valid index of fruit2)
      // delete lastIdx[fruit2] to save space
      // set fruit2 to fruit
    // otherwise 
      // set start to the last index of fruit1 + 1
      // delete lastIdx[fruit1] to save space
      // set fruit1 to fruit
  // set max to Math.max(max, i - start)
  // return max

// Time Complexity: O(n) 124ms
// Space Complexity: O(1) 49.4MB
var totalFruit = function(fruits) {
  let lastIdx = {};
  let fruit1, fruit2;
  let max = 0, start = 0;
  for (var i = 0; i < fruits.length; i++) {
    let fruit = fruits[i];
    lastIdx[fruit] = i;
    if (fruit !== fruit1 && fruit !== fruit2) {
      max = Math.max(max, i - start);
      if (i > 0 && fruits[i - 1] === fruit1) {
        start = lastIdx[fruit2] !== undefined ? lastIdx[fruit2] + 1 : 0;
        fruit2 = fruit;
      } else {
        start = lastIdx[fruit1] !== undefined ? lastIdx[fruit1] + 1 : 0;
        fruit1 = fruit;
      }
    }
  }
  max = Math.max(max, i - start);
  return max;
};

// Solution 2: Sliding Window

// k = unique fruits
// Time Complexity: O(n) 160ms
// Space Complexity: O(k) 49.7MB
var totalFruit = function(fruits) {
  let count = {}, max = 0;
  let left = 0;
  let unique = 0;
  for (let right = 0; right < fruits.length; right++) {
    if (!count[fruits[right]]) unique++;
    count[fruits[right]] = (count[fruits[right]] || 0) + 1;
    while (unique > 2) {
      count[fruits[left]]--;
      if (count[fruits[left]] === 0) unique--;
      left++;
    } 
    max = Math.max(max, right - left + 1);
  }
  return max;
};

// Four test cases 
console.log(totalFruit([1,2,1])) // 3
console.log(totalFruit([0,1,2,2])) // 3
console.log(totalFruit([1,2,3,2,2])) // 4
console.log(totalFruit([3,3,3,1,2,1,1,2,3,3,4])) // 5