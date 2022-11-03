import React from 'react'
import { Link } from 'react-router-dom'

//styles
import "./auth.css"

const Login = () => {
  return (
    <section className="container-signin">
       <div className='form'>
            <h2>Logga in</h2>
            <form>
                <input type='text' placeholder='Email' required/>
                <input type='password' placeholder='Lösenord' required/>
                <button className='block'>Logga in</button>
                <div className='signin-link'>
                    <Link to="/reset">Återställ lösenord</Link>
                </div>
                <p>or</p>
                
                {/* <span className=''>
                    <p>Har du inte ett konto?</p>
                    <Link to="./register">Registrera dig</Link>
                </span> */}
            </form>
            <form>
                <Link to="/register"><button>Registrera dig</button></Link>
            </form>
        </div>
    </section>
  )
}

export default Login