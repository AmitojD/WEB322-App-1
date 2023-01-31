const fs = require('fs');
const path = require("path");

// Globally declared arrays
let posts = [];
let categories = [];

// => Read the posts.json and categories.json files and store the data in global arrays
function initialize() {
    // Ensures that the categories file is read and assigned first before usage
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "posts.json"), 'utf8', (err, data) => {
            if (err) {
                // Error Handling
              reject("Unable to read posts file");
            }

            // Saving posts
            posts = JSON.parse(data);

            // Only reading categories file if posts has been read
            fs.readFile(path.join(__dirname, "data", "categories.json"), 'utf8', (err, data) => {
                if (err) {
                    // Error Handling
                  reject("Unable to read categories file");
                }

                // Saving categories
                categories = JSON.parse(data);

                // Communicates back to server stating that the operation was a success
                resolve({posts, categories});
              });
          });
    })
}

// // => Provides full array of "posts" objects 
// function getAllPosts() {
//     initialize().then((returnedData) => {
//         if (returnedData.posts.length == 0) {
//             reject("No Results Returned");
//         } else {
//             resolve(returnedData.posts);
//         }
//     })
// }

module.exports = { initialize };