//Todo.js defines the structure and schema for how "todos" (tasks) are stored in your MongoDB database.



//A library for working with MongoDB in Node.js.
const mongoose =  require('mongoose')

//new mongoose.Schema(): Defines structure of MongoDB documents.
//task: String:each document in this collection will have a field called task, which must be a string.
//done (Boolean): Whether the task is completed (true) or not (false). Default value is false.
const TodoSchema = new mongoose.Schema({
    task: String,

    //adds a new field called done to each document in the todos collection.
    //it used to indicate whether a task has been completed (true) or not (false).
    done: {
        //This specifies that the done field must be a Boolean value
        type: Boolean,

        //If the frontend doesn’t explicitly set a value for done when creating a new task, it will automatically be set to false.
        //This means new tasks are marked as "not completed" by default.
        default: false
    }
})
 

// Creating a Model,
//mongoose.model():Creates a model, which represents a collection in MongoDB.
//"todos":The name of the MongoDB collection.
//TodoSchema:defining the structure of the documents in this collection.
//TodoModel:variable for interacting with the todos collection 
const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel