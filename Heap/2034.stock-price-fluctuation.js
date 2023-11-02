// 2034. Stock Price Fluctuation
// You are given a stream of records about a particular stock. Each record contains a timestamp and the corresponding price of the stock at that timestamp.
// Unfortunately due to the volatile nature of the stock market, the records do not come in order. Even worse, some records may be incorrect. Another record with the same timestamp may appear later in the stream correcting the price of the previous wrong record.
// Design an algorithm that:
// Updates the price of the stock at a particular timestamp, correcting the price from any previous records at the timestamp.
// Finds the latest price of the stock based on the current records. The latest price is the price at the latest timestamp recorded.
// Finds the maximum price the stock has been based on the current records.
// Finds the minimum price the stock has been based on the current records.


// Solution: Min & Max Heap

// Space Complexity: O(n)

// 1. hashmap 'stocks' which keeps the latest prices for each timestamp
// 2. min and max heap
// 3. latest timestamp (keeps the biggest timestamp that has occured)

// update: 
// Time Complexity: O(1)
// Space Complexity: O(1)
// update/set stocks[timestamp] to price
// Add price to both the min heap and max heap
// update latest if timestamp is bigger than latest

// current:
// Time Complexity: O(1)
// Space Complexity: O(1)
  // return the price associated with the timestamp 'latest'

// maximum:
// Time Complexity: O(log(n))
// Space Complexity: O(1)
  // remove the largest from the heap -> price, timestamp
  // keep removing from heap until price is equal to the current/updated price at timestamp
  // add [price, timestamp] back into the max heap
  // return price

// minimum: 
// Time Complexity: O(log(n))
// Space Complexity: O(1)
  // (same as max)
  // remove the smallest from the heap -> price, timestamp
  // keep removing from heap until price is equal to the current/updated price at timestamp
  // add [price, timestamp] back into the min heap
  // return price

// Runtime on LeetCode: 1006ms
// Memory Usage on LeetCode: 136.9MB


var StockPrice = function() {
  this.stocks = {};
  this.prices = {};
  this.latest = 0;
  this.minHeap = new Heap((a, b) => a[0] - b[0]);
  this.maxHeap = new Heap((a, b) => b[0] - a[0]);
};

StockPrice.prototype.update = function(timestamp, price) {
  this.latest = Math.max(this.latest, timestamp);
  this.stocks[timestamp] = price;

  this.minHeap.add([price, timestamp]);
  this.maxHeap.add([price, timestamp]);
};

StockPrice.prototype.current = function() {
  return this.stocks[this.latest];  
};

StockPrice.prototype.maximum = function() {
  let [price, timestamp] = this.maxHeap.remove();
  while (price !== this.stocks[timestamp]) {
    [price, timestamp] = this.maxHeap.remove();
  }
  this.maxHeap.add([price, timestamp]);
  return price;
};

StockPrice.prototype.minimum = function() {
  let [price, timestamp] = this.minHeap.remove();
  while (price !== this.stocks[timestamp]) {
    [price, timestamp] = this.minHeap.remove();
  }
  this.minHeap.add([price, timestamp]);
  return price;
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

let stockPrice = new StockPrice();
stockPrice.update(1, 10); // Timestamps are [1] with corresponding prices [10].
stockPrice.update(2, 5);  // Timestamps are [1,2] with corresponding prices [10,5].
console.log(stockPrice.current());     // return 5, the latest timestamp is 2 with the price being 5.
console.log(stockPrice.maximum());     // return 10, the maximum price is 10 at timestamp 1.
stockPrice.update(1, 3);  // The previous timestamp 1 had the wrong price, so it is updated to 3.
                          // Timestamps are [1,2] with corresponding prices [3,5].
console.log(stockPrice.maximum());     // return 5, the maximum price is 5 after the correction.
stockPrice.update(4, 2);  // Timestamps are [1,2,4] with corresponding prices [3,5,2].
console.log(stockPrice.minimum());     // return 2, the minimum price is 2 at timestamp 4.