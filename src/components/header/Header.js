import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {BiFridge} from "react-icons/bi"
import {FiShoppingCart, FiHeart} from "react-icons/fi"
import {AiOutlineUser} from "react-icons/ai"
import {IoMdBook} from "react-icons/io"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config'

//styles
import "./Header.module.css"


const Header = () => {
  const [displayName, setdisplayName] = useState("");
  
  //monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user signed in
        const uid = user.uid;
        console.log(user.displayName)
        setdisplayName(user.displayName)
      } else {
        // User is signed out
        setdisplayName("")
      }
    });
  },[])

 

  return (
        <div className='nav-container'>
          <nav className='navbar'>
            <Link to="/">
              <span className='navbar-logo'><h1>FridgeEase.</h1></span>
            </Link>
            {/* <ul className='desktop-links' id="desktop-links">
              <Link to="/fridgeform"><li>Mitt kylskåp</li></Link>
              <Link to="/fridgeform"><li>Recept</li></Link>
              <Link to="/favoriterecipes"><li>Favoritrecept</li></Link> 
              <Link to="/user"><li>Min sida</li></Link>
              <Link to="/grocerylist"><li>Inköpslista</li></Link>
            </ul> */}
            <ul className='mobile-links' id="mobile-links">
              <Link to="/fridge"><li><BiFridge size={20}/></li></Link>
              <Link to="/recipe"><li><IoMdBook size={20}/></li></Link> 
              <Link to="/favoriterecipes"><li><FiHeart size={20}/></li></Link> 
              <Link to="/login"><li><AiOutlineUser size={20}/></li></Link>
              <Link to="/grocerylist"><li><FiShoppingCart size={20}/></li></Link>
            </ul>
          </nav>
    </div>
  )
}

export default Header


