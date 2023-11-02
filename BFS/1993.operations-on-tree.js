// 1993. Operations on Tree


// Solution: DFS & BFS

// Time Complexity: 
  // lock & unlock: O(1)
  // upgrade: O(n) worst case
// Space Complexity: O(n)
var LockingTree = function(parent) {
  let n = parent.length;
  this.parent = parent;
  this.locked = Array(n).fill(0);
  this.children = Array(n);
  for (let i = 0; i < n; i++) this.children[i] = [];
  for (let i = 1; i < n; i++) {
    this.children[parent[i]].push(i); // children[i] = children of node i
  }
};

// If node is locked, return false. Otherwise unlock and return true.
LockingTree.prototype.lock = function(num, user) {
  if (this.locked[num]) return false;
  this.locked[num] = user;
  return true;
};

// If locked by same user, unlock and return true. Otherwise return false.
LockingTree.prototype.unlock = function(num, user) {
  if (this.locked[num] === user) {
    this.locked[num] = 0;
    return true;
  }
  return false;
};

// Use BFS to find a locked child.
// Use a while loop to keep traverse up the tree until we reach the root or find a locked parent.
// Use DFS to unlock all descendants.
LockingTree.prototype.upgrade = function(num, user) {
  if (this.locked[num]) return false; // node is locked
  if (!hasLockedChild(num, this.locked, this.children)) return false; // no locked child
  if (hasLockedParent(num, this.locked, this.parent)) return false; // has a locked parent
  unlockAll(num, this.locked, this.children);
  this.locked[num] = user;
  return true;
};

// Use BFS to find a locked child.
function hasLockedChild(idx, locked, children) {
  let queue = [idx];
  while (queue.length) {
    let node = queue.shift();
    if (locked[node]) return true;
    for (let child of children[node]) {
      queue.push(child);
    }
  }
  return false;
}

// Use a while loop to keep traverse up the tree until we reach the root or find a locked parent.
function hasLockedParent(idx, locked, parent) {
  while (idx !== -1) {
    if (locked[idx]) return true;
    idx = parent[idx];
  }
  return false;
}

// Iterative DFS to traverse and unlock all descendants.
function unlockAll(idx, locked, children) {
  let stack = [idx];
  while (stack.length) {
    let node = stack.pop();
    locked[node] = 0;
    for (let child of children[node]) {
      stack.push(child);
    }
  }
}

// A few test cases
let lockingTree = new LockingTree([-1, 0, 0, 1, 1, 2, 2]);
console.log(lockingTree.lock(2, 2));    // return true because node 2 is unlocked.
                           // Node 2 will now be locked by user 2.
console.log(lockingTree.unlock(2, 3));  // return false because user 3 cannot unlock a node locked by user 2.
console.log(lockingTree.unlock(2, 2));  // return true because node 2 was previously locked by user 2.
                           // Node 2 will now be unlocked.
console.log(lockingTree.lock(4, 5));    // return true because node 4 is unlocked.
                           // Node 4 will now be locked by user 5.
console.log(lockingTree.upgrade(0, 1)); // return true because node 0 is unlocked and has at least one locked descendant (node 4).
                           // Node 0 will now be locked by user 1 and node 4 will now be unlocked.
console.log(lockingTree.lock(0, 1));    // return false because node 0 is already locked.