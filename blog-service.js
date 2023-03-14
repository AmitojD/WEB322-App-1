const Sequelize = require('sequelize');

// set up sequelize to point to our postgres database
var sequelize = new Sequelize('tgxufbkt', 'tgxufbkt', 'Jcv_k8x_AoNEzn36l-r6Q24T7Oy1nIud', {
    host: 'babar.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

// Defining the Post Model
const Post = sequelize.define('Post', {
    body: Sequelize.TEXT,
    title: Sequelize.STRING,
    postDate: Sequelize.DATE,
    featureImage: Sequelize.STRING,
    published: Sequelize.BOOLEAN
});

// Defining the Category Model
const Category = sequelize.define('Category', {
    category: sequelize.STRING
});

// This will ensure that our Post model gets a "category" column that will act as a foreign key to the Category model
Post.belongsTo(Category, {foreignKey: 'category'});

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