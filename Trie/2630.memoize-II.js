// 2630. Memoize II
// Given a function fn, return a memoized version of that function.
// A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.
// fn can be any function and there are no constraints on what type of values it accepts. Inputs are considered identical if they are === to each other.


// Solution 1: Map w/ Id Generator

// One way to solve the reference issue with array/object arguments is by using an id generator to convert them into a number.
// We can keep a map of the arguments and keep a running count of distinct arguments.
// Note: We specifically use a Map and not a regular object because the Map supports any key values and not just strings.

// k = number of arguments, n = distinct number of calls 
// Time Complexity: O(k) 409ms
// Space Complexity: O(nk) 116.1MB
function memoize(fn) {
  let returnValueMap = new Map();
  let idMap = new Map();
  
  return function(...args) {
    const key = getKey(args);
    if (!returnValueMap.has(key)) {
      const returnValue = fn(...args);
      returnValueMap.set(key, returnValue);
    }
    return returnValueMap.get(key);
  }
  
  function getKey(args) {
    const ids = [];
    for (const arg of args) {
      if (!idMap.has(arg)) {
        idMap.set(arg, idMap.size);
      }
      const id = idMap.get(arg);
      ids.push(id);
    }
    return ids.join(",");
  }
}


// Solution 2: Trie

// Keep a map of tries to function names: {function name: trie, function name: trie, ...}
// For each function name, we use a trie to create a chain-like structure for the arguments of a function.
// For each trie node, we use a Map to keep track of children nodes. 
// Note: Tries can potentially save memory when many arguments share the same prefixes, since we use the existing nodes.

// k = number of arguments, n = distinct number of calls 
// Time Complexity: O(k) 402ms
// Space Complexity: O(nk) 135.1MB
function memoize(fn) {
  let trieMap = new Map();
  
  return function(...args) {
    if (!trieMap.has(fn.name)) trieMap.set(fn.name, new TrieNode());
    let node = trieMap.get(fn.name);
    for (let i = 0; i < args.length; i++) {
      node = node.children;
      if (!node.has(args[i])) {
        node.set(args[i], new TrieNode());
      }
      node = node.get(args[i]);
    }
    if (node.returnValue === null) { // not cached
      const returnValue = fn(...args);
      node.returnValue = returnValue;
    }
    return node.returnValue;
  }
}

class TrieNode {
  constructor() {
    this.children = new Map();
    this.returnValue = null;
  }
}

// A few test cases
let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1 