// 911. Online Election
// You are given two integer arrays persons and times. In an election, the ith vote was cast for persons[i] at time times[i].
// For each query at a time t, find the person that was leading the election at time t. Votes cast at time t will count towards our query. In the case of a tie, the most recent vote (among tied candidates) wins.
// Implement the TopVotedCandidate class:
  // TopVotedCandidate(int[] persons, int[] times) Initializes the object with the persons and times arrays.
  // int q(int t) Returns the number of the person that was leading the election at time t according to the mentioned rules.
 

// Solution: Precomputation & Binary Search

// We don't need to record the leading candidate at every timestamp, only the ones in each times[i], since those are the only times that will change.
// In the initializer, precompute the leading candidate for each time in times.
  // Go through each vote and keep track of the maximum votes and leader for each timestamp.
  
// For each query, we can binary search to find the largest time which is smaller than or equal to t.

// n = number of votes
// Time Complexity: 487ms
  // init: O(n)
  // q: O(log(n))
// Space Complexity: O(n) 60.1MB
var TopVotedCandidate = function(persons, times) {
  this.leaders = [];
  let votes = {}, maxVotes = 0, leader = '';
  for (let i = 0; i < persons.length; i++) {
    let person = persons[i], time = times[i];
    votes[person] = (votes[person] || 0) + 1;
    if (votes[person] >= maxVotes) {
      maxVotes = votes[person];
      leader = person;
    }
    this.leaders.push({time, leader});
  }
};

TopVotedCandidate.prototype.q = function(t) {
  let low = 0, high = this.leaders.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (this.leaders[mid].time <= t) low = mid;
    else high = mid - 1;
  }
  return this.leaders[low].leader;
};

// A few test cases
let topVotedCandidate = new TopVotedCandidate([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]);
console.log(topVotedCandidate.q(3)); // return 0, At time 3, the votes are [0], and 0 is leading.
console.log(topVotedCandidate.q(12)); // return 1, At time 12, the votes are [0,1,1], and 1 is leading.
console.log(topVotedCandidate.q(25)); // return 1, At time 25, the votes are [0,1,1,0,0,1], and 1 is leading (as ties go to the most recent vote.)
console.log(topVotedCandidate.q(15)); // return 0
console.log(topVotedCandidate.q(24)); // return 0
console.log(topVotedCandidate.q(8)); // return 1