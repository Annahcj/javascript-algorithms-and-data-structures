// 1286. Iterator for Combination


// Solution: 

// Runtime on LeetCode: 104ms
// Memory Usage on LeetCode: 45.7MB

// k = combinationLength
// CombinationIterator:
  // Keep indexes of each characters in an array of length k
  // Initially, set idxs to be the 0 to k - 1 as that would be the smallest combination.
// T.C: O(k)
// S.C: O(k)

// next:
  // loop backwards in idxs and find the first index that can be increased without overlapping.
  // (set a counter index equal to n - 1, loop until idxs[j] is not equal to index, while decrementing j and index)
  // If j is bigger than or equal to 0,
    // change idxs[j] to idxs[j] + 1
    // loop through every index after j and change them into [idxs[j] + 1, idxs[j] + 2, idxs[j] + 3, ...]
  // Otherwise if we can't make a bigger combination,
    // set hasNextComb to false
  // Return the string formed from the indexes before it was updated.

// T.C: O(k)
// S.C: O(1)
var CombinationIterator = function(characters, combinationLength) {
  this.str = characters;
  this.k = combinationLength;
  this.idxs = [];
  for (var i = 0; i < this.k; i++) {
    this.idxs.push(i);
  }  
  this.hasNextComb = true;
};

CombinationIterator.prototype.next = function() {
  let res = '';
  for (var idx of this.idxs) res += this.str[idx];
  let k = this.k, n = this.str.length;
  let j = k - 1, index = n - 1;
  while (j >= 0 && this.idxs[j] === index) {
    j--;
    index--;
  }
  if (j >= 0) {
    // increment j, reset anything after j to be incrementally one more than the index before it
    this.idxs[j]++;
    let newIdx = this.idxs[j] + 1;
    j++;
    while (j < k) {
      this.idxs[j] = newIdx;
      newIdx++;
      j++;
    }
  } else {
    this.hasNextComb = false;
  }
  return res;  
};

CombinationIterator.prototype.hasNext = function() {
  return this.hasNextComb;  
};

// A few test cases
let itr = new CombinationIterator("abc", 2);
console.log(itr.next());    // return "ab"
console.log(itr.hasNext()); // return True
console.log(itr.next());    // return "ac"
console.log(itr.hasNext()); // return True
console.log(itr.next());    // return "bc"
console.log(itr.hasNext()); // return False