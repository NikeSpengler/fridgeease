import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged } from "firebase/auth";

//styles
import "./fridge.css"

const Fridge = () => {
    const [displayName, setdisplayName] = useState("");

    //monitor currently signed in user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                const uid = user.uid;
                console.log(user.displayName)
                setdisplayName(user.displayName)
            } else {
              // User is signed out
              setdisplayName("")
            }
          });
    }, [])

  return (
    <section className="container-signin">
        <div className='form'>
            <a href='#'><h1>Hej, här är ditt kylskåp {displayName}</h1></a>
            <form onSubmit={""}>
                <input 
                    type='text' 
                    placeholder='Sök efter matvara...' 
                    required
                />
                {/* <button type="submit" className='block'>Sök</button>
                <button type="submit" className='block'>Lägg till</button> */}
                {/* <div className='signin-link'>
                    <Link to="/reset">Återställ lösenord</Link>
                </div> */}
            </form>
            <div className='button-parent'>
                <button type="submit" className='button-search'>Sök</button>
                <button type="submit" className='button-add'>Lägg till</button>
            </div>
        </div>
    </section>
  )
}

export default Fridge;