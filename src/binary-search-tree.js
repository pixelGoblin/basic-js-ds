const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {

      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      let minRight = this._findMin(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (this._root === null) {
      return null;
    }

    return this._findMin(this._root).data;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    let currentNode = this._root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};