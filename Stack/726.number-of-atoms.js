// 726. Number of Atoms
// Given a string formula representing a chemical formula, return the count of each atom.


// Solution 1: Iteration - Stack & Hashmaps

// When encountering a normal character (an element), find the whole element and the count of that element.
// Store the counts of all elements in a hashmap, and store these hashmaps in a stack.
// When there are no parentheses in between elements, share the same hashmap.

// When encountering parentheses, 
  // 1. We first store the '('.
  // 2. Process the formula in between.
  // 3. Combine all count hashmaps in the stack up to the last '('.
  // 4. Get the count x following the parentheses and multiply all counts by x.
  // 5. Push this multiplied count hashmap back to the stack.

// At the end, we will have a stack of hashmaps.
// Combine these counts into one, then sort and concatenate to get the final string.

// Time Complexity: O(n^2) 70ms
// Space Complexity: O(n) 53.4MB
function countOfAtoms(formula) {
  let stack = [], i = 0;
  let n = formula.length;
  while (i < n) {
    if (formula[i] === '(') {
      stack.push('(');
      i++;
    } else if (formula[i] === ')') {
      // combine all the count maps up to the matching open bracket and multiply by the following count
      let {count, nextIndex} = getCount(formula, i + 1);
      let totalCountMap = {};
      while (stack[stack.length - 1] !== '(') {
        let countMap = stack.pop();
        totalCountMap = combine(totalCountMap, countMap);
      }
      totalCountMap = multiply(totalCountMap, count);
      stack.pop(); // remove the (
      stack.push(totalCountMap);
      i = nextIndex;
    } else {
      // update element count
      let {element, count, nextIndex} = getElement(formula, i);
      if (!stack.length || !(typeof stack[stack.length - 1] === 'object')) {
        stack.push({});
      }
      let countMap = stack[stack.length - 1];
      countMap[element] = (countMap[element] || 0) + count;
      i = nextIndex;
    }
  }
  let counts = [], totalCountMap = {};
  for (let countMap of stack) {
    totalCountMap = combine(totalCountMap, countMap);
  }
  for (let el in totalCountMap) {
    let count = totalCountMap[el];
    counts.push([el, count]);
  }
  counts.sort((a, b) => a[0].localeCompare(b[0]));
  return counts.map(([el, count]) => count === 1 ? el : `${el}${count}`).join("");
};

function getElement(formula, i) {
  let element = formula[i];
  let count = 0;
  i++;
  while (i < formula.length && !formula[i].match(/[A-Z\(\)]/)) {
    if (isNaN(formula[i])) { // still part of the element
      element += formula[i];
    } else { // count part
      count = (count * 10) + Number(formula[i]);
    }
    i++;
  }
  return {element, count: count || 1, nextIndex: i};
}

function getCount(formula, i) {
  let count = 0;
  while (i < formula.length && !isNaN(formula[i])) {
    count = (count * 10) + Number(formula[i]);
    i++;
  }
  return {count: count || 1, nextIndex: i};
}

// combine counts from the two maps
function combine(totalCountMap, countMap) {
  for (let el in countMap) {
    let count = countMap[el];
    totalCountMap[el] = (totalCountMap[el] || 0) + count;
  }
  return totalCountMap;
}

// multiply all counts by x
function multiply(countMap, x) {
  for (let el in countMap) {
    countMap[el] = countMap[el] * x;
  }
  return countMap;
}


// Solution 2: Recursion - Stack

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

// Four test cases
console.log(countOfAtoms("((HHe28Be26He)9)34")) // "Be7956H306He8874"
console.log(countOfAtoms("H2O")) // "H2O"
console.log(countOfAtoms("Mg(OH)2")) // "H2MgO2"
console.log(countOfAtoms("K4(ON(SO3)2)2")) // "K4N2O14S4"