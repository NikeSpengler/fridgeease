import React from 'react'
import { FaHeart} from "react-icons/fa"

//styles
import "./FavoriteRecipes.css"

const FavoriteRecipes = () => {
  return (
    <section className="container">
        <div className='form'>
            <h1>Receptfavoriter <FaHeart size={20}/></h1>
        </div>
    </section>
  )
}

export default FavoriteRecipes