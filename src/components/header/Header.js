// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {BiFridge} from "react-icons/bi"
import {FiShoppingCart, FiHeart} from "react-icons/fi"
import {AiOutlineUser} from "react-icons/ai"
import {IoMdBook} from "react-icons/io"
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from '../../firebase/config'

//styles
import "./Header.module.css"



const Header = () => {
  return (
        <div className='nav-container'>
          <nav className='navbar'>
            <Link to="/home">
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
              {/* <AdminOnlyRoute><Link to="/"><li><b>Admin</b></li></Link></AdminOnlyRoute> */}
              <Link to="/fridge"><li><BiFridge size={20}/></li></Link>
              <Link to="/recipes"><li><IoMdBook size={20}/></li></Link> 
              <Link to="/favoriterecipes"><li><FiHeart size={20}/></li></Link>
              <Link to="/login"><li><AiOutlineUser size={20}/></li></Link>
              <Link to="/grocerylist"><li><FiShoppingCart size={20}/></li></Link>
            </ul>
          </nav>
    </div>
  )
}

export default Header


