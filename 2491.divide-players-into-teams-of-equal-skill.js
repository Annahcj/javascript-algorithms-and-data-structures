// 2491. Divide Players Into Teams of Equal Skill
// You are given a positive integer array skill of even length n where skill[i] denotes the skill of the ith player. Divide the players into n / 2 teams of size 2 such that the total skill of each team is equal.
// The chemistry of a team is equal to the product of the skills of the players on that team.
// Return the sum of the chemistry of all the teams, or return -1 if there is no way to divide the players into teams such that the total skill of each team is equal.


// Solution: Sorting & Two Pointers

// Each skill[i] + skill[n - i] should have the same sum.
// Sort skills and take each pair of (skill[i], skill[n - i])
// If skill[i] + skill[n - i] are not all the same, return -1.

// Time Complexity: O(n log(n)) 155ms
// Space Complexity: O(log(n)) 51.2MB
var dividePlayers = function(skill) {
  skill.sort((a, b) => a - b);
  let n = skill.length, i = 0, j = n - 1;
  let teamSkill = skill[i] + skill[j], ans = 0;
  while (i < j) {
    if (skill[i] + skill[j] !== teamSkill) return -1;
    ans += skill[i] * skill[j];
    i++, j--;
  }
  return ans;
};

// Three test cases
console.log(dividePlayers([3,2,5,1,3,4])) // 22
console.log(dividePlayers([3,4])) // 12
console.log(dividePlayers([1,1,2,3])) // -1