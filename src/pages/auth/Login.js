import { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { signOut } from "firebase/auth";


//styles
import "./auth.css"



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false)
        toast.success("Du är inloggad!");
        navigate("/")
    })
    .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
  });
};

//logga ut användare
const logout = () => {
    signOut(auth).then(() => {
        toast.success("Utloggad!")
        navigate("/")
    }).catch((error) => {
        toast.error(error.message)
    });
  };

  return (
    <>
    {isLoading && <Loader/>}
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
            <form>
                <Link to="/" onClick={logout}><button className='signout'>Logga ut</button></Link>
            </form>
        </div>
    </section>
    </>
  )
}

export default Login