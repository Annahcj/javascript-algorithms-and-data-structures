// 1700. Number of Students Unable to Eat Lunch
// The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.
// The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:
  // If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.
  // Otherwise, they will leave it and go to the queue's end.
// This continues until none of the queue students want to take the top sandwich and are thus unable to eat.
// You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.

 
// Solution 1: Simulation

// Move students to the back while the sandwich does not match their preference.
// Keep track of a running count of student preferences, updated when they take a sandwich.
// If there are no more students who prefer the top sandwich, then we must stop to avoid an infinite loop.

// Time Complexity: O(n^2) 53ms
// Space Complexity: O(1) 49.2MB
var countStudents = function(students, sandwiches) {
  let n = students.length, count = [0, 0];
  for (let i = 0; i < n; i++) {
    count[students[i]]++;
  }
  let haveEaten = 0;
  for (let i = 0; i < n; i++) {
    if (students[0] !== sandwiches[i] && count[sandwiches[i]] === 0) {
      return n - haveEaten;
    } 
    while (students[0] !== sandwiches[i]) {
      students.push(students.shift()); 
    }
    count[students.shift()]--;
    haveEaten++;
  }
  return 0;
};


// Solution 2: Counting

// Observe that we only need to keep track of the count of preferences.
// As long as there is a preference that matches the current sandwiches[i], we can rotate students until we reach the matching preference.
// We stop only when there are no students left for the preference.

// Time Complexity: O(n) 44ms
// Space Complexity: O(1) 48.9MB
var countStudents = function(students, sandwiches) {
  let n = students.length, count = [0, 0];
  for (let i = 0; i < n; i++) {
    count[students[i]]++;
  }
  for (let i = 0; i < n; i++) {
    if (count[sandwiches[i]] === 0) return n - i;
    count[sandwiches[i]]--;
  }
  return 0;
};

// Two test cases
console.log(countStudents([1,1,0,0], [0,1,0,1])) // 0
console.log(countStudents([1,1,1,0,0,1], [1,0,0,0,1,1])) // 3