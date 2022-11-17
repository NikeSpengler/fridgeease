import React from 'react'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import {BiFridge} from "react-icons/bi";


//styles
import "./Home.css"

function Home() {
  const [displayName, setdisplayName] = useState("");
  const dispatch = useDispatch()

  //monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        // const uid = user.uid;
        //Showing current signed in users name in form of part of email, simplifyed way.
        if (user.displayName == null) {
            const u1 = user.email.substring(0, user.email.indexOf("@"));
            const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
            setdisplayName(uName);
        } else {
            setdisplayName(user.displayName);
        }
        
        dispatch(
            SET_ACTIVE_USER({
                email: user.email,
                userName: user.displayName ? user.displayName : displayName,
                userID: user.uid,
            })
        );
    } else {
      // User is signed out and info about the user is hidden.
      setdisplayName("");
      dispatch(REMOVE_ACTIVE_USER());
    }
  });
}, [dispatch, displayName])

  return (
    <section className="container-signin">
        <div className='form'>
            <a className='fridge-img' href='/fridge'><BiFridge size={70}/></a>
            <h1 className='title-home'>Välkommen till FridgeEase!</h1>
            <h1><b>{displayName}</b></h1>
            <p className='text-home'>Appen för dig som vill ta till vara på allt i ditt kylskåp, 
            ha koll på varornas hållbarhet<br/> och söka efter recept som passar de varor du vill använda först.</p>
            <a className='link-fridge' href='/fridge'>Tryck här för att komma till ditt kylskåp.</a>
            

        </div>
    </section>
  )
}

export default Home;