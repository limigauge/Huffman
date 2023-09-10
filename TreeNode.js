'use strict';

/*
*   CLASS   : TreeNode.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Node for a Huffman Tree. Holds data (should be a char for this use) and has left and right nodes as fields.
 */

let fs = require('fs');

class TreeNode{

    constructor() {
        //data is a char
        if (arguments.length === 1) { //leaf node
            this._data = arguments[0];
            this._left = null;
            this._right = null;
        } else if (arguments.length === 2) { //connecting node
            this._data = null;
            this._left = arguments[0];
            this._right = arguments[1];
        }
    }

    /*
    * search
    *
    * PURPOSE : recursive method to create the encoding for a character in the tree. Traverses its left and right nodes, adding 1s or 0s until the character is found.
    * PARAMETERS :
    *   char key - char that we are looking for
    *   String string - current binary string built so far (each call adds to this)
    *   String file - name of the file to write to at the end
    *
    * Returns : No return, but will write to the file once character is found.
     */

    search(key, string, file){
        //key and current length of the string to make

        //two possible cases: we add 1 or we add 0 to the end of the current binary String.
        let string1 = string;
        let string2 = string;

        if(key !== this._data && this._left != null && this._right != null){

            //do calls with both left and right nodes using the two case strings we declared
            string1 += "0";
            this._left.search(key, string1, file);
            string2 += "1";
            this._right.search(key, string2, file);

        } else if (key == this._data) {
            //this is the desired node: write the character's encoding
            string = string + " ";
            fs.appendFileSync(file + ".huff", string);

        }
    }

    //getter

    get data(){
        return this._data;
    }

}

module.exports = TreeNode;