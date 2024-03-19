// 1912. Design Movie Rental System
// You have a movie renting company consisting of n shops. You want to implement a renting system that supports searching for, booking, and returning movies. The system should also support generating a report of the currently rented movies.
// Each movie is given as a 2D integer array entries where entries[i] = [shop[i], movie[i], price[i]] indicates that there is a copy of movie movie[i] at shop shop[i] with a rental price of price[i]. Each shop carries at most one copy of a movie movie[i].
// The system should support the following functions:
  // Search: Finds the cheapest 5 shops that have an unrented copy of a given movie. The shops should be sorted by price in ascending order, and in case of a tie, the one with the smaller shop[i] should appear first. If there are less than 5 matching shops, then all of them should be returned. If no shop has an unrented copy, then an empty list should be returned.
  // Rent: Rents an unrented copy of a given movie from a given shop.
  // Drop: Drops off a previously rented copy of a given movie at a given shop.
  // Report: Returns the cheapest 5 rented movies (possibly of the same movie ID) as a 2D list res where res[j] = [shop[j], movie[j]] describes that the jth cheapest rented movie movie[j] was rented from the shop shop[j]. The movies in res should be sorted by price in ascending order, and in case of a tie, the one with the smaller shop[j] should appear first, and if there is still tie, the one with the smaller movie[j] should appear first. If there are fewer than 5 rented movies, then all of them should be returned. If no movies are currently being rented, then an empty list should be returned.
// Implement the MovieRentingSystem class:
  // MovieRentingSystem(int n, int[][] entries) Initializes the MovieRentingSystem object with n shops and the movies in entries.
  // List<Integer> search(int movie) Returns a list of shops that have an unrented copy of the given movie as described above.
  // void rent(int shop, int movie) Rents the given movie from the given shop.
  // void drop(int shop, int movie) Drops off a previously rented movie at the given shop.
  // List<List<Integer>> report() Returns a list of cheapest rented movies as described above.
// Note: The test cases will be generated such that rent will only be called if the shop has an unrented copy of the movie, and drop will only be called if the shop had previously rented out the movie.


// Solution: Hashmap of AVL Trees

// For each specific movie, use two AVL trees to store unrented and rented movie prices and shops.
// For the cheapest 5 rented movies, use another AVL tree to store all the rented movies, sorted by cheapest price.

// search(movie):
  // In the unrented AVL tree for the movie, find the top 5 elements in the tree.
  
// rent(shop, movie):
  // Remove the element with the matching shop from the unrented AVL tree for the specific movie.
  // Add the removed element to the rented AVL tree for the specific movie.
  // Add the removed element to the rented AVL tree for ALL movies.

// drop(shop, movie):
  // Remove the element with matching shop from the rented AVL tree for the specific movie.
  // Remove the element with matching shop and movie from the rented AVL tree for ALL movies.
  // Add the element to the unrented AVL tree for the specific movie.

// report():
  // Return the top 5 elements from the rented AVL tree for ALL movies.

// search, rent, drop, and report will all have O(log(n)) time complexity, where n is the number of copies of the movie. 

// k = max number of copies of a movie, n = total number of movies
// Time Complexity: 1193ms
  // search: O(log(k))
  // rent, drop, report: O(log(n))
// Space Complexity: O(n) 110.4MB
var MovieRentingSystem = function(n, entries) {
  this.movies = {};
  this.rentedMovies = new AVLTree((a, b) => {
    // a = {shop, price, movie}, b = {val: {shop, price, movie}}
    if (a.price !== b.val.price) return a.price - b.val.price;
    if (a.shop !== b.val.shop) return a.shop - b.val.shop;
    return a.movie - b.val.movie;
  });

  for (let [shop, movie, price] of entries) {
    if (!this.movies[movie]) {
      this.movies[movie] = { 
        unrented: new AVLTree((a, b) => {
          // a = {shop, price}, b = {val: {shop, price}}
          if (a.price !== b.val.price) return a.price - b.val.price;
          return a.shop - b.val.shop;
        }), 
        rented: new AVLTree((a, b) => {
          // a = {shop, price}, b = {val: {shop, price}}
          if (a.price !== b.val.price) return a.price - b.val.price;
          return a.shop - b.val.shop;
        }),
        prices: {}
      };
    }
    this.movies[movie].unrented.insert({shop, price});
    this.movies[movie].prices[shop] = price;
  }
};

// In the unrented AVL tree for the movie, find the top 5 elements in the tree.
MovieRentingSystem.prototype.search = function(movie) {
  if (!this.movies[movie]) return [];
  let unrented = this.movies[movie].unrented;
  let cheapestShops = [];
  for (let i = 0; i < Math.min(5, unrented._getSize()); i++) {
    cheapestShops.push(unrented.getKthSmallest(i + 1).val.shop);
  }
  return cheapestShops;
};

