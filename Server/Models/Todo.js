//A library for working with MongoDB in Node.js.
const mongoose =  require('mongoose')

//new mongoose.Schema(): Defines structure of MongoDB documents.
//task: String:each document in this collection will have a field called task, which must be a string.
const TodoSchema = new mongoose.Schema({
    task: String
})
 

// Creating a Model,
//mongoose.model():Creates a model, which represents a collection in MongoDB.
//"todos":The name of the MongoDB collection.
//TodoSchema:defining the structure of the documents in this collection.
//TodoModel:variable for interacting with the todos collection 
const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel