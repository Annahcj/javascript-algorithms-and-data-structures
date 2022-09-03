// 1125. Smallest Sufficient Team
// In a project, you have a list of required skills req_skills, and a list of people. The ith person people[i] contains a list of skills that the person has.
// Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least one person in the team who has that skill. We can represent these teams by the index of each person.
  // For example, team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].
// Return any sufficient team of the smallest possible size, represented by the index of each person. You may return the answer in any order.
// It is guaranteed an answer exists.


// Solution: DP w/ Bitmasks

// Populate dp, where dp[mask] = bitmask of skills we have.
// For each dp[mask], try to take each people[i] and update the new state if necessary.
  // At each step, we use the previously calculated results to update new state.

// Precompute bitmasks for the skills of each people[i] so that we have quick lookup.

// n = people.length, m = req_skills.length
// Time Complexity: O(2^m * n) 131ms
// Space Complexity: O(2^m) 60MB
var smallestSufficientTeam = function(req_skills, people) {
  let n = people.length, m = req_skills.length;
  let skills = Array(n), skillKey = req_skills.reduce((memo, skill, i) => {
    memo.set(skill, i);
    return memo;
  }, new Map());
  
  // precompute bitmasks of skills for each people[i]
  for (let i = 0; i < n; i++) {
    let mask = 0;
    for (let skill of people[i]) {
      mask |= (1 << skillKey.get(skill));
    }
    skills[i] = mask;
  }
  
  let dp = Array(1 << m).fill(null);
  dp[0] = [];
  
  for (let i = 0; i < (1 << m); i++) {
    if (dp[i] === null) continue;
    for (let j = 0; j < n; j++) {
      let newSkills = i | skills[j];
      if (dp[newSkills] === null || dp[i].length + 1 < dp[newSkills].length) {
        dp[newSkills] = [...dp[i], j];
      }
    }
  }
  return dp[(1 << m) - 1];
};

// Two test cases to run function on
console.log(smallestSufficientTeam(["java","nodejs","reactjs"], [["java"],["nodejs"],["nodejs","reactjs"]])) // [0,2]
console.log(smallestSufficientTeam(["algorithms","math","java","reactjs","csharp","aws"], [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]])) // [1,2]