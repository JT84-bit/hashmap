const Node = require('./node')

module.exports = class Bucket {
    constructor(){
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    get (){
        return this._head;
    }

    get (){ 
        return this._tail;
    }

    // Adds value to end of linked list
    append(key, value){ 
       
        const newNode = new Node(key, value)
        if(this._head === null && this._tail === null){
            this._head = newNode;
            this._tail = newNode;

        }else if(this._head === this._tail){
            this._tail = newNode;
            this._head.insertNext(this._tail)

        }else{
            const tail = this._tail;
            tail.insertNext(newNode)
            this._tail = newNode;
        }
        this._size += 1;
    }

    // Returns size of linked list
    size () {
        return this._size;
    }

    // Adds value to start of linked list
    prepend(key, value){ 
        
        const newNode = new Node(key, value)
        if(this._head == null && this._tail == null){
            this._head = newNode;
            this._tail = newNode;

        }else{
            const first = this._head;
            newNode.insertNext(first)
            this._head = newNode;
        }
        this._size += 1;
    }

    // Returns value of asked index in the list
    at(index){ 
        if (this._head == null){
            console.log('List is empty')
            return 
        } else {
            let currentIndex = 0;
            let current = this._head;
            
            if(currentIndex === index){
                return current;
            }
            
            while(current != null){

                currentIndex += 1;
                current = current.next

                if(currentIndex === index){
                    return current;
                }
            }
        }
        console.log('No node at that index')
        return 
    }

    // Removes last node on the list
    pop (){ 
        if (this._head == null){
            console.log('Cannot remove list is empty')
            return 
        

        } else if (this._head.next === null) {
            this._head = null;
            this._tail = null;
            this._size -= 1;
            console.log('Last node is removed list is empty')
            return 

        } else {
            let current = this._head;
            while(current){

                if(current.next === this._tail){
                    current.insertNext(null)
                    this._tail = current;

                }
                current = current.next
            }
        }
        
        this._size -= 1;
        console.log('Last node removed')
    }

    // Returns bool if asked value is in the list or not
    contains(key){ 
        if (this._head == null){
            return false;
        } else {
            let current = this._head;
            
            if(current.key === key){
                return true;
            }
            
            while(current){

                if(current.key === key){
                    return true;
                }
                current = current.next
            }
        }
        return false;
    }

    // Returns index of the asked key
    find(key){ 
        if (this._head == null){
            console.log('List is empty')
            return 
        } else {
            let currentIndex = 0;
            let current = this._head;
            
            while(current){

                if(current.key === key){
                    return currentIndex;
                }
                current = current.next
                currentIndex += 1;

              
            }
        }
        console.log('No such value')
        return 
    }

    // If same bucket used with same key, changes value
    changeValue(key, value){
        let current = this._head;

        while(current){

            if(current.key === key){
                current.changeValue(value)
                return
            }
            current = current.next;
        }
    }

    // Returns value of key
    getValue(key){

        let current = this._head;

        while(current){

            if(current.key === key){
                
                console.log(current.value)
                return current.value;
            }
            current = current.next;
        }
        console.log("No such key found")

    }

    // Prints out values of the linked list
    getKeys(){ 
        let keyList = []
        if (this._head === null){
            console.log('List is empty')
            return 
        } else {
            let current = this._head;
            while(current){
                let newKey = current.key

                if(current){
                    keyList.push(newKey)
                }
                current = current.next
            }
            return keyList;
        }
    }

    // Returns all values from the buckets
    getValues(){
        let valueList = []
        if (this._head === null){
            console.log('List is empty')
            return 
        } else {
            let current = this._head;
            while(current){

                if(current){
                    valueList.push(current.value)
                }
                current = current.next
            }
            return valueList;
        }
    }

    // Returns all key, value pairs from buckets
    getEntries(){
        let entryList = []
        if (this._head === null){
            console.log('List is empty')
            return 
        } else {
            let current = this._head;
            while(current){

                if(current){
                    entryList.push(current.getPair())
                }
                current = current.next
            }
            return entryList;
        }
    }

    // Removes key from bucket
    removeKey(key){
        let current = this._head;
        let previous;

        while(current){

            // If key is first of chain
            if(current.key === key && current.key === this._head.key){
                if(current.next === null || current.next === current){
                    this._head = null
                    this._tail = null
                    return
                }else{
                    this._head = current.next;
                    return
                } 
            }else if(current.key === key){

                if(current.next === null){
                    // If keys last of chain
                    this._tail = current;
                    return;
                }else{
                    // If key is middle of chain
                    previous.next = current.next;
                    return;
                }
            }
            previous = current;
            current = current.next;
        }
    }
}