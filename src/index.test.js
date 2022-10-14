/**
 * @jest-environment jsdom
 */
import { Letter } from './index.js'
import { User } from './model/User.js'
import { Post } from './model/Post.js'

const userObj = {
    id: 1,
    name: "John",
    username: "John",
    email: "John@example.com",
    address: {
        street: "some street", suite: "some suite", city: "some city", zipcode: "999-0011"
    },
    phone: "123",
    website: "http://example.com",
    company: "Example"

}

const user = new User(userObj.id, userObj.name, userObj.username, userObj.email, userObj.address, userObj.phone, userObj.website, userObj.company);

const postObj = {
    id: 1,
    title: "some title",
    body: "lorem ipsum dolor sit amet, consectetur adipiscing"
}

const post = new Post(postObj.id, postObj.title, postObj.body);
user.posts = [post];


describe("Letter", () => {

    test('expects 2 calls to the fetch function on Letter.get', () => {
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: true,
            json: async () => [userObj]
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => [postObj]
        });
        Letter.get("https://jsonplaceholder.typicode.com/users");

        expect(global.fetch.mock.calls.length).toBe(2);
    })

    //

    test('expects a JSON string on Letter.get', () => {
        
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: true,
            json: async () => [userObj]
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => [postObj]
        });
        const returnedUsers = Letter.get("https://jsonplaceholder.typicode.com/users");

        expect(typeof returnedUsers).toBe("string");
    })

    //

    test('expects returned object in JSON string to be the same as the expected object on Letter.get', () => {
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: true,
            json: async () => [userObj]
        }).mockResolvedValueOnce({
            ok: true,
            json: async () => [postObj]
        });

        const expectedUsers = [user];

        const returnedUsers = JSON.parse(Letter.get("https://jsonplaceholder.typicode.com/users"));

        expect(returnedUsers).toEqual(expectedUsers);
    })

    //

    test('expects an error message on the document on Letter.get with an incorrect link', () => {
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText:"Could not find the page"
        });
        Letter.get("https://jsonplaceholder.typicode.com/user");

        expect(document.getElementById("error")).not.toBeEmptyDOMElement();
    })

    // 

    test('expects Letter.error to have an error message when Letter.get is called with an incorrect link', () => {
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText:"Could not find the page"
        });
        Letter.get("https://jsonplaceholder.typicode.com/user");

        expect(Letter.error.length).toBeGreaterThan(0);
    })
    
    // 

    test('expects Letter.error to have a 404 error message when Letter.get is called with an incorrect link', () => {
        global.fetch = jest.fn(()=>{}).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText:"Could not find the page"
        });

        Letter.get("https://jsonplaceholder.typicode.com/user");

        expect(Letter.error).toEqual("Could not find the data you are looking for! Either the URL is incorrect or the server does not have any information available.");
    })
})

