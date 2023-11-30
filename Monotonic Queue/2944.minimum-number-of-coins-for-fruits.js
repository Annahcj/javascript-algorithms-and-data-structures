// 2944. Minimum Number of Coins for Fruits
// You are at a fruit market with different types of exotic fruits on display.
// You are given a 1-indexed array prices, where prices[i] denotes the number of coins needed to purchase the ith fruit.
// The fruit market has the following offer:
  // If you purchase the ith fruit at prices[i] coins, you can get the next i fruits for free.
// Note that even if you can take fruit j for free, you can still purchase it for prices[j] coins to receive a new offer.
// Return the minimum number of coins needed to acquire all the fruits.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = minimum cost to acquire all fruits starting from index i.

// For each dp(i), we pay prices[i] to purchase the ith fruit, and we can get the next i fruits for free.
// However, that may not be the optimal result; ending the free fruits earlier may result in a smaller cost.
// Iterate through each index j where j <= i + i, and record the minimum prices[i] + dp(j + 1).

// Time Complexity: O(n^2) 112ms
// Space Complexity: O(n) 43.8MB
var minimumCoins = function(prices) {
  let n = prices.length, memo = Array(n + 1).fill(-1);
  return dp(1);
  
  function dp(i) {
    if (i >= n + 1) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let minCost = Infinity;
    for (let j = i; j <= i + i; j++) {
      minCost = Math.min(minCost, prices[i - 1] + dp(j + 1));
    }
    return memo[i] = minCost;
  }
};


// Solution 2: Iterative DP

// Same as solution 1, but the iterative version.

// Time Complexity: O(n^2) 64ms
// Space Complexity: O(n) 44.4MB
var minimumCoins = function(prices) {
  let n = prices.length, dp = Array(n + 2).fill(Infinity);
  dp[n + 1] = 0;
  for (let i = n; i >= 1; i--) {
    for (let j = i; j <= n && j <= i + i; j++) {
      dp[i] = Math.min(dp[i], prices[i - 1] + dp[j + 1]);
    }
  }
  return dp[1];
};


// Solution 3: Monotonic Decreasing Queue

// Maintain a monotonic decreasing queue of indices, ordered in desc order based on minimum cost.

// For each fruit,
  // 1. Remove from the front of the queue while queue.front() isn't enough to purchase past index i.
  // 2. The current cost dp[i] = dp[queue.front()] + prices[i].
  // 3. There's no point in keeping higher costs that occur at smaller indexes, so remove from the back of the queue while dp[queue.back()] >= dp[i].
  // 4. Push i to the back of the queue.

// Time Complexity: O(n) 64ms
// Space Complexity: O(n) 44.2MB
var minimumCoins = function(prices) {
  let n = prices.length, dp = Array(n);
  let deque = new Deque(), minCostToReachEnd = Infinity;
  for (let i = 0; i < n; i++) {
    while (!deque.isEmpty() && (deque.front() + 1) * 2 < i) {
      deque.shift();
    }
    dp[i] = deque.isEmpty() ? prices[i] : dp[deque.front()] + prices[i];
    if ((i + 1) * 2 >= n) minCostToReachEnd = Math.min(minCostToReachEnd, dp[i]);

    while (!deque.isEmpty() && dp[deque.back()] >= dp[i]) {
      deque.pop();
    }
    deque.push(i);
  }
  return minCostToReachEnd;
};

class Deque {
  constructor() {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  unshift(val) {
    let node = new Node(val);
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }
  push(val) {
    let node = new Node(val);
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  shift() {
    let head = this.head.next;
    this.removeNode(head);
    this.size--;
    return head.val;
  }
  pop() {
    let tail = this.tail.prev;
    this.removeNode(tail);
    this.size--;
    return tail.val;
  }
  removeNode(node) {
    if (!node.prev && !node.next) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }
  front() {
    return this.head.next.val;
  }
  back() {
    return this.tail.prev.val;
  }
  isEmpty() {
    return this.size === 0;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

// Two test cases
console.log(minimumCoins([3,1,2])) // 4
console.log(minimumCoins([1,10,1,1])) // 2