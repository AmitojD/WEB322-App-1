/*********************************************************************************
 *  WEB322 – Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Aryan Khurana Student ID: 145282216 Date: 08 February 2023
 *
 *  Online (Cyclic) Link: https://zany-ox-sweatshirt.cyclic.app/about
 *
 ********************************************************************************/
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const path = require("path");
const {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
  addPost,
} = require("./blog-service.js");

const app = express();

// Using the 'public' folder as our static folder
app.use(express.static("public"));

// Configuring Cloudinary
cloudinary.config({
  cloud_name: "dtjzbh27c",
  api_key: "352185835558593",
  api_secret: "XWtpK6nUkH_eDPJIwyaGDNvo1F0",
  secure: true,
});

// Variable without any disk storage
const upload = multer();

// Configuring the port
const HTTP_PORT = process.env.PORT || 8080;

// ========== Home Page Route ==========
app.get("/", (req, res) => {
  res.redirect("/about");
});

// ========== About Page Route ==========
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// ========== Blog Page Route ==========
app.get("/blog", (req, res) => {
  getPublishedPosts()
    .then((data) => {
      res.send(data);
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    });
});

// ========== Posts Page Route ==========
app.get("/posts", (req, res) => {
  getAllPosts()
    .then((data) => {
      res.send(data);
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    });
});

// ========== Add Post Page Route (GET) ==========
app.get("/posts/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "addPost.html"));
})

// ========== Add Post Page Route (POST) ==========
app.get("/posts/add", upload.single("featureImage"), (req, res) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    return result;
  }

  upload(req).then((uploaded) => {
    req.body.featureImage = uploaded.url;
    let postObject = {};

    // Add it Blog Post before redirecting to /posts
    postObject.body = req.body.body;
    postObject.title = req.body.title;
    postObject.postDate = Date.now();
    postObject.category = req.body.category;
    postObject.featureImage = req.body.featureImage;
    postObject.published = req.body.published;
    
    // Adding the post
    addPost(postObject);
    res.redirect("/posts");
  });
});

// ========== Categories Page Route ==========
app.get("/categories", (req, res) => {
  getCategories()
    .then((data) => {
      res.send(data);
    })
    // Error Handling
    .catch((err) => {
      res.send(err);
    });
});

// ========== HANDLE 404 REQUESTS ==========
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFoundPage.html"));
});

// ========== Setup http server to listen on HTTP_PORT ==========
initialize().then(() => {
  // Start the server after the files are read and the initialization is done
  app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
  });
});
