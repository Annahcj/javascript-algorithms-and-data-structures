// 901. Online Stock Span
// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.
// The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backward) for which the stock price was less than or equal to today's price.
  // For example, if the price of a stock over the next 7 days were [100,80,60,70,60,75,85], then the stock spans would be [1,1,1,2,1,4,6].
// Implement the StockSpanner class:
  // StockSpanner() Initializes the object of the class.
  // int next(int price) Returns the span of the stock's price given that today's price is price.


// Solution: Monotonic Decreasing Stack

// Keep a monotonic decreasing stack of [stock price, index].
// Keeping track of the index is necessary since we need to calculate the number of days. 

// next:
  // pop off all equal or smaller stock prices.
  // get the index of the last larger stock (top of the stack)
  // push in [current price, current index].
  // return the current index - the last index.

// Time Complexity: O(n) 260ms
// Space Complexity: O(n) (worst case if price decreases each day) 54.8MB
var StockSpanner = function() {
  this.stack = [[-1, -1]]; 
  this.idx = -1;
};

StockSpanner.prototype.next = function(price) {
  this.idx++;
  while (this.stack.length > 1 && this.stack[this.stack.length - 1][0] <= price) {
    this.stack.pop();
  }
  let lastIdx = this.stack[this.stack.length - 1][1];
  this.stack.push([price, this.idx]);
  return this.idx - lastIdx;
};

// A few test cases
let stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6