// 1472. Design Browser History
// You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.
// Implement the BrowserHistory class:
  // BrowserHistory(string homepage) Initializes the object with the homepage of the browser.
  // void visit(string url) Visits url from the current page. It clears up all the forward history.
  // string back(int steps) Move steps back in history. If you can only return x steps in the history and steps > x, you will return only x steps. Return the current url after moving back in history at most steps.
  // string forward(int steps) Move steps forward in history. If you can only forward x steps in the history and steps > x, you will forward only x steps. Return the current url after forwarding in history at most steps.


// Solution: Stack w/ Two Pointers

// Keep two pointers: 
  // index: current index
  // top: last index of the part of the stack we are using

// Instead of popping urls off the stack when visit is called, we can move the top pointer.

// Runtime on LeetCode: 204ms
// Memory Usage on LeetCode: 49.6MB

// Time Complexity for all methods: O(1)
// Total Space Complexity: O(n)
var BrowserHistory = function(homepage) {
  this.history = [homepage];
  this.index = 0;
  this.top = 0;  
};

BrowserHistory.prototype.visit = function(url) {
  this.index++;
  this.history[this.index] = url;
  this.top = this.index;
};

BrowserHistory.prototype.back = function(steps) {
  steps = Math.min(steps, this.index);
  this.index -= steps;
  return this.history[this.index];  
};

BrowserHistory.prototype.forward = function(steps) {
  steps = Math.min(steps, this.top - this.index);
  this.index += steps;
  return this.history[this.index];
};

// A few test cases
let browserHistory = new BrowserHistory("leetcode.com");
browserHistory.visit("google.com"); // You are in "leetcode.com". Visit "google.com"
browserHistory.visit("facebook.com"); // You are in "google.com". Visit "facebook.com"
browserHistory.visit("youtube.com"); // You are in "facebook.com". Visit "youtube.com"
console.log(browserHistory.back(1)); // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
console.log(browserHistory.back(1)); // You are in "facebook.com", move back to "google.com" return "google.com"
console.log(browserHistory.forward(1)); // You are in "google.com", move forward to "facebook.com" return "facebook.com"
browserHistory.visit("linkedin.com"); // You are in "facebook.com". Visit "linkedin.com"
console.log(browserHistory.forward(2)); // You are in "linkedin.com", you cannot move forward any steps.
console.log(browserHistory.back(2)); // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
console.log(browserHistory.back(7)); // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com