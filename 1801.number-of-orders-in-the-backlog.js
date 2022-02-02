// 1801. Number of Orders in the Backlog
// You are given a 2D integer array orders, where each orders[i] = [pricei, amounti, orderTypei] denotes that amounti orders have been placed of type orderTypei at the price pricei. The orderTypei is:
  // 0 if it is a batch of buy orders, or
  // 1 if it is a batch of sell orders.
// Note that orders[i] represents a batch of amounti independent orders with the same price and order type. All orders represented by orders[i] will be placed before all orders represented by orders[i+1] for all valid i.
// There is a backlog that consists of orders that have not been executed. The backlog is initially empty. When an order is placed, the following happens:
  // If the order is a buy order, you look at the sell order with the smallest price in the backlog. If that sell order's price is smaller than or equal to the current buy order's price, they will match and be executed, and that sell order will be removed from the backlog. Else, the buy order is added to the backlog.
  // Vice versa, if the order is a sell order, you look at the buy order with the largest price in the backlog. If that buy order's price is larger than or equal to the current sell order's price, they will match and be executed, and that buy order will be removed from the backlog. Else, the sell order is added to the backlog.
// Return the total amount of orders in the backlog after placing all the orders from the input. Since this number can be large, return it modulo 109 + 7.


// Solution: Priority Queue

// sellBacklog: min heap of sell backlogs ([price, amount])
// buyBacklog: max heap of buy backlogs ([price, amount])

// 1. For each order, 
  // * opposite backlog: buy order -> sell backlog, sell order -> buy backlog
  // Reduce amount as much as possible by removing smallest/largest orders from the opposite backlog.
    // If the backlog amount is greater than the amount left, insert the remaining backlog amount back into the opposite backlog.
  // Insert the price and remaining amount into the backlog.

// 2. Sum up the remaining amount in the sellBacklog and buyBacklog. Continuously mod the answer to prevent integer overflow.

// Time Complexity: O(n log(n)) 248ms
// Space Complexity: O(n) 63.7MB
var getNumberOfBacklogOrders = function(orders) {
  let sellBacklog = new PriorityQueue((a, b) => a[0] - b[0]);
  let buyBacklog = new PriorityQueue((a, b) => b[0] - a[0]);
  for (let [price, amount, orderType] of orders) {
    if (orderType === 0) { // buy order
      while (!sellBacklog.isEmpty() && sellBacklog.top()[0] <= price && amount > 0) {
        let [sellPrice, sellAmount] = sellBacklog.remove();
        let newAmount = Math.max(amount - sellAmount, 0);
        sellAmount = Math.max(sellAmount - amount, 0);
        amount = newAmount;
        if (sellAmount > 0) sellBacklog.add([sellPrice, sellAmount]); // sellAmount > amount, add remaining back into backlog.
      }
      if (amount > 0) buyBacklog.add([price, amount]);
    } else { // sell order
      while (!buyBacklog.isEmpty() && buyBacklog.top()[0] >= price && amount > 0) {
        let [buyPrice, buyAmount] = buyBacklog.remove();
        let newAmount = Math.max(amount - buyAmount, 0);
        buyAmount = Math.max(buyAmount - amount, 0);
        amount = newAmount;
        if (buyAmount > 0) buyBacklog.add([buyPrice, buyAmount]); // buyAmount > amount, add remaining back into backlog.
      }
      if (amount > 0) sellBacklog.add([price, amount]); 
    }
  }

  let ans = 0, mod = 10 ** 9 + 7;
  while (!sellBacklog.isEmpty()) {
    let amount = sellBacklog.remove()[1];
    ans = (ans + amount) % mod;
  }
  while (!buyBacklog.isEmpty()) {
    let amount = buyBacklog.remove()[1];
    ans = (ans + amount) % mod;
  }
  return ans;
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

// Two test cases to run function on
console.log(getNumberOfBacklogOrders([[10,5,0],[15,2,1],[25,1,1],[30,4,0]])) // 6
console.log(getNumberOfBacklogOrders([[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]])) // 999999984