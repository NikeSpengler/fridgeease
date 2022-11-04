import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";

//styles
import "./auth.css"
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = (e) => {
        e.preventDefault()
        
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })

  .catch((error) => {
    toast.error(error.message)
  });
};

  return (
    <section className="container-signin">
       <div className='form'>
            <h2>Logga in</h2>
            <form onSubmit={loginUser}>
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
                <button type="submit" className='block'>Logga in</button>
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