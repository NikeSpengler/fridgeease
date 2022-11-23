import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import ViewProducts from './ViewProducts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../redux/slice/productSlice';
import { FILTER_BY_CATEGORY } from '../../redux/slice/filterSlice';



//styles
import "./Fridge.css"


// const categories = [
//     {id: 1, name: "Allt"},
//     {id: 2, name: "Grönsak"},
//     {id: 3, name: "Frukt"},
//     {id: 4, name: "Kylvara"},
//     {id: 5, name: "Torrvara"},
// ]

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

    // const filterProducts = (cat) => {
    //     setCategory(cat)
    //     dispatch(FILTER_BY_CATEGORY({products, category: cat}))
    // };




    // 
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
                    {/* <select className='category'
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
                    </select>  */}
                    
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
                        
                        {/* <option value="" disabled>Filter</option>
                        <option value="allt">Allt</option>
                        <option value="grönsak">Grönsak</option>
                        <option value="frukt">Frukt</option>
                        <option value="kylvara">Kylvara</option>
                        <option value="torrvara">Torrvara</option> */}
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