// 2353. Design a Food Rating System
// Design a food rating system that can do the following:
  // Modify the rating of a food item listed in the system.
  // Return the highest-rated food item for a type of cuisine in the system.
// Implement the FoodRatings class:
  // FoodRatings(String[] foods, String[] cuisines, int[] ratings) Initializes the system. The food items are described by foods, cuisines and ratings, all of which have a length of n.
    // foods[i] is the name of the ith food,
    // cuisines[i] is the type of cuisine of the ith food, and
    // ratings[i] is the initial rating of the ith food.
  // void changeRating(String food, int newRating) Changes the rating of the food item with the name food.
  // String highestRated(String cuisine) Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
// Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.


// Solution: Priority Queue w/ Lazy Removal

// For each cuisine, keep a priority queue of [food, rating] ordered by rating (desc) and food in lexicographical order.
// Use a hashmap to keep track of the rating and cuisine of each food.
// When a rating is updated, update the hashmap and add [food, newRating] to the priority queue.
// When getting the highest rated food, remove all foods with an outdated rating before getting the topmost food.

// Time Complexity: 631ms
  // initialization: O(n log(n))
  // changeRating: O(log(n))
  // highestRated: O(m log(m)) worst case, but will never be more than O(m log(m)) for the total number of calls (m is the number of calls)
// Space Complexity: O(n) 98.3MB
var FoodRatings = function(foods, cuisines, ratings) {
  this.heaps = {}, this.foods = {};
  let n = foods.length;
  for (let i = 0; i < n; i++) {
    let food = foods[i], cuisine = cuisines[i], rating = ratings[i];
    if (!this.heaps[cuisine]) this.heaps[cuisine] = new PriorityQueue((a, b) => { // [food, rating]
      return a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1];
    })
    this.heaps[cuisine].add([food, rating]);
    this.foods[food] = { cuisine, rating };
  } 
};

FoodRatings.prototype.changeRating = function(food, newRating) {
  this.foods[food].rating = newRating;
  let { cuisine } = this.foods[food];
  this.heaps[cuisine].add([food, newRating]);
};

FoodRatings.prototype.highestRated = function(cuisine) {
  let heap = this.heaps[cuisine];  
  while (this.foods[heap.top()[0]].rating !== heap.top()[1]) {
    heap.remove();
  }
  return heap.top()[0];
};

class PriorityQueue {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// A few test cases
let foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
console.log(foodRatings.highestRated("korean")); // return "kimchi"
                                    // "kimchi" is the highest rated korean food with a rating of 9.
console.log(foodRatings.highestRated("japanese")); // return "ramen"
                                      // "ramen" is the highest rated japanese food with a rating of 14.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
console.log(foodRatings.highestRated("japanese")); // return "sushi"
                                      // "sushi" is the highest rated japanese food with a rating of 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
console.log(foodRatings.highestRated("japanese")); // return "ramen"
                                      // Both "sushi" and "ramen" have a rating of 16.
                                      // However, "ramen" is lexicographically smaller than "sushi".