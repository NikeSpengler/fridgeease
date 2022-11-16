import React from 'react'

//styles
import "./GroceryList.css"

const GroceryList = () => {
  return (
    <section className="container">
    <div className='form'>
        <h1>Din inköpslista</h1>
        <form onSubmit={addProduct}>
            <input 
                type='text' 
                placeholder='Lägg till matvara...' 
                // required
                name="name"
               
            />
                
            <button type="submit" className='button-add'>Lägg till</button>
        </form>
       
         
    </div>
    
</section>
  )
}

export default GroceryList;