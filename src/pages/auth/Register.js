import React from 'react'
import { Link } from 'react-router-dom'

//styles
import "./auth.css"

const Register = () => {
  return (
    <section className="container-register">
      <div className='form'>
          <h2>Registrera dig</h2>
          <form>
              <input type='text' placeholder='Email' required/>
              <input type='password' placeholder='Lösenord' required/>
              <input type='password' placeholder='Bekräfta lösenord' required/>
              <button className='block'>Registrera</button>
              {/* <p>Är du redan registrerad?</p> */}
              <div className='signin-link'>
                  <Link to="/login">Är du redan registrerad? Login</Link>
              </div>
             
          </form>
          
      </div>
    </section>
  )
}

export default Register