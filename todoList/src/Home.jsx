import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home() {
    // State to store the list of todos
    //creates a state called todos.
    //setTodos is a function, update the todos array later.
    //todos is an empty array []
    const [todos, setTodos] = useState([])   
    
    //Fetches the list of todos from the backend when the Home component loads.
    useEffect(() => {

        //Sends a GET request to the /get endpoint of backend
        axios.get('http://localhost:3001/get')
        
        //If the request succeeds, the response data (list of todos) is stored in the todos state using setTodos.
        .then(result => setTodos(result.data))
        
        //Logs any error that occurs during the request.
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="home">
            <h2>Todo list</h2>
            <Create />    {/* Rendering Create component */}
            
            {
                //checks if the todos array is empty.
                //=== 0, it means there are no tasks yet.
                todos.length === 0 

                //condition ? (do this if true) : (do this if false)
                ?                   
                <div><h2>No Record</h2></div>
                :                   
                
                //todos.map loops through each item in the todos array.
                //For each todo in the array, it displays the task inside a <div>
                todos.map(todo => (            
                    <div>
                        {todo.task}
                    </div>
                ))
            }
        </div>
    )
}

export default Home