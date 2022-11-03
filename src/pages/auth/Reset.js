import React from 'react'
import { Link } from 'react-router-dom'

//styles
import "./auth.css"

const Reset = () => {
  return (
    <section className="container-reset">
        <div className='form'>
            <h2>Återställ lösenord</h2>
            <form>
                <input type='text' placeholder='Email' required/>
                <button className='block'>Återställ lösenord</button>
                <div className='options'>
                    <Link to="/login">Logga in</Link>
                    <Link to="/register">Registrera dig</Link>
                </div>
              
               
            </form>
           
        </div>
    </section>
  )
}

export default Reset

