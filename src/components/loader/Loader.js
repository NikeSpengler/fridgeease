import React from 'react';
import ReactDOM from 'react-dom';
// import loaderImg from "../../assets/loader.png";

//styles
import "./Loader.css"

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            {/* <img src={loaderImg} alt="Loading..."></img> */}
            <h1>Loading...</h1>
        </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;