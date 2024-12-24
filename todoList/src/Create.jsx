import React, { useState } from 'react'
import axios from 'axios' //A library for making HTTP requests (to send data to your backend)


// this function for capturing tasks,sending task 
//to backend API when user cick add button
function Create() {  
    const [task, setTask] = useState()

    const handleAdd = () => {
        //Makes a POST request to the backend endpoint
        //Sends the task as part of the request body in JSON format: { task: task }.
        axios.post('http://localhost:3001/add', {task: task})
        
        //If the request is successful, the response is logged to the console.
        .then(result => console.log(result))

        //If there’s an error the error is logged to the console.
        .catch(err => console.log(err))

    }

    return (
        <div className="create_form">
            {/* Input field for the task */}
            <input 
            type="text" 
            name="" 
            id="" 
            placeholder='enter task' 
            
            //Every time the user types in the field, this onChange event is triggered.
            //The setTask function updates the task state with the current value of the input field (e.target.value).
            onChange={(e) => setTask(e.target.value)} />    
            
            {/*When clicks the Add button, the handleAdd function is called.
            This sends the entered task to the backend.*/}
            <button type="button" onClick={handleAdd}>Add</button>     {/* Button to add a task */}
        </div>
    )
}

export default Create