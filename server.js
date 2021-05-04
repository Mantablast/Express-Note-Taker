//Enable file system for use
const fs = require("fs");
//Enable use of file and directory paths
const path = require("path");
//Require express to use
const express = require("express");
//Enable and use Express for GET, POST and (DELETE*bonus)
const app = express();
//Enabling use of other files like CSS, JS and middleware (parsing user data the right was)
app.use(express.static('public'));
//Enable ability to retrieve saved user notes
app.use(express.json());
//Using express to thoroughly and properly use/"unpack" JSON objects
app.use(express.urlencoded({ extended: true }));
//Setting a port variable to be used in multple areas of js files
const PORT = process.env.PORT || 3001;


//The following HTML routes should be created
//get every note to index html
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"))
});
//get to notes html
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"))
});
