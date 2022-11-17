import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import ViewProducts from './ViewProducts';
import { useParams } from 'react-router-dom';

//styles
import "./Fridge.css"


const categories = [
    {id: 1, name: "Allt"},
    {id: 2, name: "Grönsaker"},
    {id: 3, name: "Frukt"},
    {id: 4, name: "Kylvaror"},
    {id: 5, name: "Torrvaror"},
]

const initialState = {
    name:"",
    category:"",
    desc: "",
    amount:"",
}

const Fridge = () => {
    const { id } = useParams()
    console.log(id);
    const [product, setProduct] = useState ({
        ...initialState
    })

      
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    };
    

    const addProduct = (e) => {
        e.preventDefault()
        console.log(product)

        try {
            // Add a new document with a generated id.
            const docRef = addDoc(collection(db, "products")
            , {
                name: product.name,
                category: product.category,
                desc: product.desc,
                amount: product.amount,
                createdAt: Timestamp.now().toDate()
            });
            //initialState rensar form fields
            setProduct({ ...initialState })
            toast.success("Produkten är tillagd")

        } catch(error) {
            toast.error(error.message)
        }
    };

  return (
    <section className="container-signin">
        <div className='form'>
            <h1>Ditt kylskåp</h1>
            <form onSubmit={addProduct}>
                <input 
                    type='text' 
                    placeholder='Lägg till matvara...' 
                    // required
                    name="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e)}
                />
                    <select className='kategori'
                        type='text' 
                        placeholder='kategori' 
                        // required
                        name="category"
                        value={product.category}
                        onChange={(e) => handleInputChange(e)} >
                            <option value="" disabled>
                                Välj kategori
                            </option>
                            {categories.map((cat) => {
                                return (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                )
                            })}
                    </select> 
                    <button type="submit" className='button-add'>Lägg till</button>
                    <select 
                        className=""
                        type="text" 
                        placeholder="Filter"
                    >
                        <option value="allt">Allt</option>
                        <option value="grönsaker">Grönsaker</option>
                        <option value="frukt">Frukt</option>
                        <option value="kylvaror">Kylvaror</option>
                        <option value="torrvaror">Torrvaror</option>
                        <option value="a-ö">A-Ö</option>
                    </select>
            </form>
           
             {/* <input 
                    type='text' 
                    placeholder='Beskrivning' 
                    // required
                    name="desc"
                    value={product.desc}
                    onChange={(e) => handleInputChange(e)}
                /> */}
                 {/* <div className='button-parent'>
                    <button type="submit" className='button-add'>Lägg till</button>
                </div> */}
            {/* <div className='button-parent'>
                <button type="submit" className='button-add'>Lägg till</button>
                <button type="submit" className='button-search'>Sök</button>
            </div> */}
        </div>
        <ViewProducts/>
    </section>
     
  )
}

export default Fridge;