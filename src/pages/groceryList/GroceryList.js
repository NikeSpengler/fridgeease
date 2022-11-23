import React from 'react'
import { AiFillMinusCircle } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FiInfo } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { ADD_TO_CART, DECREASE_CART} from '../../redux/slice/cartSlice';

//styles
import "./GroceryList.css"

const GroceryList = () => {
  const cartItems =  useSelector(selectCartItems)
  const cartTotalAmount =  useSelector(selectCartTotalAmount)
  const cartTotalQuantity =  useSelector(selectCartTotalQuantity)
  const dispatch = useDispatch();

  // increase and decrease cart/ products
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  return (
    <section className="container">
      <div className='form'>
          <h1>Din inköpslista</h1>
          {/* <form onSubmit={""}>
              <input 
                  type='text' 
                  placeholder='Lägg till matvara...' 
                  // required
                  name="name"
                
              /> 
              <button type="submit" className='button-add'>Lägg till</button>

          </form> */}
          {cartItems.lenght === 0 ? (
            <>
              <p>Inköpslistan är tom</p>
              <br/>
              <div>
                <Link to="fridge">&larr; Lägg till varor genom ditt kylskåp</Link>
              </div>
            </>
          ) : (
            <>
            <table>
              <tbody>
                {cartItems.map((cart, index) => {
                  const {id, name, category, amount, cartQuantity} = cart;

                  return (
                    <tr key={id} className="cart-list">
                      <td>{name}</td>
                      <td>{amount}</td>
                      <td>{category}</td>  
                      <td><Link className='cart-btn' onClick={() => increaseCart(cart)}><BsFillPlusCircleFill size={20}/></Link></td> 
                      <td>{cartQuantity}</td> 
                      <td><Link className='cart-btn' onClick={() => decreaseCart(cart)}><AiFillMinusCircle size={23}/></Link></td> 
                      {/* <td >
                        <div className='cart-count'>
                          <Link className='cart-btn'><BsFillPlusCircleFill size={20}/></Link>
                            <p>{cartQuantity}</p>
                          <Link className='cart-btn'><AiFillMinusCircle size={23}/></Link>
                        </div>
                        
                      </td>                   */}
                      <td><Link to ={`/fridge/${id}`}><FiInfo size={20}/></Link></td>
                      <td><BiTrash size={20} color="red" onClick={() => confirmDelete(id)}/></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>
              <p>{`Antal varor: ${cartTotalQuantity}`}</p>
            </div>
            <div>
              <button>Radera inköpslistan</button>
            </div>
            </>
          )}
          
      </div>
    </section>
  )
}

export default GroceryList;