// 2618. Check if Object Instance of Class
// Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.
// There are no constraints on the data types that can be passed to the function. For example, the value or the class could be undefined.


// Solution: Traverse Prototype Chain

// Traverse the prototype chain and use Object.getPrototypeOf(obj) to check whether the current prototype is a prototype of classFunction.

// n = length of the prototype chain of obj
// Time Complexity: O(n) 124ms
// Space Complexity: O(1) 51.8MB
var checkIfInstanceOf = function(obj, classFunction) {
  if (obj === null || obj === undefined || typeof classFunction !== 'function') return false;
  
  while (obj !== null) {
    const prototype = Object.getPrototypeOf(obj);
    if (prototype === classFunction.prototype) return true;
    obj = prototype;
  }  
  return false;
};