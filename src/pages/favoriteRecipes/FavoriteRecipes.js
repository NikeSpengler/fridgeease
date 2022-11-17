import React from 'react'
import { FiHeart} from "react-icons/fi"

//styles
import "./FavoriteRecipes.css"

const FavoriteRecipes = () => {
  return (
    <section className="container">
        <div className='form'>
            <h1>Receptfavoriter <FiHeart size={20}/></h1>
        </div>
    </section>
  )
}

export default FavoriteRecipes