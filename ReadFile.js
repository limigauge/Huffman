'use strict';

/*
*   CLASS   : ReadFile.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Performs most of the actions on the file, such as extracting the characters and building a tree with the information.
 */

let Dictionary = require('./Dictionary.js');
let HuffmanTree = require('./HuffmanTree.js');
let TreeNode = require('./TreeNode.js');
let StringHash = require('./StringHash.js');
let LinkedList = require('./LinkedList.js');

class ReadFile {


    constructor(contents){
        let arraySize = 1200000;
        let dictionarySize = 100000;

        this._file = contents;
        this._charCount = new Array(arraySize); //holding number of times a character appears
        this._frequencyCount = new Dictionary(dictionarySize); //holding value that is the freq for each character

        //initialize array with objects that have a char, a count of frequencies and a hashKey
        for(let i = 0; i < this._charCount.length; i++){
            let item = {char: -1, freq: 0, hashKey: -2};

            this._charCount[i] = item; //initialize all to 0
        }
    }

    /*
* buildTree()
*
* PURPOSE : Called by main to build a tree using the fields of this class (information from the input file). Calls other methods in this class in a specific order.

* Returns : A HuffmanTree made from the data in this ReadFile class.
*/

    buildTree(){
        this.storeCounts();
        this.calculateFrequencies();
        let set = this.createTreeSet();

        //merging trees
        let result = this.joinTrees(set).data;

        return result;
    }

    /*
* createTreeSet
*
* PURPOSE : Create a LinkedList of HuffmanTrees that are just one leaf node based on the characters in the file (1 per character)

* Returns : The linked list set of HuffmanTrees
*/
    createTreeSet(){
        let set = new LinkedList();

        for(let i = 0; i < this._charCount.length; i++){
            if(this._charCount[i] !== undefined && this._charCount[i].freq !== 0){
                let freq = this._frequencyCount.get(this._charCount[i].hashKey);
                let root = new TreeNode(this._charCount[i].char);

                let tree = new HuffmanTree(root, freq);

                set.insert(tree, -1); //key field in node doesn't matter

            }
        }
        return set;
    }

    /*
* joinTrees(set)
*
* PURPOSE : Takes a LinkedList set of HuffmanTrees and joins them from the smallest up. Continues to join until there is only one element in the LinkedList
* PARAMETERS:
*   LinkedList set - Linked List that stores the Huffman Trees.
*
* Returns : The one element left in the linked list which is the Node containing the completed tree.
*/

    joinTrees(set){
        //two smallest
        let smallest;
        let smallest2;
        let curr;

        while(set.top.next != null){ //while there's still more than one item in the list
            curr = set.top;

            //get first smallest
            smallest = curr;
            while (curr != null) {
                if (curr.data.compareTo(smallest.data) < 0) {
                    smallest = curr;
                }
                curr = curr.next;
            }

            curr = set.top;

            //initialize curr again, making sure it's not the same as the smallest
            if (smallest === curr) {
                smallest2 = curr.next;
            } else {
                smallest2 = curr;
            }

            //get 2nd smallest
            while(curr != null) {
                if ((curr.data).compareTo(smallest2.data) < 0 && smallest !== curr) { //can't be the same as smallest
                    smallest2 = curr;
                }
                curr = curr.next;
            }

            //got 2 smallest trees
            smallest.data.combine(smallest2.data); //combines two trees and combined tree is stored in the Tree that called the method (smallest)
            set.insert(smallest.data); //insert new node with combined tree as data

            //remove old nodes of trees from linked list
            set.remove(smallest);
            set.remove(smallest2);

        }
        return set.top; //top is the final tree in the LL

    }

    /*
* CalculateFrequencies()
*
* PURPOSE : Takes the array that counts the occurrences and calculates then stores the frequencies of each character into the Dictionary field in class
*           (fills the frequencyCount field)
*/

    calculateFrequencies(){

        for(let i = 0; i < this._charCount.length; i++){
            //go through the array that stores the number of appearances of each char

            if(this._charCount[i] !== undefined && this._charCount[i].freq !== 0){ //if non-empty array slot
                let freq = this._charCount[i].freq/this._file.length; //calculate frequency
                let key = new StringHash(this._charCount[i].char);  //get hash key based on the char

                this._charCount[i].hashKey = key;

                this._frequencyCount.put(key, freq); //puts frequency at the location of key being the char
            }
        }

    }

    /*
* storeCounts()
*
* PURPOSE : Adds up each appearance of each character in the input file. (Fills the charCount field)
*/

    storeCounts(){

        for(let i = 0; i < this._file.length; i++){

            this._charCount[this._file.charAt(i).charCodeAt(0)].freq++; //add one to frequency counter
            this._charCount[this._file.charAt(i).charCodeAt(0)].char = this._file.charAt(i); //key is char
        }
    }
}

module.exports = ReadFile;