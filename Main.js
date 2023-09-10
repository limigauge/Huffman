'use strict';

/*
*   NAME            : MICHELLE LI
*   STUDENT NUMBER  : 7866927
*   COURSE          : COMP 2150
*   INSTRUCTOR      : ALI NESHATI
*   ASSIGNMENT      : 4
*   QUESTION        : 1
*
*   REMARKS         : The program takes in a text file and uses it to build a Huffman tree with Huffman encoding. It then writes
*                     the encoding to a file with a .huff appended to the file name.
 */

let fs = require('fs');
let ReadFile = require('./ReadFile.js');
let Encode = require('./Encode.js');

function main(){

    let fileName;
    fileName = "input";
    //fileName = "hamlet.txt";

    let contents = fs.readFileSync(fileName, "utf-8");

    //parse contents into a tree
    let newFile = new ReadFile(contents);
    let tree = newFile.buildTree();

    //encode tree
    let code = new Encode(tree, contents, fileName);
    code.encode();

}


main();