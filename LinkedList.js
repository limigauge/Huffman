'use strict';

/*
*   CLASS   : LinkedList.js
*
*   AUTHOR  : MICHELLE LI
*   REMARKS : General LinkedList class. Insertions take data as well as a "key" due to the nature of the Dictionary needing Hashable keys.
*             Can perform actions such as deleting, inserting, finding, and even changing/altering existing data in Nodes.
 */

let Node = require('./Node.js');

class LinkedList {
    constructor() {
        this._head = null;
    }

    /*
* insert
*
* PURPOSE : Insert a new node into the List using parameters data and its key.
* PARAMETERS :
*   data - the data to store into the LinkedList.
*   key - the key of the data.

*/

    insert(data, key) {
        this._head = new Node(data, key, this._head);
    }

    /*
* isEmpty
*
* PURPOSE : Checks if LinkedList is empty.
*
* Returns : boolean to whether if the head of the LinkedList is null.
*/

    isEmpty() {
        return (this._head == null);
    }

    /*
* remove(node)
*
* PURPOSE : Removes a certain node from the List
* PARAMETERS :
*   Node node - Node to remove.

*/

    remove(node){
        if(node instanceof Node) { //make sure node is a Node
            let prev;
            let curr = this._head;

            if (this._head != null) {
                while (curr != null && node !== curr) {
                    prev = curr;
                    curr = curr.next;
                }
                if (curr != null) { //found

                    if (prev != null) {
                        prev.next = curr.next; //setting prev's next to curr's next
                    } else {
                        //first item
                        this._head = curr.next;
                    }

                } //else, not found.
            }
        }
    }

    /*
* isEmpty
*
* PURPOSE : Changes an existing Value in the List
* PARAMETERS:
*   Hashable key - key to identify the Node that needs to be altered.
*   value - value to change to.

*/
    //if not found, does nothing.
    change(key, value) {

        if (this._head !== null) {
            let curr = this._head;

            while (curr != null) {

                if (curr.key.equals(key) ) {
                    curr.data = value;
                }
                curr = curr.next;
            }
        }
    }

    /*
* find(key)
*
* PURPOSE : Finds a Node based on the key parameter
* PARAMETERS:
*   key - key to identify the Node needed.
*
* Returns : Node that corresponds with the key.
*/
    find(key) {

        let out = null;
        if (this._head != null) {
            let curr = this._head;

            while (curr != null) {

                //console.log("checking if " + curr.key + " equals " + key);
                if (curr.key.equals(key)) {
                    out = curr;
                }
                curr = curr.next;
            }
        }
        return out;
    }

    //getter

    get top(){
        return this._head;
    }
}

module.exports = LinkedList;