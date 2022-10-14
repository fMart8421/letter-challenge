/**
 * @jest-environment jsdom
 */
import { Post } from "./Post.js";


const postObj = {
    id: 1,
    title: "some title",
    body: "lorem ipsum dolor sit amet, consectetur adipiscing"
}

describe("Post", () => {
    test("expects a Post object to be initialized", () => {
        let post;
        post = new Post(postObj.id, postObj.title, postObj.body);

        expect(post).toBeDefined();
    })
    test("expects a Post object to be initialized with the correct values", () => {
        let post;
        post = new Post(postObj.id, postObj.title, postObj.body);

        expect(post.id).toEqual(postObj.id);
        expect(post.title).toEqual(postObj.title);
        expect(post.body).toEqual(postObj.body);
    })
})