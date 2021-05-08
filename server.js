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
let noteLi = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//The following HTML routes should be created
//get every note to index html

//get to notes html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

//The following API routes should be created:
//GET /api/notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
//POST /api/notes  (when new notes are created)
//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/api/notes", (req, res) => {
    const noteId = uuidv4();
    // let userTitle = req.title;
    let wholeNote = req.body;
    wholeNote.id = noteId;

    //Push the items to a single array
    noteLi.push(wholeNote);
    //Write parsed note to json database
    fs.writeFileSync("./db/db.json", JSON.stringify(noteLi));
    res.json(noteLi);
    console.log(noteLi + "wrote to database");
});

app.delete('/api/notes/:id', (req, res) => {
    //Make a condition that if id matches id in json object that was clicked, filter out and update li to json
    //Assign jason object to a variable access in db.json
    const { id } = req.params;
    //gather id from requested param and find it in the noteLi
    const findTheNote = noteLi.find(noteLi => noteLi.id === id);
    console.log("The requested id:" + id);
    console.log("After searching note list: " + findTheNote);
    //if it is present
    if (findTheNote) {
        //filter out all items that do NOT match id
        noteLi = noteLi.filter(noteLi => noteLi.id !== id);
    } else {
        res.status(404).json({ message: "Note item was not found." })
    }
    //write new noteLi to json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteLi));
    res.json(noteLi);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));