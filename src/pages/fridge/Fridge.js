import { useState } from 'react'

//styles
import "./fridge.css"


const Fridge = () => {
    const [product, setProduct] = useState ({
        name:"",
        category:"",
        description: "",
    })
      
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    };
    
    const addProduct = (e) => {
        e.preventDefault()
        console.log(product)
    };

  return (
    <section className="container-signin">
        <div className='form'>
            <h1>Ditt kylskåp</h1>
            <form onSubmit={""}>
                <input 
                    type='text' 
                    placeholder='Sök efter matvara...' 
                    // required
                    name="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e)}
                />
            </form>
            <div className='button-parent'>
                <button type="submit" className='button-add'>Lägg till</button>
                <button type="submit" className='button-search'>Sök</button>
            </div>
        </div>
    </section>
  )
}

export default Fridge;