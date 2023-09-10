'use strict';
/*
*   CLASS   : StringHash.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : StringHash child of Hashable class and generates hash keys using from a string. Able to compare keys.
 */

let Hashable = require('./Hashable.js');

class StringHash extends Hashable{

    constructor(k){
        super(k);
    }

    /*
* hashVal
*
* PURPOSE : Takes the Hashable's key and uses a certain algorithm to create a hash key with the string.
* PARAMETERS :
*
* Returns : int value that is the hash key
 */

    hashVal(){
        let value = 0;
        let prime = 41;

        for(let i = 0; i < this.key.length; i++){
            value += this.key.charCodeAt(i)*prime;
        }

        return value;
    }

    /*
* equals
*
* PURPOSE : Checks to see if this current Hashable is the same as the input.
* PARAMETERS :
*   StringHash x - StringHash to compare to.
*
* Returns : boolean of whether they are the same.
 */

    equals(x){
        let out = false;

        if(x instanceof StringHash){
            if( this.key === x.key){
                out = true;
            }
        }

        return out;
    }

}

module.exports = StringHash;