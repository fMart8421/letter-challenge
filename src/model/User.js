

/**
 * Represents a User object
 * @constructor
 * @param {number} id - user's unique ID
 * @param {string} name - name of the user
 * @param {string} username - user's username
 * @param {string} email - user's email
 * @param {string} address - string representing user's address object
 * @param {string} phone - string representing user's phone number
 * @param {string} website - user's website
 * @param {string} company - company the user works for
 */
export class User {

    constructor(id, name, username, email, address, phone, website, company) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }

    set posts(val){
        this._posts = val;
    }

    get posts() {
        return this._posts;
    }
}

