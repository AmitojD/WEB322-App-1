const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema for our database
const userSchema = new Schema({
    "userName": {
        type: String,
        unique: true
    },
    "password": String,
    "email": String,
    "loginHistory": [ 
        { 
            "dateTime": Date, 
            "userAgent": String  
        } 
    ]
});

// Using the schema to create a user object
let User;

// => Ensures that we are able to connect to our MongoDB instance before we can start our application
function initialize() {
    return new Promise((resolve, reject) => {
        // Creating a connection
        let db = mongoose.createConnection("mongodb+srv://aryank1511:" + "computE1*" + "@web322-blog-app.mr1g2s5.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
        // Checking for errors
        db.on('error', (err)=>{
            reject(err);
        });
        // Checking for success
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });

    })
}

// => Saves users to the database after performing data validation
function registerUser(userData) {
    return new Promise((resolve, reject) => {
        if (userData.password !== userData.password2) {
            reject("Passwords do not match");
        } else {
            let newUser = new User(userData);
            newUser.save().then(() => {
                resolve();
            }).catch((err) => {
                if (err.code === 11000) {
                    reject("User Name already taken");
                } else {
                    reject(`There was an error creating the user: ${err}`);
                }
            })
        }
    })
}

// => Checks if the user's login credentials are right
function checkUser(userData) {
    User.find({ "userName": userData.userName }).exec()
    .then((users) => {
        if (users.length === 0) {
            reject(`Unable to find user: ${userData.userName}`);
        } else if (userData.password !== users[0].password) {
            reject(`Incorrect Password for user: ${userData.userName}`);
        } else {
            users[0].loginHistory.push(
                {
                    "dateTime": new Date().toString(),
                    "userAgent": userData.userAgent
                }
            )
            User.updateOne(
                {"userName": users[0].userName},
                {"$set": {"loginHistory": users[0].loginHistory}}
            ).exec().then(() => {
                resolve();
            }).catch((err) => {
                reject(`There was an error verifying the user: ${err}`)
            })
        }
    }).catch(() => {
        reject(`Unable to find user: ${userData.userName}`);
    });
}

// Exporting the functions
module.exports = {
    initialize,
    registerUser,
    checkUser
}