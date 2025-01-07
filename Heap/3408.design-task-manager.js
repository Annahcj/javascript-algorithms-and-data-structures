// 3408. Design Task Manager
// There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.
// Implement the TaskManager class:
  // TaskManager(vector<vector<int>>& tasks) initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form [userId, taskId, priority], which adds a task to the specified user with the given priority.
  // void add(int userId, int taskId, int priority) adds a task with the specified taskId and priority to the user with userId. It is guaranteed that taskId does not exist in the system.
  // void edit(int taskId, int newPriority) updates the priority of the existing taskId to newPriority. It is guaranteed that taskId exists in the system.
  // void rmv(int taskId) removes the task identified by taskId from the system. It is guaranteed that taskId exists in the system.
  // int execTop() executes the task with the highest priority across all users. If there are multiple tasks with the same highest priority, execute the one with the highest taskId. After executing, the taskId is removed from the system. Return the userId associated with the executed task. If no tasks are available, return -1.
// Note that a user may be assigned multiple tasks.


// Solution: Heap w/ Lazy Removal

// Use a heap to store the tasks.
// Use a hashmap to store the latest reference to each task by taskId.

// When editing a task, add a new task into the heap and don't bother removing the old one. Only update the latest reference by taskId.
// When removing a task, simply set the reference of that taskId to null.
// To find the task with the highest priority, remove all tasks that are not the latest (has been removed).
// The time complexity of execTop is O(n) across all calls because we process each task at most twice.

// Time Complexity: 505ms
  // constructor: O(n log(n))
  // add: O(log(n))
  // edit: O(log(n))
  // rmv: O(1)
  // execTop: O(n log(n)) over all calls
// Space Complexity: O(n) 115.50MB
var TaskManager = function(tasks) {
  this.heap = new Heap((a, b) => a.priority === b.priority ? b.taskId - a.taskId : b.priority - a.priority);
  this.latestTask = {};
  for (let [userId, taskId, priority] of tasks) {
    const task = { userId, taskId, priority };
    this.heap.add(task);
    this.latestTask[taskId] = task;
  }
};

TaskManager.prototype.add = function(userId, taskId, priority) {
  const task = { userId, taskId, priority };
  this.heap.add(task);
  this.latestTask[taskId] = task;
};

TaskManager.prototype.edit = function(taskId, newPriority) {
  const task = this.latestTask[taskId];
  const newTask = { ...task, priority: newPriority };
  this.heap.add(newTask);
  this.latestTask[taskId] = newTask;
};

TaskManager.prototype.rmv = function(taskId) {
  this.latestTask[taskId] = null;
};

TaskManager.prototype.execTop = function() {
  while (!this.heap.isEmpty() && this.heap.top() !== this.latestTask[this.heap.top().taskId]) {
    this.heap.remove();
  } 
  if (this.heap.isEmpty()) {
    return -1;
  }
  const { userId } = this.heap.remove();
  return userId;
};

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