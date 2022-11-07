import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from '../../components/loader/Loader';


//styles
import "./auth.css"


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault()
    if(password !== cPassword){
      toast.error("Lösenordet stämmer inte överens.")
    }
  setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    toast.success("Registreringen lyckades!")
    navigate("/login")
  })
  .catch((error) => {
    toast.error(error.message);
    setIsLoading(false)
  });

  };

  return (
    <>
    {isLoading && <Loader/>}
      <section className="container-register">
        <div className='form'>
            <h2>Registrera dig</h2>
            <form onSubmit={registerUser}>
                <input 
                  type='text' 
                  placeholder='Email' 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='Lösenord' 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='Bekräfta lösenord' 
                  required 
                  value={cPassword} 
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