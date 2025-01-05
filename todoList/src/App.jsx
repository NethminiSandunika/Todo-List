//The main component that serves as the root of your React application.
//Organizes your application by acting as a starting point.


import { useState } from 'react'   // Importing useState for state management
import './App.css'
import Home from './Home'


function App() {

  return (
    <>
      <Home />  {/* Display the Home component */}
      
    </>
  )
}

export default App
