// 1096. Brace Expansion II
// Under the grammar given below, strings can represent a set of lowercase words. Let R(expr) denote the set of words the expression represents.
// The grammar can best be understood through simple examples:
  // Single letters represent a singleton set containing that word.
    // R("a") = {"a"}
    // R("w") = {"w"}
  // When we take a comma-delimited list of two or more expressions, we take the union of possibilities.
    // R("{a,b,c}") = {"a","b","c"}
    // R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
  // When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
    // R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
    // R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
// Formally, the three rules for our grammar:
  // For every lowercase letter x, we have R(x) = {x}.
  // For expressions e1, e2, ... , ek with k >= 2, we have R({e1, e2, ...}) = R(e1) ∪ R(e2) ∪ ...
  // For expressions e1 and e2, we have R(e1 + e2) = {a + b for (a, b) in R(e1) × R(e2)}, where + denotes concatenation, and × denotes the cartesian product.
// Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.


// Solution: Recursion

// Use recursion to handle every {}.
// Each recurse(index) will return [combinations, nextIndex].
  // combinations = the word combinations from the expression starting at index
  // nextIndex = the index after the closing bracket }, indicates the end of the current expression

// Each recurse(index) will handle an expression within {}.
  // Once we find a closing bracket, it indicates the end of the current expression, so we return the array and the nextIndex.
// For each expression, each comma separated value should be evaluated into an array of combinations.
// Any characters or expressions within the same comma separated space will be an array of arrays of combinations, which will then we evaluated and generated into new combinations at the end.

// e.g: {c,{d,e}}
  // index = 0: groups = [[[c]], [[d,e]]], flattens to [c, d, e], endIndex = 8
  // index = 3: groups = [[[d]], [[e]]], flattens to [d, e], endIndex = 7
// e.g: {c{d,e}}
  // index = 0: groups = [[[c], [d, e]]], flattens to [cd, ce], endIndex = 7
  // index = 2: groups = [[[d]], [[e]]], flattens to [d, e], endIndex = 6

var braceExpansionII = function(expression) {
  expression = `{${expression}}`;
  let [res] = recurse(0);
  return res.sort();
  
  function recurse(index) {
    let words = [[]], endIndex = 0;
    for (let i = index; i < expression.length; i++) {
      if (expression[i] === '{') {
        let [options, nextIndex] = recurse(i + 1);
        i = nextIndex - 1;
        words[words.length - 1].push(options);
      } else if (expression[i] === '}') { // end of current expression
        endIndex = i + 1;
        break;
      } else if (expression[i] === ',') {
        words.push([]);
      } else {
        words[words.length - 1].push([expression[i]]);
      }
    }
    
    let set = new Set();
    for (let arr of words) { // generate combinations for each group and flatten into one level
      getCombinations(arr, set);
    }
    return [[...set], endIndex];
  }
};

function getCombinations(arr, set) {
  let n = arr.length, words = arr[0];
  for (let i = 1; i < n; i++) {
    let newWords = [];
    for (let prevWord of words) {
      for (let word of arr[i]) {
        newWords.push(prevWord + word);
      }
    }
    words = newWords;
  }
  
  for (let word of words) {
    set.add(word);
  }
}

// Four test cases
console.log(braceExpansionII("{a,b}{c,{d,e}}")) // ["ac","ad","ae","bc","bd","be"]
console.log(braceExpansionII("{{a,z},a{b,c},{ab,z}}")) // ["a","ab","ac","z"]
console.log(braceExpansionII("{a,b}{c,d}")) // ["ac","ad","bc","bd"]
console.log(braceExpansionII("a{b,c}{d,e}f{g,h}")) // ["abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"]