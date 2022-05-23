import express from "express";
import { v4 as uuidv4 } from 'uuid';

import { createRequire } from "module";//defining require function
import { normalize } from "path";
const require = createRequire(import.meta.url);

const fs = require('fs');

const router = express.Router();

//All routes here are already starting with /users as stated in app.get call in index.js

router.get('/', (req,res) =>{ //route for GET request from client to display all users
    const user = JSON.parse(fs.readFileSync( "./routes/user.json", 'utf8'));//use readFileSync to read Synchronously
    res.send(user);
});

router.post('/', (req,res) =>{ //route to ENTER DETAILS of new user
    const user = JSON.parse(fs.readFileSync( "./routes/user.json", 'utf8'));// ALL USERS present in the database previously
    let users = [];
    for(let i = 0 ; i<user.length ; i++){//loop to push previous data into a JSON array variable
        users.push(user[i]);
    }
    //... = spread operator
    users.push({...req.body, id: uuidv4()});//appending the newly recieved data from the POST request and also appending its' Unique ID to it

    fs.writeFileSync("./routes/user.json",JSON.stringify(users) );//writing data to JSON file

    res.send(`User with the name ${req.body.fullName} added in the database`);
});

router.get('/:id', (req,res) =>{//route to SEARCH for users
    const {id} = req.params;//storing id that user enters in parameters after /user in search bar in a variable
    const user = JSON.parse(fs.readFileSync( "./routes/user.json", 'utf8'));//all users
    const foundUser = user.find((user) => user.id == id);//searching and storing details of the user 
    res.send(foundUser);//printing data in the browser
});

router.delete('/:id', (req,res) =>{//route to DELETE an existing user
    const {id} = req.params;
    let user = JSON.parse(fs.readFileSync( "./routes/user.json", 'utf8'));
    user = user.filter((user) => user.id != id);
    fs.writeFileSync("./routes/user.json",JSON.stringify(user) );
    res.send(`User with the ID ${id} has been deleted from the database`);
});

router.patch('/:id', (req,res) =>{//route to UPDATE a value present in the database
    const {id} = req.params;
    const { fullName, rollNum, sub, marks} = req.body;//store input received from user in the request body in a variable
    let users = JSON.parse(fs.readFileSync( "./routes/user.json", 'utf8'));

    const update_user = users.find((user) => user.id == id);
    const old_user = update_user;

    //updating the values if present in the request body
    if(fullName) update_user.fullName = fullName;
    if(rollNum) update_user.rollNum = rollNum;
    if(sub) update_user.sub = sub;
    if(marks) update_user.marks = marks;

    users.toString().replace(old_user.toString(), update_user.toString());//Replacing previous user value with updated value
    
    fs.writeFileSync("./routes/user.json",JSON.stringify(users) );
    res.send(`User with the id: ${id} has been updated`);

});

export default router;