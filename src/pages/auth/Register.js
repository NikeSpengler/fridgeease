import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth"

//styles
import "./auth.css"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const registerUser = (e) => {
    e.preventDefault()
    if(password !== cPassword){
      toast.error("Lösenordet stämmer inte överens.")
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  };

  return (
    <>
    <ToastContainer />
      <section className="container-register">
        <div className='form'>
            <h2>Registrera dig</h2>
            <form onSubmit={registerUser}>
                <input 
                  type='text' 
                  placeholder='Email' 
                  required value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='Lösenord' 
                  required value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='Bekräfta lösenord' 
                  required value={cPassword} 
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button type="submit" className='block'>Registrera</button>
                {/* <p>Är du redan registrerad?</p> */}
                <div className='signin-link'>
                    <Link to="/login">Är du redan registrerad? Logga in</Link>
                </div>
            </form>
        </div>
      </section>
    </>
  )
}

export default Register