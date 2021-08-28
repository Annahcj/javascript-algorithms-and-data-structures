// 1086. High Five
// Given a list of the scores of different students, items, where items[i] = [IDi, scorei] represents one score from a student with IDi, calculate each student's top five average.
// Return the answer as an array of pairs result, where result[j] = [IDj, topFiveAveragej] represents the student with IDj and their top five average. Sort result by IDj in increasing order.
// A student's top five average is calculated by taking the sum of their top five scores and dividing it by 5 using integer division.


// Solution: Min Heap, Hashmap

// Note: A hashmap keeps items in ascending order of the keys, so we can make use of that feature.
// Initiate a new hashmap students, and our results array 'res'
// Loop through each [id, score] in items *
  // If the hashmap doesn't contain id yet,
    // set students[id] to a new MinHeap
    // add score to the heap in students[id]
  // Otherwise,
    // add score to the heap in students[id]
    // Remove the smallest item from the heap if it has more than 5 items
// *
// Loop through each id in students *
  // loop through the five scores in students[id].values, calculate the total sum of the scores.
  // push [+id (turn into number), Math.floor(totalScore / 5)] into res
// *
// Return res

// Time Complexity: O(n) 128ms (min heap will always have maximum 5 items, so adding and removing takes O(1))
// Space Complexity: O(n) 45.1MB
var highFive = function(items) {
  let students = {}, res = [];
  for (var [id, score] of items) {
    if (!students[id]) {
      students[id] = new MinHeap();
      students[id].add(score);
    } else {
      students[id].add(score);
      if (students[id].values.length > 5) students[id].remove();
    }
  }  
  for (var id in students) {
    let totalScore = 0;
    for (var score of students[id].values) {
      totalScore += score;
    }
    res.push([+id, Math.floor(totalScore / 5)]);
  }
  return res;
};

// Min Heap
class MinHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx] < this.values[parentIdx]) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx] < vals[rightIdx]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx] > this.values[childIdx]) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}

// Two test cases to run function on
console.log(highFive([[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]])) // [[1,87],[2,88]]
console.log(highFive([[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100]])) // [[1,100],[7,100]]