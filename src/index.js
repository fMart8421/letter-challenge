import { handleError } from "./helpers/handleError.js";
import { User } from "./model/User.js";
import { Post } from "./model/Post.js";


export const Letter = {
    /**
     * @string
     * Contains the message to be displayed in the html document 
     * when an error occurs with the fetch function.
     */
    error: "",
    /**
     * Fetches the information the link provides and transforms it into a User object
     * @param {string} url - URL of the API to be fetched
     * @return {User[]} An array of users
     */
    get: async function (url) {
        let fetchedUsers = [];

        const res = await fetch(url, {
            headers: {
                contentType: 'application/json'
            }
        })

        // if the server returned a non 200 status, then there might've been an error
        if (!res.ok) {
            this.error = handleError(new Error(`${res.status} - ${res.statusText}`));
            return;
        }

        // if not then we take care of the data
        const data = await res.json();
        for (const user of data) {
            // for each object returned from the API, we create a new User object and store it in the array to be returned
            fetchedUsers.push(new User(user.id, user.name, user.username, user.email, getAddressFromAddressObj(user.address), user.phone, user.website, user.company.name))
        }

        try {
            // fetch the posts of each user
            for (const user of fetchedUsers) {
                user.posts = await fetchPosts(user.id);
            }
        } catch (err) {
            // if the server returned a non 200 status, an error will be thrown
            this.error = handleError(err);
        }

        return JSON.stringify(fetchedUsers);
    }
}

/**
 * @param {{
 * street:string,
 * suite:string,
 * city:string,
 * zipcode:string
 * }} addressObject - An object containing the address details
 * @return {string} Returns a string with the object's parameters
 */
const getAddressFromAddressObj = (addrObj) => {
    let { street, suite, city, zipcode } = addrObj;
    return `${street}, ${suite} - ${zipcode} ${city}`
}



/**
 * Helper function that will fetch the posts of a certain user
 * @param {string} id - The user's ID, to which the posts belong to
 * @returns Array of Post objects, related to the user
 */
 const fetchPosts = async (id) => {
    let postArray = []
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
        headers: {
            contentType: 'application/json'
        }
    });

    // if the status code is not on the 200's, the ok will be false, meaning some sort of error might've ocurred
    if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
    }
    // else, we parse the data and create the post array
    const data = await res.json();
    for (const post of data) {
        postArray.push(new Post(post.id, post.title, post.body))
    }
    return postArray;
}



// set a listener to the error field in Letter. Whenever this value changes, the information will be cleared and an error message will be presented
const errorProxy = new Proxy(Letter, {
    set: function (target, key, value) {
        if (key === "error") {
            document.getElementById("fetched-info").innerText = "";
            document.getElementById("error").innerText = value;
            document.getElementById("error").classList.add("error");
        }
    }
})
const users = await errorProxy.get("https://jsonplaceholder.typicode.com/users");
document.getElementById("fetched-info").innerText = users;
