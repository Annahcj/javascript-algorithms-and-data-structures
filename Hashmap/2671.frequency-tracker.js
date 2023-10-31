// 2671. Frequency Tracker
// Design a data structure that keeps track of the values in it and answers some queries regarding their frequencies.
// Implement the FrequencyTracker class.
  // FrequencyTracker(): Initializes the FrequencyTracker object with an empty array initially.
  // void add(int number): Adds number to the data structure.
  // void deleteOne(int number): Deletes one occurence of number from the data structure. The data structure may not contain number, and in this case nothing is deleted.
  // bool hasFrequency(int frequency): Returns true if there is a number in the data structure that occurs frequency number of times, otherwise, it returns false.


// Solution: Two Hashmaps 

// Keep track of two hashmaps:
  // count: The count of each number
  // freqCount: The count of each frequency

// add: 
  // Add 1 to the count of the number.
  // Add 1 to the count of the new frequency.
  // If the count of the number > 1, subtract 1 from the count of the old frequency.

// deleteOne:
  // Subtract 1 from the count of the old frequency.
  // Subtract 1 from the count of the number.
  // If the new frequency > 0, add 1 to the count of the new frequency.

// Time Complexity: O(n) 553ms
  // add, deleteOne, hasFrequency: O(1)
// Space Complexity: O(n) 126.1MB 
var FrequencyTracker = function() {
  this.count = new Map();
  this.freqCount = new Map();
};

FrequencyTracker.prototype.add = function(number) {
  let oldFreq = this.count.has(number) ? this.count.get(number) : 0;
  this.count.set(number, oldFreq + 1);
  this.freqCount.set(oldFreq + 1, (this.freqCount.get(oldFreq + 1) || 0) + 1);
  if (oldFreq > 0) {
    this.freqCount.set(oldFreq, this.freqCount.get(oldFreq) - 1); 
  }
};

FrequencyTracker.prototype.deleteOne = function(number) {
  if (!this.count.has(number) || this.count.get(number) === 0) return;
  let oldFreq = this.count.get(number), newFreq = oldFreq - 1;
  this.freqCount.set(oldFreq, this.freqCount.get(oldFreq) - 1);
  this.count.set(number, newFreq);
  if (newFreq > 0) {
    this.freqCount.set(newFreq, (this.freqCount.get(newFreq) || 0) + 1);
  }
};

FrequencyTracker.prototype.hasFrequency = function(frequency) {
  return this.freqCount.has(frequency) && this.freqCount.get(frequency) > 0;
};

// A few test cases
let frequencyTracker = new FrequencyTracker();
frequencyTracker.add(3); // The data structure now contains [3]
frequencyTracker.add(3); // The data structure now contains [3, 3]
console.log(frequencyTracker.hasFrequency(2)); // Returns true, because 3 occurs twice