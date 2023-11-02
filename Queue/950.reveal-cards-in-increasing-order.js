// 950. Reveal Cards In Increasing Order
// You are given an integer array deck. There is a deck of cards where every card has a unique integer. The integer on the ith card is deck[i].
// You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck.
// You will do the following steps repeatedly until all cards are revealed:
  // 1. Take the top card of the deck, reveal it, and take it out of the deck.
  // 2. If there are still cards in the deck then put the next top card of the deck at the bottom of the deck.
  // 3. If there are still unrevealed cards, go back to step 1. Otherwise, stop.
// Return an ordering of the deck that would reveal the cards in increasing order.
// Note that the first entry in the answer is considered to be the top of the deck.


// Solution: Simulation w/ Deque

// 1. Sort the array in asc order.
// 2. Use a deque to simulate the process.

// e.g: [10,20,30,40,50,60]
// We look at the indices only.
// Round 1: 0,1,2,3,4,5 -> take 0,2,4 -> left with 1,3,5
// Round 2: 1,3,5 -> take 1,5 -> left with 3
// Round 3: 3 -> take 3 -> left with nothing.

// The order is 0,2,4,1,5,3
// Round 1: 0,2,4 -> [10,_,20,_,30,_]
// Round 2: 1,5 ->   [_,40,_,_,_,50]
// Round 3: 3 ->     [_,_,_,60,_,_]

// The end result: [10,40,20,60,30,50]

// Time Complexity: O(n log(n)) 84ms
// Space Complexity: O(n) 44.9MB
var deckRevealedIncreasing = function(deck) {
  let queue = new Deque(), n = deck.length;
  for (let i = 0; i < n; i++) queue.push(i);
  deck.sort((a, b) => a - b);
  
  let res = Array(n);
  for (let i = 0; i < n; i++) { 
    res[queue.shift()] = deck[i];
    let top = queue.size ? queue.shift() : null;
    if (top) queue.push(top);
  }
  return res;
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
console.log(deckRevealedIncreasing([17,13,11,2,3,5,7])) // [2,13,3,11,5,17,7]
console.log(deckRevealedIncreasing([1,1000])) // [1,1000]