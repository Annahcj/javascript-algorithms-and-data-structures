// 1311. Get Watched Videos by Your Friends
// There are n people, each person has a unique id between 0 and n-1. Given the arrays watchedVideos and friends, where watchedVideos[i] and friends[i] contain the list of watched videos and the list of friends respectively for the person with id = i.
// Level 1 of videos are all watched videos by your friends, level 2 of videos are all watched videos by the friends of your friends and so on. In general, the level k of videos are all watched videos by people with the shortest path exactly equal to k with you. Given your id and the level of videos, return the list of videos ordered by their frequencies (increasing). For videos with the same frequency order them alphabetically from least to greatest. 


// Solution: Level-by-level BFS

// Notes: 
  // watchedVideos[i] = videos watched by the ith friend
  // friends[i] = friends of the ith friend

// 1. BFS from friends[id] to get the friends at the kth level.
  // Keep track of visited nodes to avoid revisiting nodes.
// 2. Get the frequencies of each video watched by each friend at the kth level. Store them in a hashmap.
// 3. Retrieve the frequencies [video, frequency] into an array.
// 4. Sort the array by frequency, then by video. Return the sorted videos.

// V = number of friends and videos, E = total number of edges in friends and watchedVideos
// Time Complexity: O(V + E) 325ms
// Space Complexity: O(V) 57.2MB
var watchedVideosByFriends = function(watchedVideos, friends, id, level) {
  let n = friends.length, seen = Array(n).fill(0);
  let queue = [[id]], depth = 0;
  seen[id] = 1;
  while (queue.length && depth < level) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      for (let nei of friends[node]) {
        if (seen[nei]) continue;
        queue.push(nei);
        seen[nei] = 1;
      }
    }
    depth++;
  }
  
  let freq = {};
  for (let friend of queue) {
    for (let video of watchedVideos[friend]) {
      freq[video] = (freq[video] || 0) + 1;
    }
  }
  
  let videos = [];
  for (let video in freq) {
    videos.push([video, freq[video]]);
  }
  return videos.sort((a, b) => {
    if (a[1] === b[1]) return a[0].localeCompare(b[0]);
    return a[1] - b[1];
  }).map(([video]) => video);
};

// Two test cases 
console.log(watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]], [[1,2],[0,3],[0,3],[1,2]], 0, 1)) // ["B","C"]
console.log(watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]], [[1,2],[0,3],[0,3],[1,2]], 0, 2)) // ["D"]