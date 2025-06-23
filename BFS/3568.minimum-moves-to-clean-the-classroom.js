// 3568. Minimum Moves to Clean the Classroom
// You are given an m x n grid classroom where a student volunteer is tasked with cleaning up litter scattered around the room. Each cell in the grid is one of the following:
  // 'S': Starting position of the student
  // 'L': Litter that must be collected (once collected, the cell becomes empty)
  // 'R': Reset area that restores the student's energy to full capacity, regardless of their current energy level (can be used multiple times)
  // 'X': Obstacle the student cannot pass through
  // '.': Empty space
// You are also given an integer energy, representing the student's maximum energy capacity. The student starts with this energy from the starting position 'S'.
// Each move to an adjacent cell (up, down, left, or right) costs 1 unit of energy. If the energy reaches 0, the student can only continue if they are on a reset area 'R', which resets the energy to its maximum capacity energy.
// Return the minimum number of moves required to collect all litter items, or -1 if it's impossible.


// Solution: BFS

// There is at most 10 litter cells, we can use a bitmask to keep track of which cells we've visited.
// Keep track of each (i, j, litterMask, energy), where
  // i = the current row
  // j = the current column
  // litterMask = bitmask of which litter cells we've visited
  // energy = amount of energy we have left

// Use a hashmap to store the maximum energy for the state (i, j, litterMask).
// If we come across (i, j, litterMask) with a lower or equal energy, we stop there because we are doing a level-by-level BFS,
// hence with the same or greater number of moves, there is no reason to pursue this path.

// Return the number of moves when the litter mask is full.

// m = number of rows, n = number of columns, k = number of litter cells
// Time Complexity: O(mnk * energy) 2685ms
// Space Complexity: O(mnk * energy) 107MB
  // Due to the pruning, the time and space complexity is better than O(mnk * energy).
function minMoves(classroom, energy) {
  const m = classroom.length, n = classroom[0].length;
  let queue = [], litterCount = 0;
  const maxEnergy = {}, litterMap = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (classroom[i][j] === 'S') {
        queue.push([i, j, energy, 0]);
        maxEnergy[`${i},${j},${0}`] = energy;
      } else if (classroom[i][j] === 'L') {
        litterMap[`${i},${j}`] = litterCount++;
      }
    }
  }
  let moves = 0;
  const fullLitterMask = (1 << litterCount) - 1;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  while (queue.length) {
    const next = [];
    while (queue.length) {
      const [row, col, energyLeft, litterMask] = queue.pop();
      if (litterMask === fullLitterMask) return moves;
      if (energyLeft === 0) continue;
      for (let [x, y] of directions) {
        const newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
        const newEnergy = classroom[newRow][newCol] === 'R' ? energy : energyLeft - 1;
        const newLitterMask = classroom[newRow][newCol] === 'L' ? litterMask | (1 << litterMap[`${newRow},${newCol}`]) : litterMask;
        const newKey = `${newRow},${newCol},${newLitterMask}`;
        if (maxEnergy[newKey] >= newEnergy || classroom[newRow][newCol] === 'X') continue;
        maxEnergy[newKey] = newEnergy;
        next.push([newRow, newCol, newEnergy, newLitterMask]);
      }
    }
    queue = next;
    moves++;
  }
  return -1;
};

// Two test cases
console.log(minMoves(["S.", "XL"], 2)) // 2
console.log(minMoves(["LS", "RL"], 4)) // 3