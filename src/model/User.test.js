/**
 * @jest-environment jsdom
 */
import { User } from "./User.js";


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

describe("User", () => {

    test("expects a User object to be initialized", () => {
        let user;
        user = new User(userObj.id, userObj.name, userObj.username, userObj.email, userObj.address, userObj.phone, userObj.website, userObj.company);

        expect(user).toBeDefined();
    })
    test("expects a User object to be initialized without any posts", () => {
        let user;
        user = new User(userObj.id, userObj.name, userObj.username, userObj.email, userObj.address, userObj.phone, userObj.website, userObj.company);

        expect(user.posts).toBeUndefined();
    })
    test("expects a User object to be initialized with the correct values", () => {
        let user;
        user = new User(userObj.id, userObj.name, userObj.username, userObj.email, userObj.address, userObj.phone, userObj.website, userObj.company);

        expect(user.id).toEqual(user.id);
        expect(user.name).toEqual(user.name);
        expect(user.username).toEqual(user.username);
        expect(user.email).toEqual(user.email);
        expect(user.address).toEqual(user.address);
        expect(user.phone).toEqual(user.phone);
        expect(user.website).toEqual(user.website);
        expect(user.company).toEqual(user.company);
    })
})