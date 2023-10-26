// 726. Number of Atoms
// Given a string formula representing a chemical formula, return the count of each atom.


// Solution: Recursion & Stack

// When we come across an uppercase letter: 
  // Get for the full element name (all lowercase letters directly after it). 
  // Put the element in an object with a count of 1, and push it into the stack.

// When we come across a number:
  // Get the full number.
  // Pop off the previous group of elements, then multiply all the frequencies of the previous group of elements by the number.

// When we come across a '(':
  // Recursively call count(i + 1), which will return the map of frequencies for all the elements within the parentheses AND the index after the matching closing parenthesis.
  // Push the submap into the stack.
  // Set i to be the next index (which was returned from count(i + 1)).

// When we come across a ')':
  // Set the 'breakIdx' to i and break out of the loop.

// For the result string, call count(0), which returns the map of frequencies for the whole formula, and the next index which we don't need.
// Filter them out into an array and sort them in lexographical order, then combine it into the result string.

// Time Complexity: O(n^2) 116ms
// Space Complexity: O(n) 44.2MB
var countOfAtoms = function(formula) {
  let map = count(0)[0];
  let elements = [];
  for (var el in map) elements.push([el, map[el]]);
  elements.sort((a, b) => a[0].localeCompare(b[0]));
  let res = "";
  for (var [element, count] of elements) {
    if (count === 1) res += element;
    else res += element + count;
  }
  return res;
  
  function count(idx) {
    let stack = [];
    let map = {}, breakIdx = idx;
    for (var i = idx; i < formula.length; i++) {
      let c = formula[i];
      if (!isNaN(c)) {
        let num = +c;
        while (i < formula.length - 1 && !isNaN(formula[i + 1])) {
          num = num * 10 + +formula[++i];
        }
        let subMap = stack.pop();
        for (var el in subMap) {
          subMap[el] *= num;
          map[el] = (map[el] || 0) + subMap[el];
        }
      } else if (c.charCodeAt() >= 65 && c.charCodeAt() <= 90) {
        let element = c;
        while (i < formula.length - 1 && formula.charCodeAt(i+1) >= 97 && formula.charCodeAt(i+1) <= 122) {
          element += formula[++i];
        }
        stack.push({[element]: 1});
      } else if (c === '(') {
        let [subMap, nextIdx] = count(i + 1);
        stack.push(subMap);
        i = nextIdx;
      } else {
        breakIdx = i;
        break;
      }
    }

    for (var subMap of stack) {
      for (var el in subMap) {
        map[el] = (map[el] || 0) + subMap[el];
      }
    }
    return [map, breakIdx];
  }
};

// Four test cases to run function on
console.log(countOfAtoms("((HHe28Be26He)9)34")) // "Be7956H306He8874"
console.log(countOfAtoms("H2O")) // "H2O"
console.log(countOfAtoms("Mg(OH)2")) // "H2MgO2"
console.log(countOfAtoms("K4(ON(SO3)2)2")) // "K4N2O14S4"