// Remove the element with the matching shop from the unrented AVL tree for the specific movie.
// Add the removed element to the rented AVL tree for the specific movie.
// Add the removed element to the rented AVL tree for ALL movies.
MovieRentingSystem.prototype.rent = function(shop, movie) {
  let { unrented, rented, prices } = this.movies[movie];
  let price = prices[shop];
  let element = { shop, price };
  unrented.remove(element);
  rented.insert(element);
  this.rentedMovies.insert({ shop, price, movie });
};

// Remove the element with matching shop from the rented AVL tree for the specific movie.
// Remove the element with matching shop and movie from the rented AVL tree for ALL movies.
// Add the element to the unrented AVL tree for the specific movie.
MovieRentingSystem.prototype.drop = function(shop, movie) {
  let { unrented, rented, prices } = this.movies[movie];
  let price = prices[shop];
  let element = { shop, price };
  rented.remove(element);
  this.rentedMovies.remove({ shop, price, movie });
  unrented.insert(element);
};

// Return the top 5 elements from the rented AVL tree for ALL movies.
MovieRentingSystem.prototype.report = function() {
  let cheapestRented = [];
  for (let i = 0; i < Math.min(5, this.rentedMovies._getSize()); i++) {
    let { shop, movie } = this.rentedMovies.getKthSmallest(i + 1).val;
    cheapestRented.push([shop, movie]);
  }  
  return cheapestRented;
};

class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor(comparator = (a, b) => a - b.val) {
    this.root = null;
    this.comparator = comparator;
  }
  search(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult === 0) return node;
    if (comparedResult < 0) {
      return this.search(val, node.left);
    } else {
      return this.search(val, node.right);
    }
  }
  insert(val) {
    return this.root = this._insert(val, this.root);
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);

    const comparedResult = this.comparator(val, node);
    if (comparedResult < 0) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of `val`, pass in the reference of one occurance.
    // To delete all nodes with value `val`, remove the check for `nodeToRemove` in _remove.
    const nodeToRemove = this.search(val, node);
    return this.root = this._remove(val, nodeToRemove, node);
  }
  // Four scenarios for deletion:
    // 1. node to delete has no children - just delete it
    // 2. node to delete only has a left child - replace it with the left child
    // 3. node to delete only has a right child - replace it with the right child
    // 4. node to delete has both left and right children - replace it with the next smallest node that is larger (use in order traversal to find the leftmost node in the right child)
  _remove(val, nodeToRemove, node) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult < 0) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (comparedResult > 0) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (comparedResult === 0 && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(leftmostNode.val, this.search(leftmostNode.val, node.right), node.right);
    } else {
      return node;
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

    return this._rebalance(node);
  }
  getKthLargest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let rightSize = node.right?.size ?? 0;
      if (k === rightSize + 1) return node;
      if (rightSize >= k) {
        node = node.right;
      } else {
        k -= rightSize + 1;
        node = node.left;
      }
    }
    return null;
  }
  getKthSmallest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let leftSize = node.left?.size ?? 0;
      if (k === leftSize + 1) return node;
      if (leftSize >= k) {
        node = node.left;
      } else {
        k -= leftSize + 1;
        node = node.right;
      }
    }
    return null;
  }
  lowerBound(val, node = this.root) { // find leftmost node, where the value >= val, or comparator result >= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult <= 0) {
      const res = this.lowerBound(val, node.left);
      return res ? res : node;
    } else {
      return this.lowerBound(val, node.right);
    }
  }
  upperBound(val, node = this.root) { // find rightmost node, where the value <= val, or comparator result <= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult >= 0) {
      const res = this.upperBound(val, node.right);
      return res ? res : node;
    } else {
      return this.upperBound(val, node.left);
    }
  }
  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }
  _getSize(node = this.root) {
    return node ? node.size : 0;
  }
  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }
  _leftRotation(node) { 
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height = 1 + Math.max(this._getHeight(rightNode.left), this._getHeight(rightNode.right));

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    rightNode.size = 1 + this._getSize(rightNode.left) + this._getSize(rightNode.right);

    return rightNode; // right node is the new root
  }
  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height = 1 + Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    leftNode.size = 1 + this._getSize(leftNode.left) + this._getSize(leftNode.right);

    return leftNode; // left node is the new root
  }
  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) { // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) { // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) { // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) { // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}

// A few test cases
let movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
console.log(movieRentingSystem.search(1));  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
console.log(movieRentingSystem.report());   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
console.log(movieRentingSystem.search(2));  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.