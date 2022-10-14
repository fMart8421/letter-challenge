/**
 * @jest-environment jsdom
 */
import { handleError } from "./handleError.js";

describe("handleError", () => {
    test("expects message on error 400", () => {
        const message = handleError(new Error("400"))

        expect(message).toEqual("There was a problem with the request! Please check if you have the correct sintax.");
    })
    test("expects message on error 401", () => {
        const message = handleError(new Error("401"))

        expect(message).toEqual("You must be authenticated to be able to access this information.");
    })
    test("expects message on error 403", () => {
        const message = handleError(new Error("403"))

        expect(message).toEqual("You do not have the necessary permissions to access this information.");
    })
    test("expects message on error 404", () => {
        const message = handleError(new Error("404"))

        expect(message).toEqual("Could not find the data you are looking for! Either the URL is incorrect or the server does not have any information available.");
    })

})