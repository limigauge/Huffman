'use strict';
/*
*   CLASS   : Encode.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Takes in a file and its tree and creates a binary encoding based on the tree for the file.
 */

let fs = require("fs");

class Encode{

    constructor(tree, string, name){
        this._fileName = name;
        this._tree = tree;
        this._file = string; //string in file.
    }

    /*
* encode
*
* PURPOSE : Calls the tree's search method to start writing the Huffman Encoding to a new file. No parameters or returns because it takes its own fields
*           and writes to a file.
 */

    encode(){
        fs.writeFileSync(this._fileName + ".huff", "");

        for(let i = 0; i < this._file.length; i++){
            this._tree.search(this._file.charAt(i), this._fileName);
        }
        fs.appendFileSync(this._fileName + ".huff", "\n");

    }
}

module.exports = Encode;