// => Read the posts.json and categories.json files and store the data in global arrays
function initialize() {
    // Ensures that the categories file is read and assigned first before usage
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Provides full array of "posts" objects 
function getAllPosts() {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Provides an array of "post" objects whose published property is true 
function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        reject();
    });  
}

// => Provides an array of "post" objects whose published property is true and finds posts by category
function getPublishedPostsByCategory(category) {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Provides full array of "category" objects 
function getCategories() {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Finds a post using its ID
function getPostById(id) {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Find posts by category
function getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Find posts that have a date greater than the specified minimum date
function getPostsByMinDate(minDate) {
    return new Promise((resolve, reject) => {
        reject();
    });
}

// => Adds a new post
function addPost(postData) {
    return new Promise((resolve, reject) => {
        reject();
    });
}

module.exports = { 
    initialize, 
    getAllPosts, 
    getPublishedPosts, 
    getCategories, 
    addPost, 
    getPostById,
    getPostsByCategory,
    getPostsByMinDate,
    getPublishedPostsByCategory
};