import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import { FiInfo } from "react-icons/fi"
import { BiTrash } from "react-icons/bi"
import { Link } from 'react-router-dom';
import Loader  from '../../components/loader/Loader';

// styles
import "./ViewProducts.css"



const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect (() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("category", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs); 
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
      });

    } catch(error) {
      setIsLoading(false);
      toast.error (error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully");
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <>
    {isLoading && <Loader/>}
    <div>
      {products.lenght === 0 ? (
        <p>Inga varor hittades</p>
      ) : (
        <table>
          <thead>
          <tr>
            {/* <th>Namn</th>
            <th>Kategori</th>
            <th>Utgångsdatum</th> */}
          </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const {id, name, category, desc, amount} = product;
              return (
                
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{desc}</td>
                    <td>{amount}</td>
                    <td><Link to ="/"><FiInfo size={20}/></Link></td>
                    <td><BiTrash size={20} color="red" onClick={() => deleteProduct(id)}/></td>
                  </tr> 
              )
            })}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProducts