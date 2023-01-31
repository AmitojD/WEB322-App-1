/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Aryan Khurana Student ID: 145282216 Date: 01 February 2023
*
*  Online (Cyclic) Link: 
*
********************************************************************************/ 


const express = require("express");
const path = require("path");
const { initialize, getAllPosts, getPublishedPosts, getCategories } = require("./blog-service.js");

const app = express();
app.use(express.static('public')); 

const HTTP_PORT = process.env.PORT || 8080;

// ========== Home Page Route ==========
app.get("/", (req,res) => {
  res.redirect("/about");
});

// ========== About Page Route ==========
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
})

// ========== Blog Page Route ==========
app.get("/blog", (req, res) => {
  // getPublishedPosts().then((data) => {
  //   res.send(data);
  // })
});

// ========== Posts Page Route ==========
app.get("/posts", (req, res) => {
  getAllPosts().then((data) => {
    res.send(data);
  })
});

// ========== Categories Page Route ==========
app.get("/categories", (req, res) => {
  getCategories().then((data) => {
    res.send(data);
  });
})

// ========== HANDLE 404 REQUESTS ==========
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFoundPage.html"));
})

// ========== Setup http server to listen on HTTP_PORT ==========
initialize().then(() => {
  // Start the server after the files are read and the initialization is done
  app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
  });
})
