import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill } from 'react-icons/bs' //import to Represents an unchecked circle icon
import { BsFillTrashFill } from 'react-icons/bs'; //import to  Represents a trash can icon 
import { BsFillCheckCircleFill } from 'react-icons/bs'; //import to Represents a filled circle with a checkmark


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

    //Marks a task as completed when the user clicks on the checkbox icon.
    const handleEdit = (id) => {

        //Sends a PUT request to http://localhost:3001/update/:id to update the done status of a task.
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {

            //Refreshes the page to fetch and display the updated list of tasks.
            location.reload()
        })
        //Logs any errors to the console if the request fails
        .catch(err => console.log(err))
    }


    //Deletes a task when the user clicks on the trash can icon

    const handleDelete = (id) => {

        //Sends a DELETE request to http://localhost:3001/delete/:id to remove a task.
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="home">
            <h2>Todo list</h2>
            <Create />    {/* Rendering Create component */}
            <br />
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
                    <div className='task'>
                        <div className='checkbox' 

                        //Marks the task as completed when clicked.
                        onClick={() => handleEdit(todo._id)}>
                            {todo.done ? //Renders a filled checkmark icon
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            : <BsCircleFill className='icon'/>  //Renders an empty circle icon
                            }

                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon'
                            
                            //Deletes the task when clicked.
                            onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>

                    
                ))
            }
        </div>
    )
}

export default Home