// 2456. Most Popular Video Creator
// You are given two string arrays creators and ids, and an integer array views, all of length n. The ith video on a platform was created by creator[i], has an id of ids[i], and has views[i] views.
// The popularity of a creator is the sum of the number of views on all of the creator's videos. Find the creator with the highest popularity and the id of their most viewed video.
  // If multiple creators have the highest popularity, find all of them.
  // If multiple videos have the highest view count for a creator, find the lexicographically smallest id.
// Return a 2D array of strings answer where answer[i] = [creatori, idi] means that creatori has the highest popularity and idi is the id of their most popular video. The answer can be returned in any order.


// Solution: Hashmap

// In a hashmap, store the following for each person:
  // 1. The sum of views
  // 2. The id of the video with maximum views
  // 3. The maximum number of views

// Then, go through each person and record the highest number of views and the people with the maximum views.

// Time Complexity: O(n) 725ms
// Space Complexity: O(n) 144.6MB
var mostPopularCreator = function(creators, ids, views) {
  let n = creators.length, map = {}; // { creator: [sum of views, maxId, maxViews] }
  for (let i = 0; i < n; i++) {
    let creator = creators[i];
    if (!map[creator]) map[creator] = [views[i], ids[i], views[i]];
    else {
      map[creator][0] += views[i];
      let [_, maxId, maxViews] = map[creator];
      if (views[i] > maxViews) {
        map[creator][2] = views[i];
        map[creator][1] = ids[i];
      } else if (views[i] === maxViews) {
        map[creator][1] = ids[i] < maxId ? ids[i] : maxId;
      }
    }
  }  
  let bestCreators = [], maxViews = 0;
  for (let creator in map) {
    let totalViews = map[creator][0];
    if (totalViews > maxViews) {
      maxViews = totalViews;
      bestCreators = [[creator, map[creator][1]]];
    } else if (totalViews === maxViews) {
      bestCreators.push([creator, map[creator][1]]);
    }
  }
  return bestCreators;
};

// Two test cases
console.log(mostPopularCreator(["alice","bob","alice","chris"], ["one","two","three","four"], [5,10,5,4])) // [["alice","one"],["bob","two"]]
console.log(mostPopularCreator(["alice","alice","alice"], ["a","b","c"], [1,2,2])) // [["alice","b"]]