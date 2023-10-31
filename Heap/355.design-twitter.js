// 355. Design Twitter
// Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.
// Implement the Twitter class:
  // Twitter() Initializes your twitter object.
  // void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
  // List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
  // void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
  // void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.


// Solution: Hashmap, Linked List, Heap

// We only need to keep 10 most recent tweets for each user.
// Keep them in a linked list so that we can efficiently remove the oldest tweet when we exceed 10 tweets.

// getNewsFeed:
  // Get the tweets for the user and users they are following.
  // Maintain a heap of size 10 for the tweets, ordered by time from oldest to newest.
  // When the heap size exceeds 10, remove the oldest tweet from the heap.

// n = number of users, m = number of tweets
// Time Complexity: 83ms
  // postTweet: O(1)
  // getNewsFeed: O(n * 10) (worst case)
  // follow: O(1)
  // unfollow: O(1)
// Space Complexity: O(n + m) 41.4MB
  // getNewsFeed: O(1) (heap only keeps at most 10 tweets)

var Twitter = function() {
  this.followMap = new Map(); // {user: hashset of people user is following}
  this.tweets = new Map(); // {user: linked list of tweets}
  this.time = 0; 
};

Twitter.prototype.postTweet = function(userId, tweetId) {
  if (!this.tweets.has(userId)) {
    this.tweets.set(userId, new LinkedList());
  }
  let tweetsList = this.tweets.get(userId);
  tweetsList.addTail([tweetId, this.time]);
  if (tweetsList.size > 10) tweetsList.removeHead(); // remove oldest tweet when linked list has more than 10 tweets
  this.time++;
};

Twitter.prototype.getNewsFeed = function(userId) {
  let heap = new Heap((a, b) => a[1] - b[1]); // sort by time
  let userTweets = this.tweets.get(userId)?.head.next;
  while (userTweets) { 
    heap.add(userTweets.val); // add user's tweets
    if (heap.size > 10) heap.remove(); // remove oldest tweet from heap once exceeding 10 tweets
    userTweets = userTweets.next;
  }
  
  let following = this.followMap.get(userId) || [];
  for (let user of following) {
    let tweets = this.tweets.get(user)?.head.next;
    while (tweets) {
      heap.add(tweets.val); // add tweets of people the user is following
      if (heap.size > 10) heap.remove();
      tweets = tweets.next;
    }
  }

  let newsFeed = heap.values.sort((a, b) => b[1] - a[1]).map(([tweetId]) => tweetId); // sort by time and extract tweetId
  return newsFeed;
};

Twitter.prototype.follow = function(followerId, followeeId) {
  if (!this.followMap.has(followerId)) {
    this.followMap.set(followerId, new Set());
  }  
  this.followMap.get(followerId).add(followeeId);
};

Twitter.prototype.unfollow = function(followerId, followeeId) {
  this.followMap.get(followerId)?.delete(followeeId);  
};

// Linked List
class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head;
    this.size = 0;
  }
  addTail(val) { // push
    let newNode = new Node(val);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }
  removeHead() { // shift
    if (this.size === 0) return -1;
    let head = this.head.next;
    this.head.next = this.head.next.next;
    if (head === this.tail) {
      this.tail = this.head;
    }
    this.size--;
    return head.val;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Priority Queue
class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// A few test cases
let twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.