'use strict';
/*
*   CLASS   : Hashable.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : Abstract class for Hashable type keys. Is the parent of StringHash and IntHash.
 */

class Hashable{

    constructor(k){
        if(this.constructor === Hashable){
            throw new Error("Cannot create an abstract class Hashable");
        } else {
            this._key = k;
        }
    }

    //ABSTRACT METHODS TO ENSURE THE CHILD CLASSES IMPLEMENT HASHVAL AND EQUALS

    hashVal(){
        throw new Error("hashVal method was not implemented.");
    }

    equals(x){
        throw new Error("equals method was not implemented.");
    }

    //GETTER FOR KEY

    get key(){
        return this._key;
    }


}
module.exports = Hashable;