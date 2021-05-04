//Enable file system for use
const fs = require("fs");
//Enable use of file and directory paths
const path = require("path");
//Require express to use
const express = require("express");
//Enable and use Express for GET, POST and (DELETE*bonus)
const app = express();
//Enable unique ID npm package (UUID)
const { v4: uuidv4 } = require('uuid');
//Enabling use of other files like CSS, JS and middleware (parsing user data the right way)
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

//The following API routes should be created:
//GET /api/notes
app.get("/api/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"/db/db.json"))
});

//POST /api/notes  (when new notes are created)
//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("", (req,res) => {
    let noteId = uuid.stringify();
    let userTitle = req.body;
    let userNote = req.body;
    let noteLi = JSON.parse
})