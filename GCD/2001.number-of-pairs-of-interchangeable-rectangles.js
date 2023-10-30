// 2001. Number of Pairs of Interchangeable Rectangles
// You are given n rectangles represented by a 0-indexed 2D integer array rectangles, where rectangles[i] = [widthi, heighti] denotes the width and height of the ith rectangle.
// Two rectangles i and j (i < j) are considered interchangeable if they have the same width-to-height ratio. More formally, two rectangles are interchangeable if widthi/heighti == widthj/heightj (using decimal division, not integer division).
// Return the number of pairs of interchangeable rectangles in rectangles.


// Solution 1: Counting w/ Hashmap

// Store the count of each ratio (weight / height) in a hashmap.
// Count the number of pairs for each ratio (for every rectangle add ratioMap.get(ratio) to the total count).
// Note: This solution may cause inaccuracy due to floating point precision. 

// Time Complexity: O(n) 276ms
// Space Complexity: O(n) 78.1MB
var interchangeableRectangles = function(rectangles) {
  let ratioMap = new Map(), pairs = 0;
  for (let [weight, height] of rectangles) {
    let ratio = weight / height;
    let currCount = ratioMap.get(ratio) || 0;
    pairs += currCount;
    ratioMap.set(ratio, currCount + 1);
  }
  return pairs;
};

// Solution 2: GCD

// To overcome floating point inaccuracy, we can instead use the GCD of (weight, height) to simplify the fraction down to the smallest form.
// Then, store the count of each ratio (weight / gcd, height / gcd) in a hashmap and count the number of pairs.

// Time Complexity: O(n log(n)) 567ms
// Space Complexity: O(n) 112MB
var interchangeableRectangles = function(rectangles) {
  let ratioMap = new Map(), pairs = 0;
  for (let [weight, height] of rectangles) {
    let gcd = getGCD(weight, height);
    let fraction = `${weight / gcd},${height / gcd}`;
    let currCount = ratioMap.get(fraction) || 0;
    pairs += currCount;
    ratioMap.set(fraction, currCount + 1);
  }
  return pairs;
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// Two test cases
console.log(interchangeableRectangles([[4,8],[3,6],[10,20],[15,30]])) // 6
console.log(interchangeableRectangles([[4,5],[7,8]])) // 0