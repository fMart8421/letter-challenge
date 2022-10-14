
/**
 * @param {Error} err - Error object with a message containing the status
 * @returns {string} String with the message to be displayed
 */
export const handleError = (err) => {
    if (err.message.includes("400")) {
        return "There was a problem with the request! Please check if you have the correct sintax."
    }
    if (err.message.includes("401")) {
        return "You must be authenticated to be able to access this information."
    }
    if (err.message.includes("403")) {
        return "You do not have the necessary permissions to access this information."
    }
    if (err.message.includes("404")) {
        return "Could not find the data you are looking for! Either the URL is incorrect or the server does not have any information available."
    }
    throw err;
}
