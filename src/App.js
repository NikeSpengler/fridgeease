import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//styles
import "./App.css";

//components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Fridge from "./pages/fridge/Fridge";
import GroceryList from "./pages/groceryList/GroceryList";
import Recipes from "./pages/recipes/Recipes";



function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Header/>
          <Routes>
            <Route path="/home" element={ <Home/> } />
            <Route path="/fridge" element={ <Fridge/> }/>
            <Route path="/recipe" element={ <Recipes/> }/>
            <Route path="/fridge" element={ <Fridge/> }/>
            <Route path="/grocerylist" element={ <GroceryList/> } />
            <Route path="/contact" element={ <Contact/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/register" element={ <Register/> } />
            <Route path="/reset" element={ <Reset/> } />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
