"use strict";

/*
*   CLASS   : Dictionary.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Implements a dictionary used to store frequencies for each character in the input file.
*             It is technically able to store any type of value, but it needs a Hashable type key to hash.
 */

let LinkedList = require('./LinkedList.js');

class Dictionary{

    constructor(size){
        this._size = size;
        this._table = new Array(size);
    }
 /*
* put(k,v)
*
* PURPOSE : Create or update an entry to the dictionary.
* PARAMETERS :
*   Hashable k - Hashable type key
*   v - the data/value you would like to store into this entry.
 */

    put(k, v){

        if('hashVal' in k && typeof(v) != "undefined"){

            let index = k.hashVal() % this._size; //get the hashVal and mod with the size of dictionary

            if(typeof(this._table[index]) !== "undefined"){

                //a linked list already exists at this location

                if(this.contains(k)){
                    //if key exists, change value
                    this._table[index].change(k, v);
                } else {
                    //add to linked list
                    this._table[index].insert(v,k);
                }

            } else {
                //create new linked list at this location
                this._table[index] = new LinkedList();
                this._table[index].insert(v, k)
            }

        } else {
            throw new Error("Unable to put new entry into dictionary.");
        }
    }

    /*
* get(k)
*
* PURPOSE : Get the value stored at Hashable key k.
* PARAMETERS :
*   Hashable k - key to find the item at.
*
* Returns : Item that was stored in the table using key k.
 */

    get(k){
        let out = undefined;

        if('hashVal' in k) {

            let index = k.hashVal() % this._size;

            let theNode = this._table[index].find(k); //checking linked list....

            if(typeof(theNode) != "undefined"){
                out = theNode.data;
            } //found node with the right key

        } else {
            throw new Error("Hash value invalid.");
        }

        return out;
    }

    /*
* contains(k)
*
* PURPOSE : Checks to see if dictionary already has an entry created with Hashable key k.
* PARAMETERS :
*   Hashable k - key of entry to check for.
*
* Returns : Boolean of if the dictionary contains such an entry.
 */
    contains(k){
        let out = false;

        if('hashVal' in k) {

            let index = k.hashVal() % this._size;

            if(typeof(this._table[index]) != "undefined"){

               if(this._table[index].find(k) !== undefined){
                   out = true;
               }

            }
        } else {
            throw new Error("Has value invalid.");
        }

        return out;

    }

    /*
* isEmpty()
*
* PURPOSE : Checks if the dictionary is empty.
*
* Returns : Boolean for if the dictionary is empty.
 */

    isEmpty(){
        let empty = true;
        for(let i = 0; i < this._table.length; i++){
            if(typeof((this._table)[i]) != "undefined" && !this._table[i].isEmpty()){
                empty = false;
            }
        }
        return empty;
    }

    //getters

    get table(){
        return this._table;
    }

    get size(){
        return this._size;
    }


}

module.exports = Dictionary;