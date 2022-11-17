import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import { FiInfo } from "react-icons/fi"
import { BiTrash } from "react-icons/bi"
import { Link } from 'react-router-dom';
import Loader  from '../../components/loader/Loader';
import Notiflix from 'notiflix';

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

  // using comformbox/notiflix before deleting product
  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      '!',
      'Vill du radera denna vara?',
      'Radera',
      'Avbryt',
      function okCb() {
        deleteProduct(id)
      },
      function cancelCb() {
        console.log("Avbrutet");
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "#8b0000",
        okButtonBackground: "#8b0000",
        // etc...
      },
    );
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
              const {id, name, category, amount} = product;
              return (
                
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{amount}</td>
                    <td>{category}</td>                    
                    <td><Link to ="/fridge/:id"><FiInfo size={20}/></Link></td>
                    <td><BiTrash size={20} color="red" onClick={() => confirmDelete(id)}/></td>
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