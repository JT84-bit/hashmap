const Bucket = require('./bucket')

module.exports = class Hashmap {
    constructor(){
        this._map = [].fill(null);
        this._maxSize = 16;
        this._loadFactor = 0.0;
        this._pairs = 0;
    }

    // Makes hashkey from key
    getHash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this._maxSize;
        }
        return hashCode;
    }

    // Sets new key, value pair to hashmap
    set(key, value) {
    
        if(typeof key !== 'string'){
            console.log("Key have to be string")
            return;
        }

        const hash = this.getHash(key)
        const bucket = this._map[hash];
        if(hash < 1 || hash > this._maxSize){
            console.log("Out of index")
            return
        }

        if( bucket == null){
            const newBucket = new Bucket();
            newBucket.prepend(key, value);
            this._map[hash] = newBucket
            this._pairs += 1;
            this.checkLoad();

        }else if(!this._map[hash].contains(key)){
            this._map[hash].prepend(key, value);
            this._pairs += 1;
            this.checkLoad;
        }else {
            this._map[hash].changeValue(key, value);
        } 
    }

    // Returns value from gives key from hashmap
    get(key){
        const hash = this.getHash(key)

        if(!this._map[hash] || !this._map[hash].contains(key)){
            return "No such key found.";
        }

        if(this._map[hash]){
            const value = this._map[hash].getValue(key)
            return value;
            }   
        }

    // Checks if gives key is in hashmap
    has(key){
        const hash = this.getHash(key)
        if(!this._map[hash] || !this._map[hash].contains(key)){
            return false;
        }
        else{
            return true;
        }
    }    

    // Removes key from hashmap
    remove(key){

        const hash = this.getHash(key)
        if(!this._map[hash] || !this._map[hash].contains(key)){
            return false;
        }
        else{
            this._map[hash].removeKey(key);
            this._pairs -= 1;
            this.checkLoad();
            return true;
        } 
    }

    // Gives length of hashmap
    length(){
        return this._pairs;
    }

    // Clears hashmap
    clear (){
        this._pairs = 0;
        this._map = []
    }

    // Returns all keys from hashmap
    keys(){
        let allKeys = []
        for(let i = 0; i < this._map.length; i++){
            if(this._map[i]){
                allKeys = allKeys.concat(this._map[i].getKeys());
            }
        }
        return allKeys;
    }

    // Returns all values from hashmap
    values(){
        let allValues = []
        for(let i = 0; i < this._map.length; i++){
            if(this._map[i]){
                allValues = allValues.concat(this._map[i].getValues());
            }
        }
        return allValues;
    } 

    // Returns all key, value pairs from hashmap
    entries(){
        let allEntries = []
        for(let i = 0; i < this._map.length; i++){
            if(this._map[i]){
                allEntries = allEntries.concat(this._map[i].getEntries());
            }
        }
        return allEntries;
    }

    checkLoad(){
        this._loadFactor = this._pairs / this._maxSize;
        if(this._loadFactor > 0.75){
            console.log("Ylitys")
            this._maxSize *= 2
            this._loadFactor = this._pairs / this._maxSize;
        }
    } 
}