"use strict";
/*
*   CLASS   : IntHash.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : IntHash child class of Hashable that uses an integer as it's hash key.
 */

let Hashable = require('./Hashable.js');

class IntHash extends Hashable{

    constructor(k){
        super(k);
    }

    /*
* hashVal
*
* PURPOSE : Takes the Hashable's key and uses a certain algorithm to create a hash key with the string. For HashVal, it is just the value.

* Returns : int value that is the hash key
*/

    hashVal(){
        return this.key;
    }

    /*
* equals
*
* PURPOSE : Checks to see if this current Hashable is the same as the input.
* PARAMETERS :
*   IntHash x - IntHash to compare to.
*
* Returns : boolean of whether they are the same.
*/
    equals(x){
        let out = false;

        if(x instanceof IntHash){
            if( this.key === x.key){
                out = true;
            }
        }

        return out;
    }
}
module.exports = IntHash;