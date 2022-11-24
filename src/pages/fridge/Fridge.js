import "./Fridge.css"
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import ViewProducts from './ViewProducts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/slice/productSlice';
import { FILTER_BY_CATEGORY } from '../../redux/slice/filterSlice';


const initialState = {
    name:"",
    category:"",
    desc: "",
    amount:"",
    storage: "",
    content: "",
}

const Fridge = () => {
    const { id } = useParams()
    console.log(id);
    const [product, setProduct] = useState ({
        ...initialState
    })
    
    //filter by category, 
    const [category, setCategory] = useState("Allt")
    const products = useSelector(selectProducts)
    const dispatch = useDispatch();
    const allCategories = [
        "Allt",
        ...new Set(products.map((product) => product.category))
    ]
    console.log(allCategories);

    useEffect(() => {
        dispatch(FILTER_BY_CATEGORY({products, category}));
    }, [dispatch, products, category]);

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
                storage: product.storage,
                content: product.content,
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

                    <button type="submit" className='button-add'>Lägg till</button>
                  {/* Next part of filter by category */}
                    <select className='product-filter'
                        value = {category}
                        onChange = {(e) => setCategory(e.target.value)}
                    >
                          {allCategories.map((category, index) => {
                            return (
                                <option key={index} value={category}>{category}</option>
                            )
                        })}
                    </select>
            </form>
        </div>
        <ViewProducts/>
    </section>
     
  )
}

export default Fridge;