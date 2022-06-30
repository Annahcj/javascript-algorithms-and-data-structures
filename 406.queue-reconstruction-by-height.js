// 406. Queue Reconstruction by Height
// You are given an array of people, people, which are the attributes of some people in a queue (not necessarily in order). Each people[i] = [hi, ki] represents the ith person of height hi with exactly ki other people in front who have a height greater than or equal to hi.
// Reconstruct and return the queue that is represented by the input array people. The returned queue should be formatted as an array queue, where queue[j] = [hj, kj] is the attributes of the jth person in the queue (queue[0] is the person at the front of the queue).


// Solution: Greedy w/ Sorting

// 1. Sort people by heights in desc order because shorter heights are "invisible" to taller heights.
  // Meaning that shorter heights take no effect on the number taller/equal height people in front of a person.
// 2. Process people after sorting, we can place each at index people[i][1] 
  // This is because we know exactly how many taller/equal height people are there already. 
  
// The other case to consider is equal heights.
// If we have equal heights, we want to sort by asc order by k, since equal heights in front of a person are counted too.

// Time Complexity: O(n log(n) + n^2) 141ms
// Space Complexity: O(n) 47.9MB
var reconstructQueue = function(people) {
  people.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return b[0] - a[0];
  });  
  let res = [];
  for (let [height, index] of people) {
    res.splice(index, 0, [height, index]);
  }
  return res;
};

// Two test cases to run function on
console.log(reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]])) // [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
console.log(reconstructQueue([[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]])) // [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]