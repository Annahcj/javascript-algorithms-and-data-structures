// 381. Insert Delete GetRandom O(1) - Duplicates allowed
// RandomizedCollection is a data structure that contains a collection of numbers, possibly duplicates (i.e., a multiset). It should support inserting and removing specific elements and also removing a random element.
// Implement the RandomizedCollection class:
  // RandomizedCollection() Initializes the empty RandomizedCollection object.
  // bool insert(int val) Inserts an item val into the multiset, even if the item is already present. Returns true if the item is not present, false otherwise.
  // bool remove(int val) Removes an item val from the multiset if present. Returns true if the item is present, false otherwise. Note that if val has multiple occurrences in the multiset, we only remove one of them.
  // int getRandom() Returns a random element from the current multiset of elements. The probability of each element being returned is linearly related to the number of same values the multiset contains.
// You must implement the functions of the class such that each function works on average O(1) time complexity.


// Solution: Hashmap, Hashset & Array

// Data structures we need:
  // 1. An array of values (this is for the random selection)
  // 2. A map of sets -> {val: set of indices, val: set of indices}

// Insertion:
  // Add the new index (length of arr) to the set in the map.
  // Push the value into arr.

// Removal:
  // Get the first value from the set for val in the map -> this.map.get(val).values().next().value
  // Remove the index from the set.
  
  // Swap the last value in arr with val.
  // Remove the last index from its set in the map.
  // Add the index of val back into the set of the last index.

  // Pop the last element off arr.
  // Delete the set of val if it is empty.

// Random:
  // Choose a random index from 0 to arr.length - 1.
  // Return the element at arr[random index].

// Time Complexity for all methods: O(1) 703ms
// Space Complexity (overall): O(n) 110.4MB
var RandomizedCollection = function() {
  this.map = new Map(); // a map of sets for each value
  this.arr = [];
};

RandomizedCollection.prototype.insert = function(val) {
  let present = !this.map.has(val);
  if (!this.map.has(val)) this.map.set(val, new Set());
  this.map.get(val).add(this.arr.length);
  this.arr.push(val);
  return present;
};

RandomizedCollection.prototype.remove = function(val) {
if (!this.map.has(val)) return false;
  let index = this.map.get(val).values().next().value;
  this.map.get(val).delete(index);
  
  let n = this.arr.length;
  let lastIndex = n - 1, lastVal = this.arr[lastIndex];
  [this.arr[index], this.arr[lastIndex]] = [this.arr[lastIndex], this.arr[index]];
  if (index !== lastIndex) {
    this.map.get(lastVal).delete(lastIndex);
    this.map.get(lastVal).add(index);
  }
  
  this.arr.pop();
  if (!this.map.get(val).size) this.map.delete(val);
  return true;
};

RandomizedCollection.prototype.getRandom = function() {
  // choose random value from arr
  let randomIdx = Math.floor(Math.random() * this.arr.length);
  return this.arr[randomIdx];
};

// A few test cases
let randomizedCollection = new RandomizedCollection();
console.log(randomizedCollection.insert(1));   // return true since the collection does not contain 1.
                                  // Inserts 1 into the collection.
console.log(randomizedCollection.insert(1));   // return false since the collection contains 1.
                                  // Inserts another 1 into the collection. Collection now contains [1,1].
console.log(randomizedCollection.insert(2));   // return true since the collection does not contain 2.
                                  // Inserts 2 into the collection. Collection now contains [1,1,2].
console.log(randomizedCollection.getRandom()); // getRandom should:
                                  // - return 1 with probability 2/3, or
                                  // - return 2 with probability 1/3.
console.log(randomizedCollection.remove(1));   // return true since the collection contains 1.
                                  // Removes 1 from the collection. Collection now contains [1,2].
console.log(randomizedCollection.getRandom()); // getRandom should return 1 or 2, both equally likely.