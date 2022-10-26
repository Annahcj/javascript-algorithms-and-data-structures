// 1733. Minimum Number of People to Teach
// On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.
// You are given an integer n, an array languages, and an array friendships where:
  // There are n languages numbered 1 through n,
  // languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
  // friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and vi.
// You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.
// Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.


// Solution 1: Brute Force

// Friends who share a common language don't need to learn any language. 
// Filter these friendships out so we don't unnecessarily go through them again. 

// For every language i, 
  // Since the remaining friendships have no common language, that means both friends need to know language i.
  // Get users who don't know language i.
  // Store them in a set since we may end up counting a user more than once.
// Record the minimum size of the set out of all of the languages.

// n = number of languages, m = number of friendships
// Time Complexity: O(n * m * n) 276ms
// Space Complexity: O(n) 55.5MB
var minimumTeachings = function(n, languages, friendships) {
  let ans = Infinity;
  friendships = friendships.filter(([u, v]) => !sharesCommonLanguage(languages, u, v));
  for (let i = 1; i <= n; i++) {
    let usersToTeach = new Set();
    for (let [u, v] of friendships) {
      if (!languages[u - 1].includes(i)) usersToTeach.add(u);
      if (!languages[v - 1].includes(i)) usersToTeach.add(v);
    }
    ans = Math.min(ans, usersToTeach.size);
  }  
  return ans;
};

function sharesCommonLanguage(languages, u, v) {
  let vLanguages = new Set(languages[v - 1]);
  for (let language of languages[u - 1]) {
    if (vLanguages.has(language)) return true;
  }
  return false;
}

// Solution 2: Count Known Languages

// For users who need to learn a new language to communicate with a friend,
// keep track of the counts of languages these users already know.

// The number of users who need to learn language i = users to teach - count[i]. 

// 1. Get users who need to learn a new language to communicate with a friend
// 2. Get the count for each language, where count[i] = the number of users (who need to learn a new language) who already know language i.
// 3. Get the minimum (usersToTeach.size - count[language]).

// n = number of languages, m = number of users, k = number of friendships
// Time Complexity: O(kn + mn) 150ms
// Space Complexity: O(n + k) 54.2MB
var minimumTeachings = function(n, languages, friendships) {
  let usersToTeach = new Set();
  for (let [u, v] of friendships) {
    if (sharesCommonLanguage(languages, u, v)) continue;
    usersToTeach.add(u);
    usersToTeach.add(v);
  }
  
  let count = Array(n + 1).fill(0);
  for (let user of usersToTeach) {
    for (let language of languages[user - 1]) {
      count[language]++;
    }
  }
  
  let ans = Infinity;
  for (let i = 1; i <= n; i++) {
    ans = Math.min(ans, usersToTeach.size - count[i]);
  }
  return ans;
};

// Two test cases
console.log(minimumTeachings(2, [[1],[2],[1,2]], [[1,2],[1,3],[2,3]])) // 1
console.log(minimumTeachings(3, [[2],[1,3],[1,2],[3]], [[1,4],[1,2],[3,4],[2,3]])) // 2