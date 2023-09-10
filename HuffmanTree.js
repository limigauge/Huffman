'use strict';

/*
*   CLASS   : HuffmanTree.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Class for Huffman Trees. Has fields for the root node of the tree and the weight of the tree. Is able to do actions such as
*             combine, compare, and traverse/generate Huffman Encodings.
 */

let TreeNode = require('./TreeNode.js');
let fs = require("fs");

class HuffmanTree{

    constructor(node, weight) {
        this._characters = new Array(); //stores the chars in the tree (for easy identification of the smallest char)
        this._weight = weight;
        this._root = node;

        this._characters[0] = node.data;
    }

    /*
* combine(other_
*
* PURPOSE : Takes in another Tree and combines it with this one based on comparison criteria
* PARAMETERS:
*  HuffmanTree other - Other tree to combine to.
*
*/

    combine(other){
        let newRoot;

        //two ways to create the tree based on the weights
        if(this.compareTo(other) !== 1){
            newRoot = new TreeNode(this._root, other.root );
        } else {
            newRoot = new TreeNode(other.root, this._root );
        }

        //turn this tree into the newly combined tree.
        this._root = newRoot;
        this._weight = this._weight + other.weight;
        this.addChars(other.charArray); //combines the arrays of stored chars.
    }

    /*
* compareTo
*
* PURPOSE : Compares this tree with the Tree in the parameter. Returns 1 if this tree has a higher weight than the parameter tree, -1 if lower, and 0 if same
* PARAMETERS:
*   HuffmanTree other - other tree to compare to
*
* Returns : value 1, -1, or 0 based on comparison results.
*/

    compareTo(other){
        let out;
        if(this._weight < other.weight){
            out = -1;
        } else if (this._weight > other.weight){
            out = 1;
        } else {
            let char1 = this.getSmallestChar(); //this tree's smallest char
            let char2 = other.getSmallestChar();  // other tree's smallest char

            if(char1 > char2){
                out = 1;
            } else if (char2 > char1){
                out = -1;
            } else {
                out = 0;
            }
        }

        return out;
    }

    /*
* search(char, file)
*
* PURPOSE : Helper that calls the recursive search method in the TreeNode class. Starts the process of finding a char in the tree and writing the encoding.
* PARAMETERS:
*   char char - character we are searching for.
*   String file - file name of the original text file (will append .huff to the end of this name)
*/

    search(char, file){
        if(this._root != null){
            this._root.search(char, "", file); //starts with an empty string that we will add 0 and 1 to as recursion goes.
        }
    }

    /*
* addChars(array)
*
* PURPOSE : adds the characters in array to the characters array in this current Tree
* PARAMETERS:
*   Array array - array of chars from another tree.
*
*/

    addChars(array){
        let count = this._characters.length;

        for(let i = 0; i < array.length; i++){
            this._characters[count] = array[i];
            count++;
        }
    }

    /*
* getSmallestChar()
*
* PURPOSE : get the smallest char in this Tree's array of saved chars (chars in the tree). Used to break ties when comparing weights.

* Returns : The char that is the smallest in this Tree.
*/

    getSmallestChar(){
        let smallest = 0; //smallest index

        for(let i = 1; i < this._characters.length; i++){
            if(this._characters[smallest] > this._characters[i]){
                smallest = i;
            }
        }
        return this._characters[smallest];
    }

    //getters:

    get weight(){
        return this._weight;
    }

    get root(){
        return this._root;
    }

    get charArray(){
        return this._characters;
    }

}

module.exports = HuffmanTree;