import "./DetailProducts.css"
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { Loader } from "rsuite"
import { useDispatch } from "react-redux"
import { ADD_TO_CART } from "../../redux/slice/cartSlice"
// import { IoIosArrowBack} from "react-icons/io"
// <IoIosArrowBack size={20}/>


const DetailProducts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log (id)
    const [product, setProduct] = useState(null)

    //add to cart/ grocerylist
    const addToCart = (product) => {
        dispatch(ADD_TO_CART(product))
    };

    const getProduct = async () => {
        console.log("Getting product")
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        //shows id in info about product
        const obj = {
            id: id, 
            ...docSnap.data()
        }
        setProduct(obj)
    } else {
        toast.error("Product not found")
    }
};

useEffect (() => {
    getProduct()
}, [])

return (
    <section>
        <div className="back">
                <Link to="/fridge" className="arrow-back"><h3>&larr; Tillbaka</h3></Link>
        </div>
        <div className='container-detail'>
           
            {product === null ? (
                <Loader/>
            ) : (
                <>
                    <div className="detail-product">
                        <h2>{product.name}</h2>
                        <p><b>{product.amount}</b></p>
                        <p>{product.desc}</p>
                        <p>
                            <b>Innehåll:</b> {product.content}
                        </p>
                        <p>
                            <b>Förvaring:</b> {product.storage}
                        </p>
                        <p>
                            <b>Kategori:</b> {product.category}
                        </p>
                        <p>
                            <b>EAN:</b> {product.id}
                        </p> 
                    </div>
                    <div className="count">
                        <button className="btn-detail">-</button>
                        <p>
                            <b>1</b>
                        </p>
                        <button className="btn-detail">+</button>
                    </div>
                    <button className="add-detail" onClick={() => addToCart(product)}>Lägg till inköpslistan</button>
                    <div className="sustain-product">
                        <h3>Hur hållbar är din vara?</h3>
                        <p>Se varans hållbarthetsdeklaration.</p>
                    </div>
                    
                </>
            )}
            
        </div>
       
    </section>
  )
}



export default DetailProducts