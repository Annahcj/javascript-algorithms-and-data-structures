// 3680. Generate Schedule
// You are given an integer n representing n teams. You are asked to generate a schedule such that:
  // Each team plays every other team exactly twice: once at home and once away.
  // There is exactly one match per day; the schedule is a list of consecutive days and schedule[i] is the match on day i.
  // No team plays on consecutive days.
// Return a 2D integer array schedule, where schedule[i][0] represents the home team and schedule[i][1] represents the away team. If multiple schedules meet the conditions, return any one of them.
// If no schedule exists that meets the conditions, return an empty array.


// Solution: Randomization Algorithm

// Note: Because each team has exactly the same number of matches with the exact same teams (every team must verse every other team, twice),
// which match we take as the first match doesn't matter.
// It only matters when we start taking difference occurrances of matches, i.e. taking a match with a team that we've seen before 2x times.

// If n <= 4, it is not possible to generate a valid sequence.

// Try to build up a valid schedule by randomly shuffling the matches until we find a match.
// For each shuffled sequence of matches,
  // Iterate through the matches and find the first next valid match.
  // Repeat this until we build up the whole schedule.
  // If we reach the end and didn't succeed in building a valid schedule, randomly shuffle the matches and try again.

// It's guaranteed that for n >= 5, there is guaranteed to be a valid schedule,
// because increasing n makes it all the more possible to build a valid schedule.

// On average, n = 5 takes ~5 tries to find a valid sequence.
// n = 10 takes ~2 valid tries.
// n = 25 takes ~1.25 valid tries.
// n = 50 takes ~1.1 valid tries.

// This is based on zhz's solution.

// Time Complexity: O(number of tries * n^3) 21ms
// Space Complexity: O(n^2) 64MB
function generateSchedule(n) {
  if (n <= 4) {
    return [];
  }
  const matches = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      matches.push([i, j]);
      matches.push([j, i]);
    }
  }
  while (true) {
    const shuffled = shuffle(matches);
    const schedule = [];
    while (schedule.length < matches.length) {
      let found = false;
      for (let i = 0; i < shuffled.length; i++) {
        const [teamA, teamB] = shuffled[i];
        if (!schedule.length || (!schedule[schedule.length - 1].includes(teamA) && !schedule[schedule.length - 1].includes(teamB))) {
          schedule.push([teamA, teamB]);
          shuffled.splice(i, 1);
          found = true;
          break;
        }
      }
      if (!found) { // invalid sequence
        break;
      }
    }
    if (schedule.length === matches.length) {
      return schedule;
    }
  }
  return [];
};

function shuffle(arr) {
  const copy = [...arr];
  const n = copy.length;
  for (let i = 0; i < n; i++) {
    const randomIdx = Math.floor(Math.random() * (n - i) + i);
    [copy[i], copy[randomIdx]] = [copy[randomIdx], copy[i]];
  }
  return copy;
}

console.log(generateSchedule(3)) // []
console.log(generateSchedule(5))