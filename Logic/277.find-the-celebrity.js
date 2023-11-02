// 277. Find the Celebrity
// Suppose you are at a party with n people labeled from 0 to n - 1 and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know the celebrity, but the celebrity does not know any of them.
// Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).
// You are given a helper function bool knows(a, b) that tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if they are at the party.
// Return the celebrity's label if there is a celebrity at the party. If there is no celebrity, return -1.


// Solution: Two pass

// We can find the celebrity in one loop.
// If a knows b, that means b can be a celebrity, but a cannot be a celebrity. Take b as the celebrity and move on to the next person:
  // each time a knows b, we take b and move on until we have reached the end.
// Then, we need to confirm whether or not the person is a celebrity by testing against everyone. If one condition is not met, return -1.

// The steps:
// 1. Find the possible celebrity
// 2. Verify the celebrity:
  // Everybody knows the celebrity
  // The celebrity knows no one

// Time Complexity: O(n) 139ms
// Space Complexity: O(1) 44.5MB
var solution = function(knows) {
  return function(n) {
    let person = 0;
     for (let i = 1; i < n; i++) {
       if (knows(person, i)) person = i;
     } 
    // check whether person knows everybody 
    // check whether everybody knows person
    for (let i = 0; i < n; i++) {
      if (i === person) continue;
      if (knows(person, i) || !knows(i, person)) return -1;
    }
    return person;
  };
};