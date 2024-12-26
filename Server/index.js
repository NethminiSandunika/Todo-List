const express = require('express') // Framework to build the server
const mongoose = require('mongoose') // Library to connect to MongoDB
const cors = require('cors') // Middleware to handle cross-origin requests
const TodoModel = require('./Models/Todo') //need this model to interact with the todos collection in MongoDB

const app = express() //Creates an Express application.
app.use(cors()) //Allows React frontend to communicate with the backend.
app.use(express.json()) //allows send and receive JSON data in requests and responses.

//Connects backend to a MongoDB database.
mongoose.connect('mongodb://localhost:27017/todoList')

//GET API endpoint (/get) that allows the frontend 
//to retrieve all tasks (todos) from the database.

//app.get('/get', ...):
//Defines a GET route for the /get endpoint.
//The server listens for GET requests sent to http://localhost:3001/get

//(req, res) => { ... }: runs when the server receives a request to the /get endpoint.

app.get('/get', (req, res) => {

    //Queries the todos collection in database to fetch all the documents (tasks).
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


//This endpoint allows the frontend to update a specific task in the database (e.g., mark it as done).

//The frontend sends a PUT request to the backend with the id of the task to update. For example:
//http://localhost:3001/update/12345

app.put('/update/:id', (req, res) => {

    //req.params: It extracts the id part (12345) from the URL.
    const {id} = req.params;

    //findByIdAndUpdate: It searches the database for the task with _id: 12345 and updates its done field to true
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    
    //If the task is successfully updated in the database, the server sends the updated task back to the frontend as a response.
    .then(result => res.json(result))

    //If something goes wrong (e.g., invalid id), it sends an error message to the frontend.
    .catch(err => res.json(err))
})


//This endpoint allows the frontend to delete a specific task from the database.

//The frontend sends a DELETE request to the backend with the id of the task to delete. For example:
//http://localhost:3001/delete/12345

// this is same as the update request
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


//app.post('/add', ...):
//Listens for POST requests sent to the /add endpoint.
//frontend sends a POST request with a task to add.

//req.body.task:
//req.body contains the JSON payload sent by the frontend (e.g., { task: "Buy groceries" }).
//task stores the value of the incoming task.

app.post('/add', (req, res) => {
    const task = req.body.task;

    //Creates a new document in the MongoDB 
    //todos collection with the task field populated.
    TodoModel.create({
        task: task})

    //If the task is successfully saved, it sends the newly created 
    //task as the response to the frontend.
        .then(result => res.json(result))
        
    //If there’s an error,it sends the error message as the response.
        .catch(err => res.json(err))

})

app.listen(3001, () => { //This starts the server on port 3001.
    console.log("Server is running")
})



//index.js starts your Express server on port 3001.
//The server:
//Accepts JSON data (because of express.json()).
//Allows requests from the frontend (because of cors()).