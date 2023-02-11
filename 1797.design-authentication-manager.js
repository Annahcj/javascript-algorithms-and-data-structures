// 1797. Design Authentication Manager
// There is an authentication system that works with authentication tokens. For each session, the user will receive a new authentication token that will expire timeToLive seconds after the currentTime. If the token is renewed, the expiry time will be extended to expire timeToLive seconds after the (potentially different) currentTime.
// Implement the AuthenticationManager class:
  // AuthenticationManager(int timeToLive) constructs the AuthenticationManager and sets the timeToLive.
  // generate(string tokenId, int currentTime) generates a new token with the given tokenId at the given currentTime in seconds.
  // renew(string tokenId, int currentTime) renews the unexpired token with the given tokenId at the given currentTime in seconds. If there are no unexpired tokens with the given tokenId, the request is ignored, and nothing happens.
  // countUnexpiredTokens(int currentTime) returns the number of unexpired tokens at the given currentTime.
// Note that if a token expires at time t, and another action happens on time t (renew or countUnexpiredTokens), the expiration takes place before the other actions.


// Solution: Max Heap w/ Lazy Removal

// Use a hashmap to keep track of the expiry time of each token.
// When we call renew, or countUnexpiredTokens, remove expired tokens from the top of the heap. 
  // Note: There may be tokens that have been extended and will no longer be expired. Check the expiry time in the hashmap and if it has been extended past currentTime, add it back to the heap with the new expiry date.

// n = number of tokens
// Time Complexity: 151ms
  // generate: O(1)
  // renew: O(log(n)) amortized
  // countUnexpiredTokens: O(log(n)) amortized
// Space Complexity: O(n) 52MB
var AuthenticationManager = function(timeToLive) {
  this.expiryTime = new Map();
  this.heap = new Heap((a, b) => a[1] - b[1]); // [tokenId, expiry time]
  this.timeToLive = timeToLive;  
};

AuthenticationManager.prototype.generate = function(tokenId, currentTime) {
  let expiryTime = currentTime + this.timeToLive;
  this.expiryTime.set(tokenId, expiryTime);
  this.heap.add([tokenId, expiryTime]);
};

AuthenticationManager.prototype.renew = function(tokenId, currentTime) {
  this.removeExpired(currentTime);
  if (!this.expiryTime.has(tokenId)) return;
  this.expiryTime.set(tokenId, currentTime + this.timeToLive);
};

AuthenticationManager.prototype.countUnexpiredTokens = function(currentTime) {
  this.removeExpired(currentTime);
  return this.heap.size;
};
  
AuthenticationManager.prototype.removeExpired = function(currentTime) {
  while (!this.heap.isEmpty() && this.heap.top()[1] <= currentTime) {
    let [tokenId, expiryTime] = this.heap.remove();
    if (this.expiryTime.get(tokenId) > currentTime) {
      this.heap.add([tokenId, this.expiryTime.get(tokenId)]);
    } else {
      this.expiryTime.delete(tokenId);
    }
  }
};

class Heap {
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
let authenticationManager = new AuthenticationManager(5); 
authenticationManager.renew("aaa", 1); 
authenticationManager.generate("aaa", 2); 
console.log(authenticationManager.countUnexpiredTokens(6)); // 1
authenticationManager.generate("bbb", 7);
authenticationManager.renew("aaa", 8); 
authenticationManager.renew("bbb", 10); 
console.log(authenticationManager.countUnexpiredTokens(15)); // 0