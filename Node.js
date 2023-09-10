'use strict';

/*
*   CLASS   : Node.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : General Node class to be used in a LinkedList. These specific Nodes are made to take in 3 arguments: data, key, and next, due to the
*             nature of the Dictionary class needing Hashable keys.
 */


class Node{
    constructor(data, key, next) {

        if (arguments.length === 2) { //2 arguments (sole node)
            this._key = key;
            this._data = data;
            this._next = null;
        } else if (arguments.length >= 3) {
            this._key = key;
            this._data = data;
            this._next = next;
        } else if(arguments.length === 1) { //1 argument, use for LinkedList with no key necessary.
            this._key = -1;
            this._data = data;
            this._next = null;
        } else {
            this._key = -1;
            this._data = -1;
            this._next = null;
        }
    }

    //GETTERS AND SETTER

    set data(newData){
        this._data = newData;
    }

    set next(newNext){
        this._next = newNext;
    }

    //getters
    get data() {
        return this._data;
    }

    get key(){
        return this._key;
    }

    get next() {
        return this._next;
    }


}

module.exports = Node;